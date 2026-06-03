import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadApp() {
  const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
  const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
  assert.ok(script, "app script should exist");

  const elements = new Map();
  const storage = { value: "[]" };
  const downloads = [];
  const element = () => ({
    innerHTML: "",
    textContent: "",
    value: "",
    checked: false,
    style: {},
    onclick: null,
    select: () => {},
    click: () => {},
    remove: () => {},
  });
  const context = {
    localStorage: {
      getItem: () => storage.value,
      setItem: (_, value) => {
        storage.value = value;
      },
      removeItem: () => {
        storage.value = "[]";
      },
    },
    document: {
      getElementById(id) {
        if (!elements.has(id)) elements.set(id, element());
        return elements.get(id);
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => {
        const created = element();
        downloads.push(created);
        return created;
      },
      body: { appendChild: () => {} },
      execCommand: () => true,
    },
    navigator: { userAgent: "node-test", clipboard: { writeText: async () => {} } },
    window: { location: { href: "https://example.test/self-tests/" } },
    Blob: function Blob() {},
    URL: {
      createObjectURL: () => "blob:test",
      revokeObjectURL: () => {},
    },
    Date,
    Math,
    JSON,
    console,
    __storage: storage,
    __downloads: downloads,
  };

  vm.createContext(context);
  vm.runInContext(
    `${script}
    globalThis.__app = {
      tests,
      setActive(value) {
        active = value;
      },
      calculateActive,
      blocks,
      render,
      getRespondent,
      setRespondent,
      respondentValid,
      requireExportReady,
      copyPayload,
      toSupabaseRow,
      saveResultOnline,
      save,
      renderHist,
      hist,
      get latest() {
        return latest;
      },
      get storage() {
        return globalThis.__storage;
      },
      get downloads() {
        return globalThis.__downloads;
      }
    };`,
    context,
  );
  return context.__app;
}

test("registers the dosha questionnaire", () => {
  const app = loadApp();

  assert.equal(app.tests.dosha.id, "dosha");
  assert.equal(app.tests.dosha.title, "Тест на определение типа дош");
  assert.equal(app.tests.dosha.qs.length, 30);
  assert.deepEqual(
    [...new Set(app.tests.dosha.qs.map((question) => question[1]))].sort(),
    ["kapha", "pitta", "vata"],
  );
});

test("calculates dosha profile and reuses the export payload", () => {
  const app = loadApp();
  app.setActive("dosha");
  const answers = app.tests.dosha.qs.map((question) =>
    question[1] === "pitta" ? 4 : 1,
  );

  const result = app.calculateActive(answers);
  app.render(result, answers);

  assert.equal(result.type, "dosha");
  assert.equal(result.dominantDosha, "Питта");
  assert.equal(result.scores.pitta.percent, 100);
  assert.equal(app.latest.testId, "dosha");
  assert.equal(app.latest.testName, "Тест на определение типа дош");
  assert.match(app.latest.report[0].title, /Питта/);
});


test("respondent presets are included in export payload", () => {
  const app = loadApp();
  app.setActive("dosha");
  app.setRespondent("dima");
  const answers = app.tests.dosha.qs.map((question) =>
    question[1] === "pitta" ? 4 : 1,
  );

  const result = app.calculateActive(answers);
  app.render(result, answers);

  assert.equal(JSON.stringify(app.latest.respondent), JSON.stringify({ preset: "dima", name: "Дима" }));
  assert.match(app.copyPayload(), /^Here is my self-test result\./);
  assert.match(app.copyPayload(), /Respondent: Дима/);
  assert.equal(JSON.parse(app.copyPayload().split("\n\n").at(-1)).respondent.name, "Дима");
});

test("respondent preset dasha is included in payload", () => {
  const app = loadApp();
  app.setActive("dosha");
  app.setRespondent("dasha");
  const answers = app.tests.dosha.qs.map(() => 2);

  app.render(app.calculateActive(answers), answers);

  assert.equal(JSON.stringify(app.latest.respondent), JSON.stringify({ preset: "dasha", name: "Даша" }));
  assert.equal(JSON.parse(app.copyPayload().split("\n\n").at(-1)).respondent.name, "Даша");
});

test("custom respondent trims, limits length and requires non-empty name", () => {
  const app = loadApp();

  app.setRespondent("other", "   ");
  assert.equal(app.respondentValid().valid, false);

  app.setRespondent("other", `  ${"А".repeat(80)}  `);
  assert.equal(app.respondentValid().valid, true);
  assert.equal(app.getRespondent().name.length, 64);
});

test("missing respondent blocks export readiness", () => {
  const app = loadApp();
  app.setActive("dosha");
  const answers = app.tests.dosha.qs.map(() => 2);
  app.render(app.calculateActive(answers), answers);

  assert.equal(app.requireExportReady(), false);
  assert.match(app.copyPayload(), /Выберите, кто проходил тест/);
});

test("online payload mapper creates Supabase row shape", () => {
  const app = loadApp();
  app.setActive("dosha");
  app.setRespondent("dima");
  const answers = app.tests.dosha.qs.map((question) =>
    question[1] === "kapha" ? 4 : 1,
  );
  app.render(app.calculateActive(answers), answers);

  const row = app.toSupabaseRow(app.latest);

  assert.equal(row.respondent_name, "Дима");
  assert.equal(row.respondent_preset, "dima");
  assert.equal(row.test_id, "dosha");
  assert.equal(row.test_name, "Тест на определение типа дош");
  assert.equal(row.result_type, "dosha");
  assert.equal(row.profile, "Капха");
  assert.equal(row.raw_payload.respondent.name, "Дима");
  assert.equal(row.user_agent, "node-test");
  assert.equal(row.page_url, "https://example.test/self-tests/");
  assert.equal(row.source, "self-tests");
});

test("missing Supabase config returns disabled online save", async () => {
  const app = loadApp();
  const result = await app.saveResultOnline(
    { respondent: { preset: "dima", name: "Дима" } },
    {
      enabled: true,
      provider: "supabase",
      supabaseUrl: "",
      supabaseAnonKey: "",
      tableName: "test_results",
    },
  );

  assert.equal(JSON.stringify(result), JSON.stringify({
    enabled: false,
    success: false,
    status: "disabled",
    error: "Supabase config is missing or invalid.",
  }));
});

test("placeholder Supabase config returns disabled online save", async () => {
  const app = loadApp();
  const result = await app.saveResultOnline(
    { respondent: { preset: "dima", name: "Дима" } },
    {
      enabled: true,
      provider: "supabase",
      supabaseUrl: "https://YOUR_EXISTING_PROJECT_ID.supabase.co",
      supabaseAnonKey: "YOUR_EXISTING_PUBLIC_ANON_KEY",
      tableName: "test_results",
    },
  );

  assert.equal(result.status, "disabled");
  assert.equal(result.enabled, false);
});

test("failed fetch returns failed online save without throwing", async () => {
  const app = loadApp();
  const result = await app.saveResultOnline(
    { respondent: { preset: "dima", name: "Дима" }, testId: "dosha", testName: "Dosha", result: { type: "dosha" } },
    {
      enabled: true,
      provider: "supabase",
      supabaseUrl: "https://project.supabase.co",
      supabaseAnonKey: "public-anon-key",
      tableName: "test_results",
    },
    async () => ({ ok: false, status: 403, text: async () => "forbidden" }),
  );

  assert.equal(result.enabled, true);
  assert.equal(result.success, false);
  assert.equal(result.status, "failed");
  assert.match(result.error, /403/);
});

test("old local history items without respondent render safely", () => {
  const app = loadApp();
  app.storage.value = JSON.stringify([
    {
      createdAt: "2026-06-02T00:00:00.000Z",
      testId: "dosha",
      testName: "Тест на определение типа дош",
      result: { type: "dosha", profile: "Капха" },
    },
  ]);

  app.renderHist();

  assert.match(app.storage.value, /Тест на определение типа дош/);
});

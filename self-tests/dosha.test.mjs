import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadApp() {
  const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
  const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
  assert.ok(script, "app script should exist");

  const elements = new Map();
  const element = () => ({
    innerHTML: "",
    textContent: "",
    value: "",
    style: {},
    onclick: null,
  });
  const context = {
    localStorage: {
      getItem: () => "[]",
      setItem: () => {},
      removeItem: () => {},
    },
    document: {
      getElementById(id) {
        if (!elements.has(id)) elements.set(id, element());
        return elements.get(id);
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => element(),
      body: { appendChild: () => {} },
      execCommand: () => true,
    },
    navigator: { clipboard: { writeText: async () => {} } },
    Blob: function Blob() {},
    URL: {
      createObjectURL: () => "blob:test",
      revokeObjectURL: () => {},
    },
    Date,
    Math,
    JSON,
    console,
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
      get latest() {
        return latest;
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

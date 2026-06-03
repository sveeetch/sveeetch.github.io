-- Run this in the existing Supabase project's SQL editor before enabling online result saving.
-- Use only the public anon key in frontend code.
-- This policy allows anonymous inserts only. Do not enable anonymous selects unless you need public reading.

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  respondent_name text,
  respondent_preset text,

  test_id text not null,
  test_name text,
  result_type text,

  profile text,
  summary text,

  raw_payload jsonb not null,

  user_agent text,
  page_url text,
  app_version text,

  source text default 'self-tests'
);

alter table public.test_results
add column if not exists respondent_name text;

alter table public.test_results
add column if not exists respondent_preset text;

alter table public.test_results
add column if not exists test_id text;

alter table public.test_results
add column if not exists test_name text;

alter table public.test_results
add column if not exists result_type text;

alter table public.test_results
add column if not exists profile text;

alter table public.test_results
add column if not exists summary text;

alter table public.test_results
add column if not exists raw_payload jsonb;

alter table public.test_results
add column if not exists user_agent text;

alter table public.test_results
add column if not exists page_url text;

alter table public.test_results
add column if not exists app_version text;

alter table public.test_results
add column if not exists source text default 'self-tests';

create index if not exists test_results_created_at_idx
on public.test_results (created_at desc);

create index if not exists test_results_test_id_idx
on public.test_results (test_id);

create index if not exists test_results_result_type_idx
on public.test_results (result_type);

create index if not exists test_results_respondent_name_idx
on public.test_results (respondent_name);

alter table public.test_results enable row level security;

drop policy if exists "Allow anonymous inserts" on public.test_results;

create policy "Allow anonymous inserts"
on public.test_results
for insert
to anon
with check (true);

create table if not exists public.workout_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.workout_state enable row level security;

drop policy if exists "public read workout state" on public.workout_state;
drop policy if exists "public write workout state" on public.workout_state;

create policy "public read workout state"
on public.workout_state
for select
to anon
using (true);

create policy "public write workout state"
on public.workout_state
for all
to anon
using (true)
with check (true);

insert into public.workout_state (id, payload)
values ('reform', '{"programsByUser":{},"sessions":[],"users":["Dima","Dasha","Artem","Danil","Guest"],"selectedDay":"fullbody-1","selectedUser":"Dima","currentSessionId":""}'::jsonb)
on conflict (id) do nothing;

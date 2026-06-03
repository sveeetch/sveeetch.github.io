# Online Results Setup

Use the existing Supabase project. Do not create a new backend or database provider.

## Steps

1. Open the existing Supabase project.
2. Open the Supabase SQL Editor.
3. Run `/self-tests/supabase-test-results.sql`.
4. Copy the existing Project URL.
5. Copy the existing public anon key.
6. Paste them into `ONLINE_RESULTS_CONFIG` in `/self-tests/index.html`:
   - `supabaseUrl`
   - `supabaseAnonKey`
7. Deploy the site to GitHub Pages.
8. Complete a test in `/self-tests`.
9. Choose the respondent name.
10. Check the Supabase `test_results` table.

## Security

Never put the Supabase `service_role` key into frontend code. Use only the public anon key.

The SQL policy allows anonymous inserts only. Do not enable anonymous selects unless you need public reading.

## Local fallback

If `ONLINE_RESULTS_CONFIG` is empty, invalid, or disabled, the app continues to work locally. Results are saved in browser local history, and online sync shows as disabled.

# Reform Training

Online-first workout tracker for a shared training program.

## Features

- Shared public workout log for Dima, Dasha, Artem, Danil, and guests without login.
- Separate editable programs per user.
- Reform fullbody 1, Reform fullbody 2, and Pump day templates.
- Weight/reps editing per set.
- Exercise replacement for today's session.
- Exercise and day skipping.
- Exercise reorder.
- Shared history and progress chart.
- PWA install support.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase.sql` in the SQL editor.
3. Copy your Project URL and publishable/anon public key into `config.js`.
4. Publish the repository with GitHub Pages.

The anon key is public by design. This app has no login, so anyone with the app URL can read and write the shared training log.

## Local preview

Serve the folder with any static server:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

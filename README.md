# shedfx-frontend

React PWA control surface for [ShedFX](https://github.com/shedtaff-dotcom/shedfx),
a DIY guitar effects floor unit built on a Raspberry Pi 5 running
[Neural Amp Modeler](https://www.neuralampmodeler.com/). This app runs on a
tablet or iPad and talks over HTTP to the
[shedfx-backend](https://github.com/shedtaff-dotcom/shedfx-backend) FastAPI
service on the Pi. No audio is processed here: it sends commands and renders
JSON, nothing more.

**Status:** software foundation. Three read-only list pages (Setlists,
Songs, Effects flows) fetched from the backend CRUD API. No editing UI,
no auth, no offline data sync, no styling polish. See the
[phase tracker](https://github.com/shedtaff-dotcom/shedfx/blob/main/docs/phases.md).

## Layout

```
src/
  api/          fetch wrapper, one function per backend endpoint used, response types
  components/   Nav, ListView (loading / error / empty / table)
  pages/        SetlistsPage, SongsPage, EffectsFlowsPage + page registry
  App.tsx       hash-based nav between the three pages
scripts/
  make-icons.mjs  regenerates the placeholder PWA icons in public/
```

Stack: Vite 8, React 19, TypeScript, [vite-plugin-pwa](https://vite-pwa-org.netlify.app/).
The PWA is installable and its static shell works offline; API data is
never cached.

## Run locally

Requires Node 20+ and the backend running (see its README, defaults to
http://127.0.0.1:8000).

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173. Other scripts: `npm run build` (type-check +
production build to `dist/`), `npm run preview`, `npm run lint`.

## Configuration

`VITE_API_BASE_URL` in `.env` is the backend base URL, no trailing slash.
See `.env.example`.

**CORS note:** the backend does not yet add `CORSMiddleware`, so a browser on
the Vite dev origin cannot call `http://localhost:8000` directly. Until that
lands, leave `VITE_API_BASE_URL` empty in dev: the app then uses the relative
`/api` prefix and Vite proxies `/api/*` to the backend (`vite.config.ts`).
For a production build served from the Pi, either set the variable to the
Pi's address once the backend allows the origin, or serve `dist/` behind a
reverse proxy that maps `/api/` to the backend.

## Backend endpoints used

| Page          | Endpoint             | Shape                                                    |
|---------------|----------------------|----------------------------------------------------------|
| Setlists      | `GET /setlists`      | `id, name, gig_date, venue, notes`                       |
| Songs         | `GET /songs`         | `id, title, artist, key, bpm, lyrics_url, tab_url, notes` |
| Effects flows | `GET /effects-flows` | `id, name, description, input_gain, output_gain`         |

Shapes mirror the backend's Pydantic `*Read` schemas; optional fields come
back as `null`. The backend also exposes the other eight entities and a
stubbed `GET /status`, none of which the frontend uses yet.

## Related repos

- [shedfx](https://github.com/shedtaff-dotcom/shedfx) — docs, ERD, phase tracking
- [shedfx-backend](https://github.com/shedtaff-dotcom/shedfx-backend) — FastAPI (Python), runs on the Pi

## License

MIT — see [LICENSE](LICENSE).

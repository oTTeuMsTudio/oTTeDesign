# oTTeDesign

A browser 3D design editor — primitive meshes, transform tools, and an AI scene assistant.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local`. Set `XAI_API_KEY` to enable the AI assistant.

`NEXT_PUBLIC_URL` must be an HTTP(S) origin without a path. Local and Preview deployments stay `noindex`; production indexes unless `NEXT_PUBLIC_INDEXABLE=false`.

After the app is running:

```bash
npm run test:seo
```

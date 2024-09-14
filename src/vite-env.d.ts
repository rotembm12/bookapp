/// <reference types="vite/client" />

interface ImportMetaEnv {
  // declare your VITE_ env variables as readonly here so you can use them in your app with intelisense
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

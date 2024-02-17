// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@bg-dev/nuxt-naiveui", "@pinia/nuxt"],
  typescript: {
    shim: false,
  },
  ssr: false,
  tailwindcss: {
    exposeConfig: {
      write: true,
    },
  },
  app: {
    head: {
      script: [
        {
          async: true,
          src: "https://umami.magma.ink/script.js",
          "data-website-id": "82f75495-1fc1-45d3-a0bb-7f57754156d2",
        },
      ],
    },
  },
});

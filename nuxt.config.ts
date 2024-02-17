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
});

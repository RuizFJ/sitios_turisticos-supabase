// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ["@nuxtjs/supabase"],
  plugins: [
    '~/plugins/fontAwesome.ts',
    { src: '~/plugins/bootstrap.ts', mode: 'client' }
  ],
  srcDir: "src",
 
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  build: {
    transpile: ["bootstrap",'@fortawesome/vue-fontawesome'],
    
  },
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    
  },
  
})

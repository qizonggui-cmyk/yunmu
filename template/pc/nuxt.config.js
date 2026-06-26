import Setting from "./setting";
const env = require("./env");
const MODE = "spa"; //单页面形式渲染模式 (打包后将 dist目录覆盖到 public/home 目录下) 打包命令: npm run generate
module.exports = {
  buildDir: "nuxt-dist",
  mode: MODE,
  /*
   ** Headers of the page
   */
  head: {
    title: "云牧臻和｜高原绿色臻选商城",
    meta: [
      { charset: "utf-8" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "http-equiv",
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "云牧臻和,高原绿色臻选商城,高原生态食品,绿色有机产品,高原羊肉,福建白茶,西藏虫草,生态农牧产品,源头直供,品质礼盒,健康食材,天然好味道,云牧商城",
      },
      {
        hid: "description",
        name: "description",
        content:
          "云牧臻和专注高原绿色臻选产品，严选高原生态羊肉、福建白茶、西藏虫草等品质好物，坚持源头甄选、绿色健康、品质可溯，把天然好味道与高品质农牧产品送到您的餐桌与礼赠场景。",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // script: [
    //   {src: `/api/get_script`, ssr: false}
    // ],
  },
  env: {
    NUXT_ENV: env[process.env.MODE],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    { src: "~/plugins/cdnOss.js", ssr: false },
    { src: "./assets/iconfont/iconfont.js", ssr: false },
    { src: "~/plugins/vue-swiper.js", ssr: false },
    { src: "~/plugins/utils.js", ssr: false },
    { src: "~/plugins/debounce.js", ssr: false },
    { src: "~/plugins/element-ui", ssr: false },
    { src: "~/plugins/vueqr.js", ssr: false },
    { src: "~/plugins/vue-clipboard.js", ssr: false },
    "~/plugins/main",
    "~/plugins/dynamic-scripts.client.js",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "cookie-universal-nuxt",
    "nuxt-sass-resources-loader",
  ],
  sassResources: ["~assets/theme/element-variables.scss"],
  /*
   ** Global CSS
   */
  css: [
    "~assets/iconfont/iconfont.css",
    "~assets/css/index.scss",
    // "~theme/index.css",
    { src: "swiper/dist/css/swiper.css" },
  ],

  router: {
    middleware: ["auth"],
  },

  auth: {
    strategies: {
      local1: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/logout",
            method: "get",
          },
          user: {
            url: "user",
            method: "get",
            propertyName: false,
          },
        },
      },
      local2: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/login/mobile",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/logout",
            method: "get",
          },
          user: {
            url: "user",
            method: "get",
            propertyName: false,
          },
        },
      },
      local3: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/pc/wechat_auth",
            method: "get",
            propertyName: "token",
          },
          logout: {
            url: "/logout",
            method: "get",
          },
          user: {
            url: "user",
            method: "get",
            propertyName: false,
          },
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: false,
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 7,
      },
    },
    localStorage: false,
  },

  axios: {
    baseURL: "",
  },
  // proxy: {
  //   '/api': {
  //     target: 'https://www.sxitdlc.com/server/api',
  //     pathRewrite: {
  //       '^/api': '/',
  //       changeOrigin: true // 表示是否跨域
  //     }
  //   }
  // },
  /*
   ** Build configuration
   */
  distDir: "build",
  /*
   ** Build configuration
   */
  build: {
    publicPath: "/home/",
    publicPathFolder: MODE === "spa" ? "/" : "",
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      ],
    },
  },

  server: {
    port: 10822,
    host: "0.0.0.0", // default: localhost
  },
};

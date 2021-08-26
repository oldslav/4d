/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require("quasar/wrappers");
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = configure(function (ctx) {
  return {
    sourceMap: true,
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: true
      }
    },

    // https://quasar.dev/quasar-cli/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      "cookies",
      "axios",
      "api",
      "i18n",
      "filters",
      { path: "server-init", client: false },
      "notify-defaults",
      "cesium"
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      "_app.styl",
      "_fonts.styl",
      "_icons.styl",
      "_colors.styl",
      "_override.styl"
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "material-icons", // optional, you are not bound to it
      "material-icons-outlined" // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: "history", // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      showProgress: true,
      scopeHoisting: true,
      // gzip: true,
      analyze: {
        analyzerMode: "disabled", // 'disabled', 'json', 'server', 'static'
        openAnalyzer: false,
        reportFilename: path.resolve(__dirname, "dist", "report.html")
      },

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack (cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          "@": path.resolve(__dirname, "./src")
        };

        // linting is slow in TS projects, we execute it only for production builds
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        });
        cfg.module.rules.push({
          test: /\.ts?$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          exclude: /node_modules/
        });
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: "pug-plain-loader"
        });
      },
      env: {
        SERVER_API_HOST: ctx.dev ? "https://4d-dev.innopolis.university" : "https://4d.innocityhall.ru",
        BROWSER_API_HOST: ctx.dev ? "https://4d-dev.innopolis.university" : "https://4d.innocityhall.ru"
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically,
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        "/api": {
          target: ctx.dev ? "https://4d-dev.innopolis.university" : "https://4d.innocityhall.ru",
          changeOrigin: true
        },
        "/oauth": {
          target: ctx.dev ? "http://4d-dev.innopolis.university" : "4d.innocityhall.ru",
          changeOrigin: true
        }
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      cssAddon: true,
      iconSet: "material-icons", // Quasar icon set
      lang: "ru", // Quasar language pack
      config: {

      },

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: "auto",

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        "Cookies",
        "LocalStorage",
        "Dialog",
        "Notify"
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true
      }, // only for GenerateSW
      manifest: {
        name: "4D City Maps&Data",
        short_name: "4D City Maps&Data",
        description: "A Quasar Framework app",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "4d_frontend"
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true
    }
  };
});

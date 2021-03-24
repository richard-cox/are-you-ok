import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Internet.. Are you ok?',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // 'nuxt-socket-io',
    // '@nuxtjs/proxy'
  ],

  // io: {
  //   sockets: { // At least one entry is required
  //     name: 'twitter',
  //     url: 'http://linux-o35c/:3001',
  //     default: true,
  //     vuex: { /* see section below */ },
  //     namespaces: { /* see section below */ }
  //   },
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // TODO: RC this needed?
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      });
    },
  },

  // devServer: {
  //   proxy: {
  //     "/twitter/": {
  //       target: "http://linux-o35c:3001/",
  //       logLevel: "debug"
  //     }
  //   }
  // }
  // proxy: {
  //   '/api/twitter/ws': proxyWsOpts('http://linux-o35c:3001'),
  //   // '/api/twitter/ping': proxyOpts('http://linux-o35c:3001'),
  // }
};

// function proxyOpts(target, type) {
//   return {
//     target,
//     secure: false,
//     onProxyReq: (proxyReq, req) => {
//       console.log('onProxyReq: type: ', type);
//       return onProxyReq(proxyReq, req);
//     },
//     onProxyReqWs,
//     onError
//   };
// }

// // TODO: RC remove all proxy shizzle
// function proxyWsOpts(target) {
//   console.log('proxyWsOpts', target);
//   return {
//     ...proxyOpts(target, 'ws'),
//     ws: true,
//     changeOrigin: true,
//     pathRewrite: { '/api/twitter/ws': '' }
//   };
// }

// function onProxyReq(proxyReq, req) {
//   // proxyReq.setHeader('x-api-host', req.headers['host']);
//   // proxyReq.setHeader('x-forwarded-proto', 'https');
//   console.log('onProxyReq: ', proxyReq.getHeaders());
//   // console.log('onProxyReq keys: ', Object.keys(proxyReq));
//   console.log('onProxyReq path: ', proxyReq.path);
// }

// function onProxyReqWs(proxyReq, req, socket, options, head) {
//   console.log('onProxyReqWs: ', proxyReq.getHeaders());
//   console.log('onProxyReqWs path: ', proxyReq.path);

//   // req.headers.origin = options.target.href;
//   // proxyReq.setHeader('origin', options.target.href);
//   // proxyReq.setHeader('x-api-host', req.headers['host']);
//   // proxyReq.setHeader('x-forwarded-proto', 'https');

//   socket.on('error', (err) => {
//     console.error('Proxy WS Error:', err); // eslint-disable-line no-console
//   });
// }

// function onError(err, req, res) {
//   res.statusCode = 500;
//   console.error('Proxy Error:', err); // eslint-disable-line no-console
//   res.write(JSON.stringify(err));
// }

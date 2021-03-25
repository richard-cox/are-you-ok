export function logWithLocation(...args: any[]) {
  console.warn(process.server ? "Server" : "Client", ":", ...args);
}

// TODO: RC add async fetch in components 2018 - https://github.com/nuxt/nuxt.js/issues/32

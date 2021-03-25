<template>
  <v-card>
    <v-card-title> Hackweek 20 </v-card-title>
    <v-card-text>
      <h2>Goals</h2>
      <p>
        Most of the aims are set out in the
        <a
          href="https://hackweek.suse.com/20/projects/internet-are-you-ok-a-voyage-into-vue-vuex-nuxt-and-typescript"
          >SUSE Hackweek Project Page</a
        >, but TL;DR
        <v-list>
          <v-list-item dense>
            Investigate Typescript intergration with Vue, Vuex and Nuxt
          </v-list-item>
          <v-list-item dense>
            Understand how Typescript support changes in newer versions of each
            of the above
          </v-list-item>
          <v-list-item dense>
            Achieve this by a fun project to determine the sentiment of the
            internet. This was heavily inspired by&nbsp;
            <a href="https://github.com/thisandagain/sentiment">a site</a>&nbsp;
            that visually and audiblly tracks the state of Wikipedia
          </v-list-item>
        </v-list>
      </p>

      <h3>Vuex Store Module Decorator</h3>
      <p>
        Basic working example of a typed Vuex store using
        <a href="https://github.com/championswimmer/vuex-module-decorators"
          >vuex-module-decorators</a
        >
      </p>
      <h3>Server-Side Rendering</h3>
      <p>
        Basic working example of how Nuxt SSR is handled in a typed component
        class
      </p>
      <h3>Twitter Stream</h3>
      <p>
        Stream tweets from Twitters Sample stream (requires backend to be
        running)
      </p>
      <h3>Internet State Face</h3>
      <p>Present the sentiment of the internet portrayed as a face</p>
    </v-card-text>
  </v-card>
</template>


// <v-btn color="primary" nuxt to="/store-module-decorators-example">
//         Go
//       </v-btn>


<script lang='ts'>
import { Component } from "nuxt-property-decorator";
import { Vue } from "nuxt-property-decorator";

@Component
export default class Versions extends Vue {
  private rows = [
    {
      component: "Vue",
      currentGen: "2",
      nextGen: "3",
      nextGenRelease: "2020/09/18 (core)",
      notes: `"Vue 3 is faster, smaller, more maintainable and it's easier to target native"`,
    },
    {
      component: "Vue CLI",
      currentGen: "",
      nextGen: "4.5",
      nextGenRelease: "Released",
      notes: "",
    },
    {
      component: "Vue Router",
      currentGen: "",
      nextGen: "4.0",
      nextGenRelease: "Released",
      notes: "",
    },
    {
      component: "Vue Dev Tools",
      currentGen: "",
      nextGen: "Beta version",
      nextGenRelease: "",
      notes: "does not support Vue 2",
    },
    {
      component: "Vetur",
      currentGen: "",
      nextGen: "Current",
      nextGenRelease: "Released",
      notes: "",
    },
    {
      component: "Vuex",
      currentGen: "3",
      nextGen: "4",
      nextGenRelease: "2021/02/02",
      notes:
        '"Vuex 4 is also Vue 3 compatible, while providing the same API as Vuex 3"',
    },
    {
      component: "Nuxt",
      currentGen: "2",
      nextGen: "3",
      nextGenRelease: "Beta Q2 '21,<br> Release '21",
      notes: "",
    },
  ];
  private tableHeaders = [
    {
      text: "Component",
      align: "start",
      value: "component",
    },
    {
      text: "Current Generation",
      align: "start",
      value: "currentGen",
    },
    {
      text: "Next Generation",
      align: "start",
      value: "nextGen",
    },
    {
      text: "Next Gen Release Date",
      align: "start",
      value: "nextGenRelease",
    },
    {
      text: "Notes",
      align: "start",
      value: "notes",
    },
  ];
}
</script>

<template>
<div class="version-tabs">
  <v-tabs vertical >
    <v-tab >
      Intro
    </v-tab>
    <v-tab>
      Overview
    </v-tab>
      <v-tab>
      Vue
    </v-tab>
    <v-tab>
      Vuex
    </v-tab>
    <v-tab>
      Nuxt
    </v-tab>
    <v-tab-item>
      <v-card>
        <v-card-title> Next Generation Vue, Vuex and Nuxt</v-card-title>
        <v-card-subtitle
          >Highlights</v-card-subtitle
        >
        <v-card-text>
          <h3>Vue (2-->3)</h3>
          <p>
          <ul>
            <li>It looks like Vue 3 has officially been released, though not all projects we use that have caught up</li>
            <li>Vuex 4 is out but new, Nuxt 3 is 'sometime this year'</li>
            <li>Some parts of the internet believe Vue 3 is still not ready for consumption</li>
            <li>Vue 3 will be backwards compatible with Vue 2 syntax, though there are some breaking changes</li>
            <li>There's going to be one last LTS 2.x release which will be supported for 18 months</li>
            <li>There's no native support for Component or Vuex Store classes</li>
            <li>Migrations with Typescript are a lot safer</li>
          </ul>
          </p>
          <h3>Vuex (3-->4)</h3>
          <p>
          <ul>
            <li>There's no native support for Store classes</li>
            <li>There's going to be a v5 which is a big change!</li>
          </ul>
          </p>
          <h3>Nuxt (2-->3)</h3>
          <p>
          <ul>
            <li>Public beta only, release expected '2021'</li>
            <li>Core rewritten in typescript</li>
            <li>asyncData & fetch will be DEPRECATED. vue3 `async setup` --> `useFetch`.</li>
          </ul>
          </p>
          <p><a href="https://github.com/vuejs/awesome-vue/issues/3544">Very help list of supported components</a></p>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-title> Version Overview </v-card-title>
        <v-card-text>
          <v-data-table
                  dense
                  :headers="tableHeaders"
                  :items="rows"
                  item-key="id"
                  class="elevation-1 flex-grow-1"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                ></v-data-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-title>Vue</v-card-title>
        <v-card-text>
          <h3>v2</h3>
          <p>
          <ul>
            <li>There's going to be one last LTS release safe for 18 months (2.7)</li>
          </ul>
          </p>
          <h3>v3</h3>
          <p>`If you decide to use Vue for a new production project, the official recommendation is to still start with Vue 2 right now` - https://madewithvuejs.com/blog/vue-3-roundup</p>
          <p>Migrations with Typescript are a **lot** safer.</p>
          <h4>Features</h4>
          <p>
            <ul>
              <li>Composition API - https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api
                <ul>
                  <li>new API that will allow for a function-based way of writing your component, inspired by React Hooks</li>
                  <li>`Vue 3 is still 100% compatible with the current syntax / the options-based API` - https://madewithvuejs.com/blog/vue-3-roundup</li>
                </ul>
              </li>
              <li>Teleports - https://v3.vuejs.org/guide/teleport.html
                <ul>
                  <li>Component encapsulation helper</li>
                  <li>for instance, full screen model where visual lives outside of component, but logic should be in component</li>
                </ul>
              </li>
              <li>Fragements
                  <ul>
                  <li>Multi-root components</li>
                </ul>
              </li>
              <li>`Virtual DOM rewrite for better performance and improved TypeScript support`</li>
            </ul>
          </p>
          <h4>Migrating - https://v3.vuejs.org/guide/migration</h4>
          <p><ul>
            <li>Migrations with Typescript are a lot safer</li>
            <li>Some interesting breaking changes - https://v3.vuejs.org/guide/migration/introduction.html#breaking-changes</li>
            <li>Release map https://github.com/vuejs/vue/projects/6</li>
          </ul></p>
          <h4>Typesript support</h4>
          <p>
            <ul>
              <li> Generally ok - https://v3.vuejs.org/guide/typescript-support.html</li>
            </ul>
          </p>
          <h4>Other Bits</h4>
          <p>
            <ul>
              <li>Vue 3 to support SSR, which will apparently compliment Nuxt SSR??
                  <ul>
                  <li>https://www.reddit.com/r/vuejs/comments/halhce/learn_nuxt_now_or_wait_for_vue_3_ssr/</li>
                  <li> https://github.com/moduslabs/vue3-example-ssr</li>
                </ul>
              </li>
            </ul>
          </p>
          <p><a href="https://github.com/vuejs/awesome-vue/issues/3544">Very help list of supported components</a></p>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-title>Vuex</v-card-title>
        <v-card-text>
          <h3>V4</h3>
          <h4>Features</h4>
          <p>
            <ul>
              <li> </li>
            </ul>
          </p>
          <h4>Migrating</h4>
          <p><ul>
            <li></li>
          </ul></p>
          <h4>Typescript Support - https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage</h4>
          <p>
            <ul>
              <li>It looks like stores themselves are created in a similar way (not classes!)</li>
              <li>Accessing the store though is different, they provide a way similar to the workarounds used by existing deps (access directly by importing store file rather than through $store) - https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage</li>
            </ul>
          </p>
          <h3>V5 (!!!)</h3>
          <p><ul>
            <li>V4 was basically an update dedicated to Vue 3</li>
            <li>`Version 5 on the other hand is a completely new state management library` - https://news.vuejs.org/issues/191</li>
            <li>RFC - https://github.com/vuejs/rfcs/discussions/270</li>
          </ul></p>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-title>Nuxt</v-card-title>
        <v-card-text>
          <h3>v2.14.6</h3>
          <p>Current version in dashboard</p>
          <h3>v2.15.3</h3>
          <p>Latest v2 version</p>
          <h3>v3</h3>
          <h4>Features</h4>
          <p>
            See http://nuxtjs.slides.com/atinux/state-of-nuxt-2020#/5
            <ul>
              <li>Nitro - New rendering engine</li>
              <li>Webpack 5, PostCSS 8</li>
              <li>esbuild (?)</li>
              <li>rewritten core in typescript </li>
              <li>Vue 3 support</li>
              <li>Vue Router 4. Add Routes at runtime</li>
              <li>Data Fetching. asyncData & fetch will be DEPRECATED. vue3 `async setup` --> `useFetch`. support SSR & hydration. works at component level</li>
              <li>TODO: $prismic (?)</li>
              <li>auto import of `plugins` folder </li>
              <li>`./static` becomes `./public`</li>
              <li>upport multiple apps in a single app</li>
            </ul>
          </p>
          <h4>Migrating</h4>
          <p><ul>
            <li>https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html</li>
          </ul></p>
          <h4>Typescript Support</h4>
          <p>
            <ul>
              <li>TODO: </li>
            </ul>
          </p>
          <h4>Other Bits</h4>
          <p><ul>
            <li>(8:47 for nuxt 3 info, 12:20 for nuxt 3 data) The State of Nuxt at Vuejs Global (Amsterdam - 21 Oct 2020) - https://www.youtube.com/watch?v=NyeFQ3JmDEk</li>
          </ul></p>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>

    <!--  <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>-->
</div>
</template>


<style lang="scss">
.version-tabs {
  .v-tab {
    justify-content: start;
  }
}
</style>

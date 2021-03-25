

# UI component library
Wanted to choose one from list  from yarn create nuxt-app
- bootstrap - https://bootstrap-vue.org/
- vuetify (material) - https://vuetifyjs.com/en/ - does not support vue 3 - v3.0 (Titan) Target Release: Q3 2021 
- ViewUI - https://github.com/view-design/ViewUI. nuxt yes
- element - vue 3 yes
Not in list
- Quasar (material) https://quasar.dev/ - does not support vue 3 - v2 beta. no nuxt support?
- Vue Material - https://vuematerial.io/ (no nuxt support?)

Friday - https://vuejs.amsterdam/program/
- nuxt three update


# Component Versions

Very help list - https://github.com/vuejs/awesome-vue/issues/3544

|Component|Current Gen|Next Gen| Next Gen Release | Notes
----------|------------|--------|---|---
Vue|2|3|2020/09/18 (core)|`Vue 3 is faster, smaller, more maintainable and it's easier to target native`
Vue CLI ||4.5|Released
Vue Router ||4.0|Released
Vue Dev Tools ||Beta version||does not support Vue 2
Vetur||Current|Released
Vuex|3|4| 2021/02/02|`Vuex 4 is also Vue 3 compatible, while providing the same API as Vuex 3`
Nuxt|2|3| Beta Q2 '21, Release '21


# Vue
## v2
- There's going to be one last LTS release safe for 18 months (2.7)

## v3
`If you decide to use Vue for a new production project, the official recommendation is to still start with Vue 2 right now`

Vue Release Roadmap - https://github.com/vuejs/vue/projects/6?ref=madewithvuejs.com

Migrations with Typescript are a looot safer.

- Features
  - Composition API - https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api
    - new API that will allow for a function-based way of writing your component, inspired by React Hooks
    - `Vue 3 is still 100% compatible with the current syntax / the options-based API`
  - Teleports - https://v3.vuejs.org/guide/teleport.html
    - Component encapsulation helper
    - for instance, full screen model where visual lives outside of component, but logic should be in component
  - Fragments - https://v3.vuejs.org/guide/migration/fragments.html
    - Multi-root components
      ```
      <template>
        <header>...</header>
        <main v-bind="$attrs">...</main>
        <footer>...</footer>
      </template>
      ```
  - `Virtual DOM rewrite for better performance and improved TypeScript support`
- Migrating - https://v3.vuejs.org/guide/migration
  - Migrations with Typescript are a lot safer
  - Some interesting breaking changes - https://v3.vuejs.org/guide/migration/introduction.html#breaking-changes
- Typescript Support
  - TODO: RC



# Vuex 4
- Typescript Support - https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
  - It looks like stores themselves are created in a similar way (not classes!)
  - Accessing the store though is different, they provide a way similar to the workarounds used by existing deps (access directly by importing store file rather than through $store) - https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
  

# Nuxt 
## v2.14

## v3
(8:47 for nuxt 3 info) The State of Nuxt at Vuejs Global (Amsterdam) - https://www.youtube.com/watch?v=NyeFQ3JmDEk


- Features
  - Nitro - New rendering engine
  - Webpack 5, PostCSS 8
  - esbuild (?)
  - rewritten core in typescript
  - Vue 3 support
    - Vue Router 4. Add Routes at runtime
    - Data Fetching. asyncData & fetch will be DEPRECATED. vue3 `async setup` --> `useFetch`. support SSR & hydration. works at component level
    - TODO: $prismic (?)
  - auto import of `plugins` folder
  - `./static` becomes `./public`
- Migrating - https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html
- Typescript Support
  - TODO: RC

TODO: RC continue async fetch/asyncData

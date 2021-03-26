

# UI component library
Wanted to choose one from list  from yarn create nuxt-app
- bootstrap - https://bootstrap-vue.org/
- vuetify (material) - https://vuetifyjs.com/en/ - does not support vue 3 - v3.0 (Titan) Target Release: Q3 2021 
- ViewUI - https://github.com/view-design/ViewUI. nuxt yes
- element - vue 3 yes
Not in list
- Quasar (material) https://quasar.dev/ - does not support vue 3 - v2 beta. no nuxt support?
- Vue Material - https://vuematerial.io/ (no nuxt support?)

# Component Versions

## Highlights
### Vue (2-->3)
- It looks like Vue 3 has officially been released, though not all projects we use that have caught up
  - Vuex 4 is out but new, Nuxt 3 is 'sometime this year'
- Some parts of the internet believe Vue 3 is still not ready for consumption
- Vue 3 will be backwards compatible with Vue 2 syntax, though there are some breaking changes
- There's going to be one last LTS 2.x release which will be supported for 18 months
- There's no native support for Component or Vuex Store classes
### Vuex (3-->4)
- There's no native support for Store classes
- There's going to be a v5 which is a big change!
### Nuxt (2-->3)
- Public beta only, release expected '2021'
- Core rewritten in typescript
- asyncData & fetch will be DEPRECATED. vue3 `async setup` --> `useFetch`.

Very help list - https://github.com/vuejs/awesome-vue/issues/3544

|Component|Current Gen|Next Gen| Next Gen Release | Notes
----------|------------|--------|---|---
Vue|2|3|2020/09/18 (core)|`Vue 3 is faster, smaller, more maintainable and it's easier to target native`
Vue CLI ||4.5|Released
Vue Router ||4.0|Released
Vue Dev Tools ||Beta version||does not support Vue 2
Vetur||Current|Released
Vuex|3|4| 2021/02/02|`Vuex 4 is also Vue 3 compatible, while providing the same API as Vuex 3`
Nuxt|2|3| Beta Q2 '21,<br> Release '21


## Vue
### v2
- There's going to be one last LTS release safe for 18 months (2.7)

### v3

`If you decide to use Vue for a new production project, the official recommendation is to still start with Vue 2 right now` - https://madewithvuejs.com/blog/vue-3-roundup

Migrations with Typescript are a **lot** safer.

- Features
  - Composition API - https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api
    - new API that will allow for a function-based way of writing your component, inspired by React Hooks
    - `Vue 3 is still 100% compatible with the current syntax / the options-based API` - https://madewithvuejs.com/blog/vue-3-roundup
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
  - Release map https://github.com/vuejs/vue/projects/6
- Typescript Support
  - Generally ok - https://v3.vuejs.org/guide/typescript-support.html

Other Bits
- Vue 3 to support SSR, which will apparently compliment Nuxt SSR??
  - https://www.reddit.com/r/vuejs/comments/halhce/learn_nuxt_now_or_wait_for_vue_3_ssr/
  - https://github.com/moduslabs/vue3-example-ssr



## Vuex

### V4
- Features
- Migrating
- Typescript Support - https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
  - It looks like stores themselves are created in a similar way (not classes!)
  - Accessing the store though is different, they provide a way similar to the workarounds used by existing deps (access directly by importing store file rather than through $store) - https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage

### V5!!!
- V4 was basically an update dedicated to Vue 3
- `Version 5 on the other hand is a completely new state management library` - https://news.vuejs.org/issues/191
- RFC - https://github.com/vuejs/rfcs/discussions/270

  

## Nuxt 
### v2.14

### v3
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
  - support multiple apps in a single app
- Migrating - https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html
- Typescript Support
  - TODO: RC

(8:47 for nuxt 3 info) The State of Nuxt at Vuejs Global (Amsterdam - 21 Oct 2020) - https://www.youtube.com/watch?v=NyeFQ3JmDEk

TODO: RC continue async fetch/asyncData
TODO: RC composition-api and autocomplete

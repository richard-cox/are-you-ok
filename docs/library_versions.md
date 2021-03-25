# Vue
## 3
- Released The Vue 3 core has officially been released as of 18 September 2020

UI component library
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


# Vuex
## 4

TODO: RC make public, link in hackweek page (and vice versa)
TODO: RC continue async fetch/asyncData


TODO: RC JUNK
# Demo Content
- Module Decorator ([Page](./pages/store-module-decorators-example.vue)) 
  - (Typescript) Components in templates autocompletes (v-col, StoreModuleDecorator)
  - (Typescript) Descriptions for Vue component properties (v-banner --> elevation)
- Module Decorator ([Component](./components/StoreModuleDecorator.vue)) 
  - (Vuex/Store) Actions can be seen in Vue.js dev tools
  - (Typescript) TS in attribute values is type safe (`storeCounter.decrement(increment)`)




- State Face ([Page](./pages/internet-state-face.vue)) 
  - (Typescript) TS enums are nicer over and above JS map 


- Twitter Stream ([Page](./pages/twitter-stream.vue)) 
  - (Typescript) Importing typing for JS dependencies is normally straight forward (`yarn add @types/<dep>`, works for lodash, howler)
  - (Typescript) Nuxt Route leave properties are automatically typed
  - (Typescript) Component features - (getters, ) TODO: RC. 
  - (Typescript) Autocomplete component features - ctx, watch values, etc
  - (Typescript) Interesting linting for vuetify slots!
  - (Typescript) Component attribute behaviour - different in binded vs non-binded attribute value highlighting
  - (Typescript) Component attribute behaviour - autocomplete (v-btn `outline`/`outlined`)

Store Intro - using dep (Store-module) to define stores as classes TODO: RC
- Vuex Store ([index]())
  - (Vuex/Store) Initialised with context of store TODO: RC
    - stores are plugins, so need to be namesp
- Counter Store ([Vuex Store](./store/counter.ts))
  - (Vuex/Store) Due to the way store-decorators works these need to be namespaced
  - (Typescript) What can set in the module decorator... autocompletes
  - (Vuex/Store) Stores cannot have constructors due to the way VuexModule works - https://github.com/championswimmer/vuex-module-decorators/issues/105
  - (Vuex/Store) Note - Properties in the store must be named uniquely



Sentiment
- Uses third party dependency for simple sentiment analysis - https://github.com/thisandagain/sentiment
- Originally thought library scored each tweet as a whole on a scale of -5 to 5, it looks like this is per work
- Does this all sound familiar? Twitter sentiment analysis on streams - https://github.com/joe4dev/simple-sentiment-analysis. It's not quite the same... but concept with pithy ui :D


https://developer.twitter.com/en/docs/twitter-api/tweets/sampled-stream/quick-start


https://stackoverflow.com/questions/58814678/nuxtserverinit-with-vuex-module-decorators

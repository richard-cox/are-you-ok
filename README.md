# Internet Are You OK?
Internet, are you ok? A voyage into Vue, Vuex, Nuxt and Typescript

https://hackweek.suse.com/20/projects/internet-are-you-ok-a-voyage-into-vue-vuex-nuxt-and-typescript

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

TODO: RC Intro/Welcome Page. high level aims.

TODO: RC tidy up store code
TODO: RC how to run frontend/backend
TODO: RC describe each tab
TODO: RC store stuff... load whilst on page ... server side increment of counter
TODO: RC clean repo, make public, link in hackweek page (and vice versa)
TODO: RC get/mutate/action/anything else vuex? add to simple 
TODO: RC async fetch/asyncData
TODO: RC component features (data, getters, watch)

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
- Uses third part dependency for simple sentiment analysis - https://github.com/thisandagain/sentiment
- Originally thought library scored each tweet as a whole on a scale of -5 to 5, it looks like this is per work
- Does this all sound familiar? Twitter sentiment analysis on streams - https://github.com/joe4dev/simple-sentiment-analysis. It's not quite the same... but concept with pithy ui :D


https://developer.twitter.com/en/docs/twitter-api/tweets/sampled-stream/quick-start

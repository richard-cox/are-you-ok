
<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";

@Component<StoreModuleDecoratorsExample>({
  async fetch(ctx) {
    if (process.server) {
      store.counter.incr(); // Note - This accesses SSR store... rather than client/this store
    }
  },
})
export default class StoreModuleDecoratorsExample extends ComponentStoreHelper {
  private storeCounter: Counter;

  constructor() {
    super();
    this.storeCounter = store.counter;
  }
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title> Vuex Store Module Decorator </v-card-title>
      <v-card-subtitle>A Simple Demo</v-card-subtitle>
      <v-card-text>
        <!-- TODO: DEMO Components in templates autocompletes (v-col, StoreModuleDecorator) -->
        <!-- TODO: DEMO Descriptions for Vue component properties (v-banner -- elevation) -->
        <!-- <v-banner elevation="10" icon="$mdiVuetify">asdsd</v-banner> -->
        <v-row>
          <StoreModuleDecoratorClass />
          <store-module-decorator-composite></store-module-decorator-composite>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> About </v-card-title>
      <v-card-text>
        <p>
          A simple example demonstrating how a Vuex store can be implemented in
          typescript
        </p>
        <p>
          The store itself is a class which makes use of decorators to declare
          store type functions
        </p>
        <p>
          The store initialised via <code>./store/index.ts</code> however
          individual store's are brought in as store plugins. This ensures they
          have the <code>store</code> instance available internally.
        </p>
        <p>
          SSR works correctly (refresh on page and see the counter start on a
          value set server side, contrast when refreshing on another page and
          navigating here). In order for this to work the component must access
          the store module initialised with the component's store (see the
          extended class)
        </p>
        <p>
          Related files
          <ul>
            <li><code>./components/store-module-decorator.vue</code></li>
            <li><code>./store/index.ts</code></li>
            <li><code>./store/counter.ts</code></li>
            <li><code>./utils/store-helper.ts</code></li>
          </ul>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";
import { Originator } from "../pages/ssr.vue";

export interface Value {
  label: String;
}

@Component<SSRComponent>({
  async fetch(ctx) {
    console.warn(
      "SSRComponent - fetch - ",
      process.server ? "Server" : "Client"
    );
    if (process.server) {
      store.counter.incr(); // Note - This accesses SSR store... rather than client/this store
      this.asyncFetch = Originator.SERVER;
    } else {
      this.asyncFetch = Originator.CLIENT;
    }
  },
  asyncData(ctx) {
    console.warn(
      "SSRComponent - asyncData - ",
      process.server ? "Server" : "Client"
    );
    return {
      asyncData: process.server ? Originator.SERVER : Originator.CLIENT,
    };
  },
})
export default class SSRComponent extends ComponentStoreHelper {
  public asyncFetch: Originator = null;
  public asyncData: Originator = null;

  constructor() {
    super();
    console.warn(
      "SSRComponent - init - ",
      process.server ? "Server" : "Client"
    );
  }
}
</script>

<template>
  <v-col>
    <v-col><h4>Component</h4></v-col>
    <v-col> async fetch Ran: {{ asyncFetch }} </v-col>
    <v-col> asyncData Ran: {{ asyncData }} </v-col>
  </v-col>
</template>

<style lang="scss" scoped>
// .store-module-decorator {
//   .section {
//     &-header {
//       padding-bottom: 10px;
//     }
//     &-body {
//       padding-bottom: 10px;

//       .v-input__slider {
//         flex: 0 0 200px;
//       }
//     }
//   }

//   .small-spacer {
//     padding: 0 10px;
//   }
// }
//
</style>

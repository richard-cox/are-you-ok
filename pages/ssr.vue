
<script lang='ts'>
import { Component } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import { logWithLocation } from "../utils/ssr-helpers";
import { Originator } from "../types/ssr.types";

@Component<SSR>({
  // TODO: DEMO Autocomplete component features - ctx, watch values, etc
  async fetch(ctx) {
    logWithLocation("Page - async fetch");
    this.asyncFetchOrig = process.server
      ? Originator.SERVER
      : Originator.CLIENT;
  },
  asyncData(ctx): Partial<SSR> {
    logWithLocation("Page - asyncData");
    return {
      asyncDataOrig: process.server ? Originator.SERVER : Originator.CLIENT,
    };
  },
})
export default class SSR extends ComponentStoreHelper {
  public asyncFetchOrig: Originator = null;
  public asyncDataOrig: Originator = null;

  constructor() {
    super();
    logWithLocation("Page - init");
  }
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title> Server-Side Rendering </v-card-title>
      <v-card-subtitle
        >Where do fetch and asyncData get called?</v-card-subtitle
      >
      <v-card-text>
        <v-col><h4>Page</h4></v-col>
        <v-col>
          async fetch Ran: <b>{{ asyncFetchOrig }}</b>
        </v-col>
        <v-col>
          asyncData Ran: <b>{{ asyncDataOrig }}</b>
        </v-col>
        <v-row>
          <ssr-component-vanilla></ssr-component-vanilla>
          <ssr-component-class></ssr-component-class>
          <ssr-component-composite></ssr-component-composite>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> About </v-card-title>
      <v-card-text>
        <p>
          This page demonstrates where a page and components
          <code>async fetch</code> and <code> asyncDate</code> get called.
        </p>
        <p>
          Notice how the only populated value is the page's
          <code>asyncData</code>. There's some unsolved issues here...
        </p>
        <p>
          <ul>
            <li>
              The page's <code>async fetch</code> does run (see console), however
              the changes to <code>this</code> are not reflected when rendered
            </li>
            <li>Vanilla Component (matches dashboard)
              <ul>
                <li>Neither async fetch or asyncData run! This is not expected</li>
              </ul>
            </li>
            <li>Class Component (created as a class using decorators)
              <ul>
                <li>Neither async fetch or asyncData run! This is expected</li>
              </ul>
            </li>
            <li>Composite API Componet (like Vanilla, but created via composition-api)
              <ul>
                <li>Neither async fetch or asyncData run! This is not expected</li>
                <li>After switching from @vue/composition-api to @nuxtjs/composition-api and using the setup/useFetch approach this seems to almost work (load in SSR is blocked on fetch)</li>
              </ul>
            </li>
          </ul>
        </p>
        <p>
          There will be manual ways to work around this, such as plugging into
          other hooks which do work (<code>created</code>, others, etc). HOWEVER
          I'm not 100% sure how these would tie in with the Dashboard's
          <code>/plugins/steve/index.js</code> use of
          <code>windows.__NUXT__.(data|fetch)</code>
        </p>
        <p>
          Related files
          <ul>
            <li><code>./components/ssr-component-class.vue</code></li>
            <li><code>./components/ssr-component-composite.vue</code></li>
            <li><code>./components/ssr-component-vanilla.vue</code></li>
          </ul>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

import { initialiseStores } from '@/store';
import { Vue } from 'nuxt-property-decorator';

import { DemoStore } from '../store/types';

/**
 * Helper that provides components with a typed way to access the Vuex store.
 *
 * For components this requires glueing the store to the typed store modules, as in SSR mode it can differ to
 * that created at the server (TODO: DEMO This is what blocks us from using vuex-module-decorators in the Dashboard)
 */
export abstract class ComponentStoreHelper extends Vue {
  protected store: DemoStore;

  constructor() {
    super();
    this.store = initialiseStores(this.$store, false);
  }
}

// Was hoping this wouldn't be needed if store was initialised via nuxtServerInit/nuxtClientInit. Haven't tried here but didn't work in dashboard
// See https://stackoverflow.com/questions/58814678/nuxtserverinit-with-vuex-module-decorators


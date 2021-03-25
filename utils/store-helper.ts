import { initialiseStores } from '@/store';
import { Vue } from 'nuxt-property-decorator';

import { DemoStore } from '../store/types';

/**
 * Helper that provides components with a typed way to access the Vuex store.
 *
 * For components this requires glueing the store to the typed store modules, as in SSR mode it can differ to
 * that created at the server
 */
export abstract class ComponentStoreHelper extends Vue {
  protected store: DemoStore;

  constructor() {
    super();
    this.store = initialiseStores(this.$store, false);
  }
}


import { initialiseStores } from '@/store';
import { Vue } from 'nuxt-property-decorator';

import { DemoStore } from '../store/types';



export abstract class ComponentStoreHelper extends Vue {
  protected store: DemoStore;

  constructor() {
    super();
    this.store = initialiseStores(this.$store, false);
  }
}


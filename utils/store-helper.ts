import { Vue } from 'nuxt-property-decorator';
import { getModule } from 'vuex-module-decorators';

import Counter from '../store/counter';
import { DemoStore } from '../store/types';



export abstract class ComponentStoreHelper extends Vue {
  protected store: DemoStore;

  constructor() {
    super();
    this.store = {
      counter: getModule(Counter, this.$store)
    };
  }
}


import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import Counter from '../store/counter';
import { DemoStore } from '../store/types';

let store: DemoStore = {
  counter: null
};

function initialiseStores(vStore: Store<any>): void {
  store.counter = getModule(Counter, vStore);
}

export { initialiseStores, store };

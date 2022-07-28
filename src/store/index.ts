import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import { moduleInt, vocabularyInt } from './types';

import listsModule from './lists';
import vocabularyModule from './vocabulary';

export interface StateInterface {
  listsModule: moduleInt
  vocabularyModule: vocabularyInt
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key');

export default store((/* { ssrContext } */) => {
  const Store = createStore<StateInterface>({
    modules: {
      listsModule,
      vocabularyModule,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}

// import { Store } from 'vuex';
import { List } from '../types/types';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    lists: Array<List>
  }
}

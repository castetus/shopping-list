import { useStore } from 'vuex';
import { List } from '../types/types';
import { storeKey } from '../store/index';

const store = useStore(storeKey);

export const removeList = (list: List) => {
  store.commit('listsModule/REMOVE_LIST', list);
};

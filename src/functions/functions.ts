import { useStore } from 'vuex';
import { List } from '../types/types';
import { storeKey } from '../store/index';

const store = useStore(storeKey);

export const saveList = (list: List) => {
  store.commit('listsModule/SAVE_LIST', list);
};

export const removeList = (list: List) => {
  store.commit('listsModule/REMOVE_LIST', list);
};

import { List } from 'src/types/types';
import { Module, GetterTree, MutationTree } from 'vuex';
import { ListItem } from '../types/types';
import { moduleInt } from './types';
import { StateInterface } from './index';

const state:moduleInt = {
  lists: [
    {
      id: 1,
      name: 'examle1',
      items: [
        {
          id: 1,
          text: 'example item 1',
          qty: 1,
          checked: false,
        },
        {
          id: 2,
          text: 'example item 2',
          qty: null,
          checked: false,
        },
        {
          id: 3,
          text: 'example item 3',
          qty: 1,
          checked: false,
        },
        {
          id: 4,
          text: 'example item 4',
          qty: null,
          checked: false,
        },
        {
          id: 5,
          text: 'example item 5',
          qty: 1,
          checked: false,
        },
        {
          id: 6,
          text: 'example item 6',
          qty: 1,
          checked: true,
        },
      ],
    },
    {
      id: 2,
      name: 'examle2',
      items: [],
    },
  ],
};

const getters: GetterTree<moduleInt, StateInterface> = {

  getListById:
    (moduleState) => (id: number): List | undefined => moduleState.lists
      .find((list) => list.id === id),

  testGetter(): string {
    return 'testGetter';
  },
};

const mutations: MutationTree<moduleInt> = {
  TOGGLE_CHECK(moduleState, payload: {listId: number, itemId: number}) {
    const list = moduleState.lists.find((el) => el.id === payload.listId);
    const item = list?.items.find((el) => el.id === payload.itemId);
    if (item) {
      item.checked = !item?.checked;
    }
  },
  SAVE_LIST(moduleState, payload: List) {
    const list = moduleState.lists.find((el) => el.id === payload.id);
    if (list) {
      Object.assign(list, payload);
    } else {
      moduleState.lists.unshift(payload);
    }
  },
  REMOVE_LIST(moduleState, payload: List) {
    const index = moduleState.lists.findIndex((el) => el.id === payload.id);
    moduleState.lists.splice(index, 1);
  },
  ADD_ITEM(moduleState, payload: {listId: number, newItem: ListItem}) {
    const list = moduleState.lists.find((el) => el.id === payload.listId);
    list?.items.unshift(payload.newItem);
  },
};

const listsModule: Module<moduleInt, StateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default listsModule;

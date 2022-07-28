import { List } from 'src/types/types';
import { Module, GetterTree } from 'vuex';
import { moduleInt } from './types';
import { StateInterface } from './index';

const state:moduleInt = {
  lists: [
    {
      id: 1,
      name: 'examle1',
      items: [
        {
          text: 'example item 1',
          qty: 1,
          checked: false,
        },
        {
          text: 'example item 2',
          qty: null,
          checked: false,
        },
        {
          text: 'example item 3',
          qty: 1,
          checked: false,
        },
        {
          text: 'example item 4',
          qty: null,
          checked: false,
        },
        {
          text: 'example item 5',
          qty: 1,
          checked: false,
        },
        {
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

const listsModule: Module<moduleInt, StateInterface> = {
  namespaced: true,
  getters,
  state,
};

export default listsModule;

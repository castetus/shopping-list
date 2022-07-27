import { List } from 'src/types/types';
import { State } from '@vue/runtime-core';
import { Module, GetterTree } from 'vuex';
import { StateInterface } from './index';

const getters = {
  getListById(state: State, id: number): List | undefined {
    return state.lists.find((list) => list.id === id);
  },
};

const listsModule = {
  namespaced: true,
  actions: {

  },
  getters,
  // getters: {
  //   getListById(state: State, id: number): List | undefined {
  //     return state.lists.find((list) => list.id === id);
  //   },
  // },
  mutations: {

  },
  state: {
    lists: [
      {
        id: 1,
        name: 'examle1',
        items: [
          {
            text: 'example item 1',
            qty: 1,
          },
          {
            text: 'example item 2',
            qty: 1,
          },
          {
            text: 'example item 3',
            qty: 1,
          },
          {
            text: 'example item 4',
            qty: 1,
          },
          {
            text: 'example item 5',
            qty: 1,
          },
          {
            text: 'example item 6',
            qty: 1,
          },
        ],
      },
      {
        id: 2,
        name: 'examle2',
        items: [],
      },
    ],
  },
};

export default listsModule;

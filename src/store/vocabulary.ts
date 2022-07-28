import { Module, MutationTree } from 'vuex';
import { StateInterface } from './index';
import { vocabularyInt } from './types';

const state = {
  vocabulary: [

  ],
};

const mutations: MutationTree<vocabularyInt> = {
  SET_VOCABULARY(moduleState: vocabularyInt, payload: string[]) {
    moduleState.vocabulary = payload;
  },
  ADD_WORD(moduleState: vocabularyInt, payload: string) {
    moduleState.vocabulary.push(payload);
  },
};

const vocabularyModule: Module<vocabularyInt, StateInterface> = {
  namespaced: true,
  state,
  mutations,
};

export default vocabularyModule;

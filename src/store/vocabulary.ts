import { Module, MutationTree, ActionTree } from 'vuex';
import { StateInterface } from './index';
import { vocabularyInt } from './types';
import Api from './Api';

const api = new Api();

const state = {
  vocabulary: [],
};

const actions: ActionTree<vocabularyInt, StateInterface> = {
  // eslint-disable-next-line no-shadow
  async addWord({ state, commit, dispatch }, payload: string) {
    commit('ADD_WORD', payload);
    await dispatch('writeVocabulary', state.vocabulary);
  },
  writeVocabulary({ commit }, data: vocabularyInt) {
    const write = api.write('vocabulary', data);
    if (write) {
      commit('SET_VOCABULARY', data);
    }
  },
  // eslint-disable-next-line no-shadow
  readVocabulary({ commit }) {
    const result = api.read('vocabulary');
    if (result) {
      commit('SET_VOCABULARY', result);
    }
  },
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
  actions,
  mutations,
};

export default vocabularyModule;

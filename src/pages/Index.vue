<template>
  <q-page class="items-center justify-evenly">
    <div
      class="list"
      v-for="(list, index) in lists"
      :key="index"
      >
      <div class="list__content">
        <router-link
          class="list__link"
          :to="{name: 'list', params: {id: list.id}}"
        >{{list.name}}
        </router-link>
        <q-btn flat icon="edit" @click="toggleListEditor(list.id)"></q-btn>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="toggleListEditor"/>
    </q-page-sticky>
  </q-page>
    <q-dialog v-model="listEditorOpen">
      <ListEditor
        :list="currentList"
        @saveList="saveList"
        @removeList="removeList"
      />
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { List } from 'src/types/types';
import { useStore } from 'vuex';
import { storeKey } from '../store/index';
import ListEditor from '../components/ListEditor.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    ListEditor,
  },
  setup() {
    const store = useStore(storeKey);
    const lists = computed((): Array<List> => store.state.listsModule.lists);

    const listEditorOpen = ref(false);
    const currentList = ref();

    const toggleListEditor = (listId: null | number = null) => {
      if (listId) {
        currentList.value = lists.value.find((el) => el.id === listId);
      }
      listEditorOpen.value = !listEditorOpen.value;
    };

    const saveList = async (list: List) => {
      console.log(typeof lists.value, Array.isArray(lists.value));
      const savedLists = { ...lists.value };
      console.log(savedLists);
      const index = lists.value.findIndex((el) => el.id === list.id);
      if (index !== -1) {
        savedLists[index] = list;
      } else {
        lists.value.unshift(list);
      }
      await store.dispatch('listsModule/saveLists', lists.value);
    };

    const removeList = async (listId: number) => {
      const savedLists = { ...lists.value };
      const index = savedLists.findIndex((el) => el.id === listId);
      savedLists.splice(index, 1);
      await store.dispatch('listsModule/saveLists', savedLists);
    };

    return {
      lists,
      listEditorOpen,
      toggleListEditor,
      currentList,
      saveList,
      removeList,
    };
  },
});
</script>

<style lang="scss">
  .list {
    background: $paper-color;
    box-shadow: 0 0 10px rgba(19, 18, 18, 0.3);
    padding: 10px;

    &:last-child {
      min-height: 100vh;
    }
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__link {
      color: $dark;
      text-decoration: none;
    }
  }
</style>

<template>
  <q-page>
    <div class="input-field">
      <q-input outlined dense v-model.trim="newItemText" @keypress.enter="addItem">
        <template v-slot:append>
          <q-btn flat @click="addItem">
            <q-icon name="add"/>
          </q-btn>
        </template>
      </q-input>
      <div class="menu-container">
        <q-menu no-focus v-model="isSuggestOpen">
          <q-list style="min-width: 100px">
            <q-item
              v-for="(suggest, index) in suggests"
              :key="index"
              clickable
              v-close-popup
              @click="addItem(suggest)"
            >
              <q-item-section>{{suggest}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>
    <div class="paper">
      <template v-if="items.length">
        <div
          class="list-item"
          v-for="(item, index) in items"
          :key="index"
        >
          <div :class="['list-item__content', { 'list-item__content_crossed-out': item.checked }]">
            <span class="list-item__number">{{index + 1}}.</span>
            <span class="list-item__text">{{item.text}}</span>
            <span class="list-item__qty">{{item.qty}}</span>
          </div>
          <div class="list-item__actions">
            <q-btn
              v-if="!item.checked"
              flat
              icon="edit"
              size="xs"
              class="list-item__btn"
              @click="openEditor(index)"
            />
            <q-btn
              flat
              :icon="item.checked ? 'remove_done' : 'check'"
              size="xs"
              class="list-item__btn"
              @click="toggleCheck(index)"
            />
          </div>
        </div>
      </template>
    </div>
    <q-dialog v-model="isEditorOpen">
      <ItemEditor :item="currentItem" @save="saveItem"/>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, computed, reactive, ref, onBeforeUnmount, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ItemEditor from 'src/components/ItemEditor.vue';
import { List, ListItem } from 'src/types/types';
import type { Ref } from 'vue';
import { storeKey } from '../store/index';

export default defineComponent({

  components: { ItemEditor },

  setup() {
    const route = useRoute();
    const listId = Number(route.params.id);

    const store = useStore(storeKey);
    const { vocabulary } = store.state.vocabularyModule;
    const lists = computed(() => store.state.listsModule.lists);
    const currentList = lists.value.find((el) => el.id === listId);
    if (!currentList) {
      return false;
    }

    const items = currentList ? currentList.items : [];

    const currentItem = reactive({});

    const isEditorOpen = ref(false);
    const isSuggestOpen = ref(false);
    const suggests: Ref<string[]> = ref([]);

    const newItemText = ref('');

    const saveList = (list: List) => {
      store.commit('listsModule/SAVE_LIST', list);
    };

    const addItem = async (text = '') => {
      if (!text || typeof text !== 'string') {
        text = newItemText.value;
        await store.dispatch('vocabularyModule/addWord', newItemText.value);
      }
      const newItem: ListItem = {
        id: Date.now(),
        text,
        qty: null,
        checked: false,
      };
      store.commit('listsModule/ADD_ITEM', { listId, newItem });
      newItemText.value = '';
    };

    const openEditor = (index: number) => {
      Object.assign(currentItem, items[index]);
      isEditorOpen.value = true;
    };

    const showSuggest = (str: string) => {
      suggests.value = vocabulary.filter((el) => el.includes(str)).sort();
      isSuggestOpen.value = true;
    };

    const toggleCheck = (index: number) => {
      const item = items[index];
      items.splice(index, 1);
      item.checked = !item.checked;
      if (item.checked) {
        items.push(item);
      } else {
        items.unshift(item);
      }
      store.commit('listsModule/SAVE_LIST', currentList);
    };

    const saveItem = (item: ListItem) => {
      const index = currentList.items.findIndex((el) => el.id === item.id);
      currentList.items[index] = item;
      saveList(currentList);
    };

    watch(newItemText, (val) => {
      if (newItemText.value.length < 3) {
        isSuggestOpen.value = false;
        return false;
      }
      showSuggest(val);
      return true;
    });

    onBeforeUnmount(() => saveList(currentList));

    return {
      curLink: route.params.id,
      items,
      isEditorOpen,
      openEditor,
      toggleCheck,
      currentItem,
      newItemText,
      addItem,
      isSuggestOpen,
      suggests,
      saveItem,
    };
  },
});
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
    &__content {
      &_crossed-out {
        text-decoration: line-through;
      }
    }
    &__btn {
      height: 31px;
      line-height: 0;
    }
  }
</style>

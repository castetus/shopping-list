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
      <ItemEditor :item="currentItem" />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, computed, reactive, ref, onBeforeUnmount,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ItemEditor from 'src/components/ItemEditor.vue';
import { ListItem } from 'src/types/types';
import { saveList, removeList } from '../functions/functions';
import { storeKey } from '../store/index';

export default defineComponent({

  components: { ItemEditor },

  setup() {
    const route = useRoute();
    const listId = Number(route.params.id);

    const store = useStore(storeKey);
    const lists = computed(() => store.state.listsModule.lists);
    const currentList = lists.value.find((el) => el.id === listId);
    if (!currentList) {
      return false;
    }

    const items = currentList ? currentList.items : [];

    const currentItem = reactive({});

    const isEditorOpen = ref(false);

    const newItemText = ref('');

    const addItem = () => {
      const newItem: ListItem = {
        id: Date.now(),
        text: newItemText.value,
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

    const toggleCheck = (index: number) => {
      const payload = {
        listId: currentList.id,
        itemId: items[index].id,
      };
      store.commit('listsModule/TOGGLE_CHECK', payload);
    };

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

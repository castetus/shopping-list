<template>
  <q-page>
    <div class="paper">
      <template v-if="items.length">
        <div
          :class="['list-item', { 'list-item_crossed-out': item.checked }]"
          v-for="(item, index) in items"
          :key="index"
        >
          <span class="list-item__number">{{index + 1}}.</span>
          <span class="list-item__text">{{item.text}}</span>
          <span class="list-item__qty">{{item.qty}}</span>
          <q-btn
            flat
            icon="edit"
            size="xs"
            class="list-item__btn"
            @click="openEditor(index)"
          />
        </div>
      </template>
    </div>
    <q-dialog v-model="isEditorOpen">
      <ItemEditor :item="currentItem"/>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  defineComponent, computed, reactive, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ItemEditor from 'src/components/ItemEditor.vue';
import { storeKey } from '../store/index';

export default defineComponent({

  components: { ItemEditor },

  setup() {
    const route = useRoute();
    const listId = Number(route.params.id);

    const store = useStore(storeKey);

    const lists = computed(() => store.state.listsModule.lists);
    const currentList = lists.value.find((el) => el.id === listId);
    const items = currentList ? currentList.items : [];

    const currentItem = reactive({});

    const isEditorOpen = ref(false);

    const openEditor = (index) => {
      Object.assign(currentItem, items[index]);
      isEditorOpen.value = true;
    };

    return {
      curLink: route.params.id,
      items,
      isEditorOpen,
      openEditor,
      currentItem,
    };
  },
});
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
    &__btn {
      height: 31px;
      line-height: 0;
    }
    &_crossed-out {
      text-decoration: line-through;
    }
  }
</style>

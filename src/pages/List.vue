<template>
  <q-page>
    <div class="paper">
      <template v-if="items.length">
        <div
          class="list-item"
          v-for="(item, index) in items"
          :key="index"
        >
          <span class="list-item__number">{{index + 1}}.</span>
          <span class="list-item__text">{{item.text}}</span>
          <span class="list-item__qty">{{item.qty}}</span>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ListItem } from 'src/types/types';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { storeKey } from '../store/index';

export default defineComponent({

  setup() {
    const route = useRoute();
    const listId = route.params.id;

    const store = useStore(storeKey);

    const currentList = store.getters['listsModule/getListById'](1);

    console.log(currentList);

    // const getItems = (route.params.id) => {
    //   computed(() => )
    // }
    return {
      curLink: route.params.id,
      items: [],
      // _items,
    };
  },
});
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
  }
</style>

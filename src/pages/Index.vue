<template>
  <q-page class="items-center justify-evenly">
    <div
      class="list"
      v-for="(list, index) in lists"
      :key="index"
      >
      <router-link
        class="list__link"
        :to="{name: 'list', params: {id: list.id}}"
      >{{list.name}}
      </router-link>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { List } from 'src/types/types';
import { useStore } from 'vuex';
import { storeKey } from '../store/index';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const store = useStore(storeKey);

    const lists = computed((): Array<List> => store.state.listsModule.lists);
    return {
      lists,
    };
  },
});
</script>

<style lang="scss">
  .list {
    &__link {
      color: $dark;
      text-decoration: none;
    }
  }
</style>

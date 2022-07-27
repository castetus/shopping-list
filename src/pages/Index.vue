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
    <example-component
      v-show="false"
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref, computed } from 'vue';
import { List } from 'src/types/types';
import { useStore } from 'vuex';
import { storeKey } from '../store/index';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup() {
    const store = useStore(storeKey);

    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return {
      todos,
      meta,
      lists: computed((): Array<List> => store.state.listsModule.lists),
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

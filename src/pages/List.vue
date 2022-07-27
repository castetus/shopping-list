<template>
  <q-page>
    {{curLink}}
  </q-page>
</template>

<script lang="ts">
// import { List } from 'src/types/types';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
// import { ref, watch } from 'vue';

export default defineComponent({
  // props: {
  //   lists: {
  //     type: Array as PropType<Array<List>>,
  //     default: () => [],
  //   },
  // },
  setup() {
    const route = useRoute();
    return {
      curLink: route.params.id,
    };
  },
});
</script>

<style scoped>

</style>

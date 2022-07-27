<template>
  <div class="lists">
  </div>
</template>

<script lang="ts">
import { List } from 'src/types/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    lists: {
      type: Array as PropType<Array<List>>,
      default: () => [],
    },
  },
});
</script>

<style scoped>

</style>

<template>
      <q-card style="width: 90%">
        <q-card-section>
          <div class="text-h6">List name:</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense autofocus v-model="data.text"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup />
        </q-card-actions>
      </q-card>
</template>

<script lang="ts">
import { ListItem } from 'src/types/types';
import {
  defineComponent, PropType, onMounted, reactive,
} from 'vue';

export default defineComponent({
  name: 'ItemEditor',
  props: {
    item: {
      type: Object as PropType<ListItem>,
    },
  },

  setup(props) {
    const data: ListItem = reactive({
      text: '',
      qty: null,
      checked: false,
    });

    onMounted(() => {
      Object.assign(data, props.item);
    });

    return {
      data,
    };
  },
});
</script>

<style scoped>

</style>

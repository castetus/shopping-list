<template>
      <q-card style="width: 90%">
        <q-card-section class="q-pt-none">
          <q-input dense autofocus v-model="data.text" @keypress.enter="save"/>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="data.qty" @keypress.enter="save"/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup @click="save"/>
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

  setup(props, { emit }) {
    const data: ListItem = reactive({
      id: 0,
      text: '',
      qty: null,
      checked: false,
    });

    onMounted(() => {
      Object.assign(data, props.item);
    });

    const save = () => {
      emit('save', data);
    };

    return {
      data,
      save,
    };
  },
});
</script>

<style scoped>

</style>

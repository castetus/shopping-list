<template>

      <q-card style="width: 90%">
        <q-card-section>
          <div class="text-h6">List name:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="_list.name" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Remove" v-close-popup @click="remove"/>
          <q-btn flat label="Save" v-close-popup @click="save"/>
        </q-card-actions>
      </q-card>

</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { List } from '../types/types';

export default defineComponent({

  props: {
    list: {
      type: Object as PropType<List>,
      default: (): List => ({
        id: Date.now(),
        name: '',
        items: [],
      }),
    },
  },

  setup(props, { emit }) {
    const _list = ref(props.list).value;
    console.log(props.list);

    const save = () => {
      emit('saveList', _list);
    };

    const remove = () => {
      emit('removeList', _list?.id);
    };

    return {
      _list,
      save,
      remove,
    };
  },
});
</script>

<style>

</style>

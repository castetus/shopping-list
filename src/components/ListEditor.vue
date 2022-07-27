<template>

      <q-card style="width: 90%">
        <q-card-section>
          <div class="text-h6">List name:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="_listName" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup />
        </q-card-actions>
      </q-card>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    listName: {
      type: String,
      default: '',
    },
  },

  computed: {
    _listName: {
      get() {
        return this.listName;
      },
      set(val: string) {
        this.$emit('emit', val);
      },
    },
  },

  setup() {
    return {

    };
  },
});
</script>

<style>

</style>

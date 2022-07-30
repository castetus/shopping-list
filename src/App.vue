<template>
  <div id="q-app">
    <MainLayout />
  </div>
</template>
<script lang="ts">
import MainLayout from 'layouts/MainLayout.vue';
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { storeKey } from './store/index';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },

  setup() {
    const store = useStore(storeKey);
    onMounted(async () => store.dispatch('vocabularyModule/readVocabulary'));
  },
});
</script>

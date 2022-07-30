<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
        <q-btn v-if="!rootPage">
          <router-link to="/">
            <q-icon name="arrow_back" color="grey-1"></q-icon>
          </router-link>
        </q-btn>
        <q-space></q-space>
        <q-btn outline color="grey-1" icon="add" @click="toggleListEditor" v-if="rootPage"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="listEditorOpen">
      <ListEditor :listName="''"/>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import ListEditor from '../components/ListEditor.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    ListEditor,
  },

  setup() {
    const listEditorOpen = ref(false);

    const rootPage = computed(() => useRoute().path === '/');

    return {
      listEditorOpen,
      toggleListEditor() {
        listEditorOpen.value = !listEditorOpen.value;
      },
      rootPage,
    };
  },
});
</script>

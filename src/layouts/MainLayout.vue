<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn outline color="grey-1" icon="add" @click="toggleListEditor"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="listName">
      <ListEditor :listName="''"/>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListEditor from '../components/ListEditor.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    ListEditor,
  },

  setup() {
    const listEditorOpen = ref(false);

    return {
      toggleListEditor() {
        listEditorOpen.value = !listEditorOpen.value;
      },
    };
  },
});
</script>

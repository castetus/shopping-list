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
        <q-btn outline color="grey-1" icon="add"  v-if="rootPage"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const rootPage = computed(() => useRoute().path === '/');

    return {
      rootPage,
    };
  },
});
</script>

<template>
  <q-layout view="lhh Lpr lFf" class="main">
    <q-bar class="q-electron-drag menu-bar bg-dark fixed-top z-max">
      <q-btn
        dense
        flat
        round
        icon="lens"
        size="8.5px"
        color="red"
        @click="$store.close"
      />
      <q-btn
        dense
        flat
        round
        icon="lens"
        size="8.5px"
        color="yellow"
        @click="$store.minimize"
      />
      <q-btn dense flat round icon="lens" size="8.5px" color="green" />
      <div class="col text-center text-weight-light">Music player</div>
    </q-bar>
    <q-header class="bg-transparent">
      <q-toolbar class="q-electron-drag--exception">
        <q-toolbar-title
          class="text-subtitle1 text-center text-uppercase offset-2"
        >
          Player
        </q-toolbar-title>
        <q-btn round unelevated icon="search" text-color="white" />
      </q-toolbar>
    </q-header>

    <q-page-container class="offset-top-header">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { usePlayerStore } from "src/pages/Player/store";

const $store = usePlayerStore();
const $q = useQuasar();

$q.dark.set(true);
</script>
<style scoped lang="sass">
.menu-bar
  -webkit-user-select: none
  -webkit-app-region: drag

.offset-top-header
  margin-top: 32px
.main
  background-image: radial-gradient(184.07% 98.85% at 0% 0%, rgba(72, 163, 229, 0.2) 0%, rgba(0, 0, 0, 0) 100%)
</style>

<template>
  <q-card class="q-px-lg bg-transparent" flat>
    <div class="row">
      <q-img
        :ratio="1 / 1"
        width="280px"
        class="rounded-borders q-mx-auto"
        :src="imageSrc"
      />
    </div>
    <q-card-section class="text-center">
      <div class="text-h6">{{ music }}</div>
      <div class="text-body2 text-weight-light">{{ artist }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { makeProp } from "src/utils/makeProp";
defineProps({
  music: makeProp(String, ""),
  artist: makeProp(String, ""),
  imageSrc: makeProp([String, File], ""),
});
</script>

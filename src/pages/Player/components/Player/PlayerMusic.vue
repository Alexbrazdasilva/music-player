<template>
  <audio controls :src="musicSrc" ref="player"></audio>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from "vue";

import { makeProp } from "src/utils/makeProp";

const props = defineProps({
  musicSrc: makeProp([String, File], ""),
});

const emits = defineEmits(["timeupdated"]);

const player = ref("");
const isPlaying = ref(false);

const totalTimeMusic = computed(() =>
  player.value ? player.value.duration : 0
);

function play() {
  if (!player.value) return;
  isPlaying.value = true;
  player.value.play();
}

function pause() {
  if (!player.value) return;
  isPlaying.value = false;
  player.value.pause();
}

function toggle() {
  isPlaying.value ? pause() : play();
}

function convertTimeToPercent(time = 0) {
  const delimitedTime = ((time / totalTimeMusic.value) * 100).toFixed(2);
  return parseFloat(delimitedTime);
}

function convertPercentToTime(percent) {
  const delimitedTime = ((percent * totalTimeMusic.value) / 100).toFixed(2);
  return parseFloat(delimitedTime);
}

function setTimeMusic(percent) {
  if (!player.value) return;
  player.value.currentTime = convertPercentToTime(percent);
}

function triggerUpdateTime(event) {
  emits("timeupdated", convertTimeToPercent(event.target.currentTime || 0));
}

onMounted(() => {
  if (player.value) {
    player.value.addEventListener("timeupdate", triggerUpdateTime);
  }
});

onBeforeUnmount(() => {
  if (player.value) {
    player.value.removeEventListener("timeupdate", triggerUpdateTime);
  }
});

defineExpose({
  toggle,
  totalTimeMusic,
  setTimeMusic,
});
</script>

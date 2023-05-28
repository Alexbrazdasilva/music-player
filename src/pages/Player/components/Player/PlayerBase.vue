<template>
  <div class="row justify-center items-center">
    <q-btn
      color="grey"
      round
      flat
      icon="skip_previous"
      size="md"
      @click="$emit('prev')"
    />
    <q-btn
      color="accent"
      round
      :icon="iconPlayButton"
      :disable="disabled"
      size="lg"
      class="q-mx-md"
      @click="togglePlay"
    />
    <q-btn
      color="grey"
      round
      flat
      icon="skip_next"
      size="md"
      @click="$emit('next')"
    />
  </div>
</template>
<script setup>
import { useVModel } from "src/composables/useVModel";
import { makeProp } from "src/utils/makeProp";
import { computed } from "vue";

const props = defineProps({
  modelValue: makeProp(Boolean, false),
  disabled: makeProp(Boolean, false),
});
const emits = defineEmits(["prev", "next", "toggle", "update:modelValue"]);

const playModel = useVModel(props, "modelValue", emits);

const iconPlayButton = computed(() =>
  props.modelValue ? "pause" : "play_arrow"
);

function togglePlay() {
  playModel.value = !playModel.value;
  emits("toggle", playModel.value);
}
</script>

<template>
  <q-slider
    v-model="timeMusic"
    @change="$emit('change-time', timeMusic)"
    :min="min"
    :max="max"
    :step="0.1"
    color="accent"
    thumb-size="20px"
  />
</template>
<script setup>
import { useVModel } from "src/composables/useVModel";
import { makeProp } from "src/utils/makeProp";

const props = defineProps({
  modelValue: makeProp(Number, 0),
  max: makeProp(Number, 0),
  min: makeProp(Number, 0),
});

const emits = defineEmits(["update:modelValue", "change-time"]);

const timeMusic = useVModel(props, "modelValue", emits);
</script>

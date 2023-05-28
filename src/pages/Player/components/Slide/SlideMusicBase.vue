<template>
  <div class="slider-base">
    <div class="container-slider" :style="indexScroll">
      <transition-group>
        <div
          v-for="(item, key) in listSlides"
          :key="'slide_item_' + key"
          class="slide-item"
          :class="formatedClassSlider(key)"
          @click="changeMusic(key)"
        >
          <slot name="slide-item" :item="item"> </slot>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { computed, TransitionGroup } from "vue";
import { makeProp } from "src/utils/makeProp";
import { useVModel } from "src/composables/useVModel";

const props = defineProps({
  modelValue: makeProp([String, Number], 0),
  listSlides: makeProp(Array, []),
});

const emits = defineEmits(["update:modelValue", "changed"]);

const slide = useVModel(props, "modelValue", emits);

const indexScroll = computed(
  () => `transform: translateX(${slide.value * -100}%) !important`
);

function next() {
  slide.value += 1;
}

function previous() {
  slide.value -= 1;
}

function changeMusic(index) {
  const isNextItem = slide.value + 1 === index;
  const isPreviousItem = slide.value - 1 === index;

  if (isPreviousItem) {
    emits("changed");
    return previous();
  }
  if (isNextItem) {
    emits("changed");
    return next();
  }
}

function formatedClassSlider(index) {
  return {
    active: index === slide.value,
    next: index === slide.value + 1,
    previous: index === slide.value - 1,
  };
}

defineExpose({
  next,
  previous,
});
</script>
<style scoped lang="sass"></style>

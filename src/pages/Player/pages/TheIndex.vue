<template>
  <div>
    <slide-music-base
      class="q-mt-md"
      v-model="activeMusic"
      :list-slides="listMusics"
      @changed="toNextMusic"
    >
      <template #slide-item="{ item }">
        <card-music-base
          :artist="item.artist"
          :music="item.name"
          :image-src="item.imageSrc"
        />
      </template>
    </slide-music-base>
    <div class="column q-px-md">
      <player-progress
        v-model="currentTime"
        :max="100"
        :min="0"
        @change-time="setTimeMusic($event)"
      />
      <player-base v-model="playMusic" @toggle="handlerPlay" />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch, watchEffect } from "vue";

import CardMusicBase from "pages/Player/components/CardMusic/CardMusicBase.vue";
import SlideMusicBase from "pages/Player/components/Slide/SlideMusicBase.vue";
import PlayerBase from "pages/Player/components/Player/PlayerBase.vue";
import PlayerProgress from "pages/Player/components/Player/PlayerProgress.vue";

import { useMusicPlayer } from "src/composables/useMusicPlayer";

const playMusic = ref(false);
const {
  currentTime,
  duration,
  playing,
  pause,
  play,
  stop,
  setTimeMusic,
  setMusic,
} = useMusicPlayer(undefined, {
  playing: false,
});

const activeMusic = ref(0);
// const player = ref(null);
const listMusics = [
  {
    artist: "Jhon Doe",
    name: "Music Track # 1",
    imageSrc:
      "https://images.unsplash.com/photo-1618176581851-09b9b340f8c9?fit=crop&w=400&q=75",
    src: `https://lm-demos.s3.eu-west-2.amazonaws.com/16343/ALTE_SOUNDS_BY_YELLOW_SHOOTS_DEMO.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2P7ADQBSINJGXKUU%2F20230528%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230528T152659Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c5f5547cf6449e7964a3f54adc3318d07793b200680145eaf294086d582b38ed`,
  },
  {
    artist: "Jhon Doe",
    name: "Music Track # 2",
    imageSrc:
      "https://images.unsplash.com/photo-1545224144-b38cd309ef69?fit=crop&w=400&q=75",
    src: `https://lm-demos.s3.eu-west-2.amazonaws.com/16303/AFRO_QUEEN_ACAPELLAS_DEMO.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2P7ADQBSINJGXKUU%2F20230528%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230528T152813Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8cd4e83717b1f8c80952e13bd6d451a8cb5a080a55541298dbf6540ab59dfab2`,
  },
  {
    artist: "Jhon Doe",
    name: "Music Track # 3",
    imageSrc:
      "https://images.unsplash.com/photo-1504960868016-9a59a5172321?fit=crop&w=400&q=75",
  },
  {
    artist: "Jhon Doe",
    name: "Music Track # 1",
    imageSrc:
      "https://images.unsplash.com/photo-1618176581851-09b9b340f8c9?fit=crop&w=400&q=75",
  },
  {
    artist: "Jhon Doe",
    name: "Music Track # 2",
    imageSrc:
      "https://images.unsplash.com/photo-1545224144-b38cd309ef69?fit=crop&w=400&q=75",
  },
  {
    artist: "Jhon Doe",
    name: "Music Track # 3",
    imageSrc:
      "https://images.unsplash.com/photo-1504960868016-9a59a5172321?fit=crop&w=400&q=75",
  },
];

const nextMusic = computed(() => listMusics[activeMusic.value].src);

function toNextMusic() {
  if (activeMusic.value > -1) {
    setMusic(nextMusic.value);
    play();
  }
}

async function handlerPlay($event) {
  if ($event) {
    pause();
  }
  play();
}

// watchEffect(() => {
//   if (activeMusic.value > -1) {
//     setMusic();
//   }
// });
</script>

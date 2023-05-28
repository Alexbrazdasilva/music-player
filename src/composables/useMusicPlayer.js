import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRef,
  toRefs,
  watchEffect,
} from "vue";

export function useMusicPlayer(initialSourceMusic, initialState) {
  const { playing = true, time = 0 } = initialState;

  const state = reactive({
    currentTime: time,
    playing: playing,
  });

  const player = new Audio(state.sourceMusic);
  const duration = computed(() => player.duration);

  function playerIsPlaying() {
    const isPlaying = player.currentTime > 0 && !player.paused && !player.ended;
    return isPlaying;
  }

  function play() {
    if (!playerIsPlaying()) {
      player.play();
    }
  }

  function pause() {
    state.playing = playerIsPlaying();
    return player.pause();
  }

  function stop(postPause = false) {
    setTimeMusic(0);
    postPause && pause();
  }

  function convertTimeToPercent(time = 0) {
    const delimitedTime = ((time / duration.value) * 100).toFixed(2);
    return parseFloat(delimitedTime);
  }

  function convertPercentToTime(percent) {
    const delimitedTime = ((percent * duration.value) / 100).toFixed(2);
    return parseFloat(delimitedTime);
  }

  function setTimeMusic(percent) {
    player.currentTime =
      percent === 0 ? percent : convertPercentToTime(percent);
  }

  function setMusic(src) {
    player.src = src;
    setTimeMusic(0);
  }

  function triggerUpdateTime(event) {
    state.currentTime = convertTimeToPercent(event.target.currentTime);
    // state.playing = !event.target.paused
  }

  onMounted(() => {
    player.addEventListener("timeupdate", triggerUpdateTime);

    if (initialSourceMusic) {
      setMusic(initialSourceMusic);
    }
  });

  onBeforeUnmount(() => {
    player.removeEventListener("timeupdate", triggerUpdateTime);
  });

  return {
    ...toRefs(state),
    setTimeMusic,
    setMusic,
    play,
    pause,
    stop,
    duration,
  };
}

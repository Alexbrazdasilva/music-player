import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'

export const usePlayerStore = defineStore('player-store', () => {
  const EVENT_BRIDGE_CONTEXT = 'player:bridge:exposed'
  const $q = useQuasar()

  function minimize() {
    if(!$q.platform.is.electron) return
    window[EVENT_BRIDGE_CONTEXT].minimize()
  }

  function close() {
    if(!$q.platform.is.electron) return
    window[EVENT_BRIDGE_CONTEXT].close()
  }

  return {
    minimize,
    close
  }
})

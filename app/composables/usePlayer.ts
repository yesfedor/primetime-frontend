import type { Ref } from 'vue'
import { computed } from 'vue'

const API_CONFIG = {
  host: 'primetime.su',
}

export enum PlayerAlias {
  lumex = 'lumex',
  tobaco = 'tobaco',
}

type PlayerAliasStrings = keyof typeof PlayerAlias

const playerAliasDefault = PlayerAlias.tobaco
const playerAlias = useCookie<PlayerAliasStrings>('player-alias', {
  default() {
    return playerAliasDefault as PlayerAliasStrings
  },
  path: '/',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  domain: import.meta.NUXT_COOKIE_DOMAIN,
})

export function usePlayer(kinopoiskId: Ref<string> | null) {
  const playerSrc = computed(() => {
    if (!kinopoiskId) {
      return ''
    }
    switch (playerAlias.value) {
      case PlayerAlias.lumex:
        return `https://p.lumex.pw//LDSZJq4uCNvY?kp_id=${kinopoiskId.value}&domain=${API_CONFIG.host}`
      case PlayerAlias.tobaco:
        return `https://api.tobaco.ws/embed/kp/${kinopoiskId.value}`
      default:
        return `https://p.lumex.pw//LDSZJq4uCNvY?kp_id=${kinopoiskId.value}&domain=${API_CONFIG.host}`
    }
  })

  const setPlayerAlias = (name: PlayerAliasStrings) => {
    if (!PlayerAlias[name]) {
      name = playerAliasDefault
    }
    playerAlias.value = name
  }

  return {
    playerAliasDefault,
    playerAlias,
    playerSrc,
    setPlayerAlias,
  }
}

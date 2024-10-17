import type { Ref } from 'vue'
import { computed } from 'vue'

const API_CONFIG = {
  host: 'primetime.su',
}

export enum PlayerAlias {
  mediafilm = 'mediafilm',
  svetacdn = 'svetacdn',
  cdnmovies = 'cdnmovies',
  tobaco = 'tobaco',
  voidboost = 'voidboost',
  gencit = 'gencit',
}

type PlayerAliasStrings = keyof typeof PlayerAlias

const playerAliasDefault = PlayerAlias.mediafilm
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
      case PlayerAlias.mediafilm:
        return `//player.mediafilm.in/LDSZJq4uCNvY?kp_id=${kinopoiskId.value}&domain=${API_CONFIG.host}`
      case PlayerAlias.svetacdn:
        return `//player.svetacdn.in/LDSZJq4uCNvY?kp_id=${kinopoiskId.value}&domain=${API_CONFIG.host}`
      case PlayerAlias.cdnmovies:
        return `https://ugly-turkey.cdnmovies-stream.online/kinopoisk/${kinopoiskId.value}/iframe`
      case PlayerAlias.tobaco:
        return `https://api.tobaco.ws/embed/kp/${kinopoiskId.value}`
      case PlayerAlias.voidboost:
        return `//voidboost.tv/embed/${kinopoiskId.value}`
      case PlayerAlias.gencit:
        return `https://gencit.info/aim/${kinopoiskId.value}`
      default:
        return `//player.svetacdn.in/LDSZJq4uCNvY?kp_id=${kinopoiskId.value}&domain=${API_CONFIG.host}`
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

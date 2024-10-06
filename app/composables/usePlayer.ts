import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const API_CONFIG = {
  host: 'primetime.su',
}

export enum PlayerAlias {
  svetacdn = 'svetacdn',
  voidboost = 'voidboost',
  cdnmovies = 'cdnmovies',
}

type PlayerAliasStrings = keyof typeof PlayerAlias

const playerAliasDefault = PlayerAlias.svetacdn
const playerAlias = useCookie<PlayerAliasStrings>('player-alias', {
  default() {
    return playerAliasDefault as PlayerAliasStrings
  },
  path: '/',
  maxAge: 30 * 24 * 60 * 60 * 1000,
})

export function usePlayer(kinopoiskId: Ref<string> | null) {
  const playerSrc = computed(() => {
    if (!kinopoiskId) {
      return ''
    }
    switch (playerAlias.value) {
      case PlayerAlias.svetacdn:
        return `//player.svetacdn.in/LDSZJq4uCNvY?kp_id=${kinopoiskId.value}&domain=${API_CONFIG.host}`
      case PlayerAlias.voidboost:
        return `//voidboost.tv/embed/${kinopoiskId.value}`
      case PlayerAlias.cdnmovies:
        return `https://ugly-turkey.cdnmovies-stream.online/kinopoisk/${kinopoiskId.value}/iframe`
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

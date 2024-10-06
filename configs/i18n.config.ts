import { defineI18nConfig } from '#i18n'
import { pluralRules } from '~/utils/pluralRules.helper'

export default defineI18nConfig(() => {
  return {
    pluralizationRules: {
      ru: pluralRules,
    },
  }
})

export const UTM_SOURCE_KEY = 'source'

export enum UTM_SOURCE {
  // From share
  shareapi = 'shareapi',
  // From history page
  watchcard = 'watchcard',
  // From auth page
  authpage = 'authpage',
  // From auth page with meta 'from'
  authfrom = 'authfrom',
  // From item in search page
  searchpage = 'searchpage',
  // From item in search hint
  searchhint = 'searchhint',
  // From search text field
  searchbox = 'searchbox',
  // From trailer page
  trailerpage = 'trailerpage',
  // From watch page
  watchbox = 'watchbox',
}

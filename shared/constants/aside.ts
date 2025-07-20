import type { SharedAsideMenuChapter, SharedAsideMenuLinkItem } from '#shared/types/aside'

export function sharedMenuAddChapters(
  key: SharedAsideMenuChapter['key'],
  label: SharedAsideMenuChapter['label'],
  links: SharedAsideMenuChapter['links'],
  type: SharedAsideMenuChapter['type'] | null = null,
) {
  type ||= 'chapter'

  return {
    type,
    key,
    label,
    links,
  }
}

export function sharedMenuAddLinkItem(
  type: SharedAsideMenuLinkItem['type'],
  key: SharedAsideMenuLinkItem['key'],
  icon: SharedAsideMenuLinkItem['icon'],
  label: SharedAsideMenuLinkItem['label'],
  path: SharedAsideMenuLinkItem['path'],
  badge: SharedAsideMenuLinkItem['badge'] = undefined,
) {
  return {
    type,
    key,
    icon,
    label,
    path,
    badge,
  }
}

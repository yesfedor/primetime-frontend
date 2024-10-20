import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['app']['head']>>{
  title: process.env.NUXT_BASE_TITLE,
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      charset: 'utf-8',
    },
    {
      name: 'description',
      content: String(process.env.NUXT_PUBLIC_APP_DESCRIPTION),
    },
    {
      name: 'author',
      content: String(process.env.NUXT_PUBLIC_APP_AUTHOR),
    },
    {
      name: 'theme-color',
      content: String(process.env.NUXT_PUBLIC_APP_THEME_COLOR),
    },
    {
      name: 'copyright',
      content: 'PrimeTime',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'PrimeTime',
    },
    {
      name: 'application-name',
      content: 'PrimeTime',
    },
    {
      name: 'msapplication-TileColor',
      content: '#121212',
    },
    {
      name: 'msapplication-config',
      content: '/favicon/browserconfig.xml?v=1.0',
    },
    {
      name: 'theme-color',
      content: '#121212',
    },
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      href: '/favicon/apple-touch-icon.png?v=1.0',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png?v=1.0',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png?v=1.0',
    },
    {
      rel: 'manifest',
      href: '/favicon/site.webmanifest?v=1.0',
    },
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg?v=1.0',
      color: '#121212',
    },
    {
      rel: 'shortcut icon',
      href: '/favicon/favicon.ico?v=1.0',
    },
  ],
  style: [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: `
{
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "PrimeTime - онлайн кинотеатр",
  "url": "https://new.primetime.su"
}
      `,
    },
    {
      key: 'yandex-script',
      type: 'text/javascript',
      innerHTML: `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
 m[i].l=1*new Date();
 for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
 k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
 (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

 ym(94316253, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
 });
      `,
    },
  ],
  noscript: [
    {
      key: 'yandex-noscript',
      innerHTML: `<div><img src="https://mc.yandex.ru/watch/94316253" style="position:absolute; left:-9999px;" alt="" /></div>`,
    },
  ],
}

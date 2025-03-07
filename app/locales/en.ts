export default defineI18nLocale(() => {
  return {
    app: {
      theme: {
        label: 'Theme',
      },
      logo: {
        title: 'PrimeTime',
      },
      locales: {
        label: 'Language',
        en: 'English',
        ru: 'Русский',
      },
      loading: 'Загрузка..',
      no_result: 'Found nothing',
    },
    auth: {
      title: 'Authorization',
      next: 'Next',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      name: 'Name',
      surname: 'Surname',
      male: 'Male',
      female: 'Female',
      email: 'Email',
      password: 'Password',
      menu: {
        signin: 'Sign in',
        auth_for_watch: 'Signin for viewing',
      },
      errors: {
        419: 'Please repeat the request',
        1001: 'Enter your real name',
        1002: 'Enter the real name',
        1003: 'Enter your real date of birth, you should be more than 13 years old',
        1004: 'You should be more than 13 years old',
        1006: 'Account with the specified email address was not found',
        1007: 'This email already has an account',
        1008: 'The specified email address is invalid',
        1009: 'Enter a password whose length exceeds 7 characters',
        1010: 'Incorrect password',
      },
    },
    navigation: {
      admin: 'Admin Panel',
      home: 'Home',
      trand: 'In trend',
      searchFilter: 'Navigator',
      feed: 'New episodes',
      subscription: 'Subscriptions',
      history: 'History',
    },
    search: {
      title: 'Look for something',
      mini: 'Find',
      autocomplete: {
        empty: 'Look for something else',
        no_result: 'Nothing found',
        loading: 'Loading..',
      },
    },
    subscriptions: {
      title: 'My subscriptions',
      manager: {
        action: {
          subscribe: 'Subscribe',
          unsubscribe: 'Unsubscribe',
        },
      },
    },
    home: {
      seo_title: 'PrimeTime - онлайн-кинотеатр',
      title: 'PrimeTime - online-cinema',
      subtitle: 'Enjoy your viewing',
    },
    watch: {
      share: {
        title: '{type} {title} ({year}) watch on PrimeTime',
      },
      type: {
        FILM: 'movie',
        VIDEO: 'video',
        TV_SERIES: 'series',
        MINI_SERIES: 'mini-series',
        TV_SHOW: 'show',
      },
    },
    history: {
      title: 'Your browsing history',
    },
    trands: {
      title: 'In trend',
      filters: {
        all: 'best',
        film: 'movies',
        tv_series: 'series',
      },
    },
    trailer: {
      descripton: 'Descripton: ',
      duration: {
        minutes: 'min',
        hours: 'h',
      },
      info: {
        rating: 'rating',
        viewersCount: 'count reviews',
      },
      actions: {
        register: 'Login to view',
      },
    },
    player: {
      select: 'Выбрать плеер',
    },
    watch_info: {
      description: 'Описание:',
    },
  }
})

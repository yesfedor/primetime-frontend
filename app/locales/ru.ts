export default defineI18nLocale(() => {
  return {
    app: {
      theme: {
        label: 'Тема',
      },
      logo: {
        title: 'PrimeTime',
      },
      locales: {
        label: 'Язык',
        enUS: 'English',
        ruRU: 'Русский',
      },
      loading: 'Загрузка..',
      no_result: 'Ничего не нашли',
    },
    auth: {
      title: 'Авторизация',
      next: 'Далее',
      logout: 'Выйти',
      login: 'Войти',
      register: 'Регистрация',
      name: 'Имя',
      surname: 'Фамилия',
      male: 'Мужчина',
      female: 'Женщина',
      email: 'Почта',
      password: 'Пароль',
      menu: {
        signin: 'Войти',
        auth_for_watch: 'Авторизуйтесь для просмотра',
      },
      errors: {
        419: 'Пожалуйста, повторите запрос',
        1001: 'Укажите свое настоящее имя',
        1002: 'Укажите настоящую фамилию',
        1003: 'Введите свою реальную дату рождения, вам должно быть больше 13 лет',
        1004: 'Вам должно быть больше 13 лет',
        1006: 'Учетная запись с указанным адресом электронной почты не найдена',
        1007: 'У этой эл почты уже есть учетная запись',
        1008: 'Указанный адрес электронной почты недействителен',
        1009: 'Введите пароль, длина которого превышает 7 символов',
        1010: 'Неверный пароль',
      },
    },
    navigation: {
      admin: 'Админка',
      home: 'Главная',
      trand: 'В тренде',
      searchFilter: 'Навигатор',
      feed: 'Новые серии',
      subscription: 'Избранное',
      history: 'История',
    },
    staff: {
      hint: {
        sex: {
          FEMALE: 'Актриса',
          MALE: 'Актер',
        },
      },
    },
    search: {
      title: 'Поищите что-нибудь',
      mini: 'Найти',
      autocomplete: {
        empty: 'Поищите что-нибудь ещё',
        no_result: 'Ничего не нашли',
        loading: 'Загрузка..',
      },
    },
    subscriptions: {
      title: 'Избранное',
      manager: {
        action: {
          subscribe: 'Подписаться',
          unsubscribe: 'Вы подписаны',
        },
      },
    },
    home: {
      seo_title: 'PrimeTime - онлайн-кинотеатр',
      title: 'PrimeTime - онлайн-кинотеатр',
      subtitle: 'Приятного просмотра',
    },
    watch: {
      share: {
        title: '{type} {title} ({year}) смотрите на PrimeTime',
      },
      type: {
        FILM: 'фильм',
        VIDEO: 'видео',
        TV_SERIES: 'сериал',
        MINI_SERIES: 'мини-сериал',
        TV_SHOW: 'шоу',
      },
    },
    history: {
      title: 'Ваша история просмотров',
    },
    trands: {
      title: 'В тренде',
      filters: {
        all: 'лучшее',
        film: 'фильмы',
        tv_series: 'сериалы',
      },
    },
    trailer: {
      descripton: 'Описание: ',
      duration: {
        minutes: 'мин',
        hours: 'час',
      },
      info: {
        rating: 'рейтинг',
        viewersCount: 'Колличество отзывов',
      },
      actions: {
        register: 'Для просмотра авторизируйтесь',
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

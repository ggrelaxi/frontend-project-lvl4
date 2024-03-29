const ru = {
  common: {
    header: {
      logoText: 'Hexlet Chat',
      logoutButton: 'Выйти',
    },
    footer: {
      owner: 'Разработчик - Александр Смирнов',
      description: 'Финальный проект в профессии "Фронтенд разработчик"',
    },
    form: {
      newMessage: 'Новое сообщение',
    },
  },
  chat: {
    channels: 'Каналы',
    enterMessage: 'Введите сообщение',
    delete: 'Удалить',
    rename: 'Переименовать',
  },
  notFoundPage: {
    header: 'К сожалению, такой страницы не существует',
    goToMain: 'Вернуться на главную',
  },
  loginPage: {
    enter: 'Вход',
    userName: 'Ваш ник',
    userNamePlaceholder: 'Ваш ник',
    password: 'Пароль',
    passwordPlaceholder: 'Пароль',
    submitButton: 'Войти',
    noAccount: 'Нет аккаунта?',
    signup: 'Регистрация',
  },
  signupPage: {
    registration: 'Регистрация',
    userName: 'Имя пользователя',
    userNamePlaceholder: 'Введите ваш ник',
    password: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    passwordConfirm: 'Подтвердите пароль',
    passwordConfirmPlaceholder: 'Введите пароль еще раз',
    submitButton: 'Зарегистрироваться',
  },
  modals: {
    add: {
      header: 'Добавить канал',
      placeholder: 'Название канала',
      cancel: 'Отменить',
      submit: 'Отправить',
    },
    rename: {
      header: 'Переименовать канал?',
      placeholder: 'Название канала',
      cancel: 'Отменить',
      submit: 'Отправить',
    },
    remove: {
      header: 'Удалить канал?',
      description: 'Вы уверены?',
      cancel: 'Отменить',
      submit: 'Удалить',
    },
  },
  notifications: {
    newMessageError: 'Ошибка отправки сообщения',
    newChannel: 'Канал создан',
    newChannelError: 'Ошибка добавления канала',
    renameChannel: 'Канал переименован',
    renameChannelError: 'Ошибка переименовывания канала',
    removeChannel: 'Канал удалён',
    removeChannelError: 'Ошибка удаления канала',
    userAlreadySignup: 'Пользователь с таким ником уже зарегистрирован',
    authError: 'Неверные имя пользователя или пароль',
    commonError: 'Ошибка соединения',
    serverOffline: 'Проблема с доступностью сервера. Попробуйте позже',
  },
  validation: {
    required: 'Поле обязательно для заполнения',
    minLength: 'Не менее {{ minValue }} символов',
    maxLength: 'Не более {{ maxValue }} символов',
    channelNameLength: 'От 3 до 20 символов',
    oneOf: 'Пароли должны совпадать',
    notOneOf: 'Такой канал уже существует',
    passwordMin: 'Не менее 6 символов',
    min6: 'Не менее 6 символов',
    min3max20: 'От 3 до 20 символов',
  },
  messages: {
    counter_zero: '{{count}} сообщений',
    counter_one: '{{count}} сообщение',
    counter_two: '{{count}} сообщения',
    counter_few: '{{count}} сообщения',
    counter_many: '{{count}} сообщений',
    counter_other: '{{count}} сообщений',
  },
};

export default ru;

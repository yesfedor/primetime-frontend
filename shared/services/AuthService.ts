/**
 * @author Garanin Fedor, 2023
 * @yesfedor npm axios
 * @description Api для primetime.su
 */

// @ts-nocheck

import axios from 'axios'
import { consola } from 'consola'
import { reactive } from 'vue'

export enum IUserResponceGender {
  none = 'none',
  male = 'male',
  female = 'female',
}

export enum IUserResponceAccess {
  'author' = 'author',
  'developer-verfy' = 'developer-verfy',
  'developer-pool' = 'developer-pool',
  'co-author' = 'co-author',
  'administrator' = 'administrator',
  'tester-verfy' = 'tester-verfy',
  'tester-default' = 'tester-default',
  'moderator' = 'moderator',
  'user-verfy' = 'user-verfy',
  'user-default' = 'user-default',
  'none' = 'none',
}

export enum IUserResponceBlocking {
  none = 'none',
  temporarily = 'temporarily',
  forever = 'forever',
  deleted = 'deleted',
}

export function createAuthService() {
  const API_PATH_METHOD = 'https://primetime.su/api/method/'

  const clientIdCookie = useCookie<string | null>('device_id', {
    default() {
      return null
    },
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: import.meta.NUXT_COOKIE_DOMAIN,
  })
  const jwtCookie = useCookie<string | null>('atoken', {
    default() {
      return null
    },
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: import.meta.NUXT_COOKIE_DOMAIN,
  })
  const fastLoginCookie = useCookie<string | null>('fastLogin', {
    default() {
      return '[]'
    },
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: import.meta.NUXT_COOKIE_DOMAIN,
  })

  const isLogger = true

  type loggerType = 'warn' | 'log' | 'error' | 'info'

  function logger(type: loggerType = 'log', ...args: unknown[]) {
    const msg = '[useInyApi]: '
    if (!isLogger) {
      return
    }
    // eslint-disable-next-line no-console
    console[type](msg, ...args)
  }

  function useInyDeviceObject() {
    return {
      'android': 'fab fa-android',
      'iphone': 'fab fa-apple',
      'ipad': 'fab fa-apple',
      'symbian': 'fas fa-mobile',
      'windows phone': 'fas fa-mobile',
      'tablet os': 'fas fa-mobile',
      'linux': 'fab fa-linux',
      'windows': 'fab fa-microsoft',
      'macintosh': 'fab fa-apple',
      'undefined': 'fas fa-globe',
    }
  }

  function useInyDeviceTest() {
    return [
      { device: 'Android', platform: /Android/ },
      { device: 'iPhone', platform: /iPhone/ },
      { device: 'iPad', platform: /iPad/ },
      { device: 'Symbian', platform: /Symbian/ },
      { device: 'Windows Phone', platform: /Windows Phone/ },
      { device: 'Tablet OS', platform: /Tablet OS/ },
      { device: 'Linux', platform: /Linux/ },
      { device: 'Windows', platform: /Windows NT/ },
      { device: 'Macintosh', platform: /Macintosh/ },
    ]
  }

  const deviceObject = useInyDeviceObject()
  const deviceTest = useInyDeviceTest()

  function useInyDevice() {
    if (import.meta.server) {
      return deviceObject.undefined
    }

    const platform = navigator.userAgent
    for (const index in deviceTest) {
      if (deviceTest[index]?.platform.test(platform)) {
        return deviceTest[index]?.device
      }
    }

    return platform
  }

  interface IApiUserFastLogin {
    uid: number
    name: string
    surname: string
    email: string
    gender: IUserResponceGender
  }

  interface IUserResponceData {
    uid: number
    domain: string
    telegram: number
    uid_crypt: string
    password: string
    name: string
    surname: string
    gender: IUserResponceGender
    birthday: string
    avatar: string
    email: string
    access: IUserResponceAccess
    blocking: IUserResponceBlocking
  }

  interface IApiUser {
    isAuth: boolean
    data: IUserResponceData
  }

  interface IAuthError {
    error?: string
  }

  interface IUserAuthorizeResponse {
    status: number
    data: IUserResponceData | IAuthError
    title?: string
    detail?: string
    link?: string
  }

  interface IApiAuth {
    system: {
      guardInterval: NodeJS.Timeout | number
    }

    config: IApiAuthConfig

    user: IApiUser

    setConfig: (config: IApiAuthConfigSetter) => void

    install: (config: IApiAuthConfigSetter) => IApiAuth

    created: () => Promise<string>
    mounted: () => void
    unmounted: () => void

    // app
    getAppById: (id: number) => Promise<number>

    // device
    getDeviceIcon: (device: string) => string
    sessionsShow: () => Promise<unknown>
    sessionDelete: (specifiedClientId: string) => Promise<unknown>

    // client
    setClientId: (fnStart: (appId: number, platform: string) => void, fnEnd: (appId: number, platform: string, clientId: string) => void) => Promise<void>

    getClientId: () => Promise<string>

    login: (username: number | string, password: string) => Promise<IUserAuthorizeResponse>

    register: (name: string, surname: string, email: string, gender: IUserResponceGender, password: string) => Promise<IUserAuthorizeResponse>

    logout: () => void

    refreshJwt: () => Promise<boolean>

    getJwt: () => string

    restoreSession: () => void

    parseJwt: (jwt: string) => IUserResponceData | false

    setUserObject: (type: 'login' | 'register' | 'logout', payload: IUserResponceData) => void

    getFastLogin: () => IApiUserFastLogin[]

    addFastLogin: () => boolean

    deleteFastLogin: (uid: number) => IApiUserFastLogin[]

    getUserPublicInfo: (uid: number, domain: string) => Promise<unknown>

    getUserPrivateInfo: (uid: number, domain: string) => Promise<unknown>

    userEditSave: (obj: {
      name: string
      surname: string
      birthday: string
      gender: string | IUserResponceGender
    }) => Promise<unknown>

    isOnline: (dateVisit: number | string) => boolean

    getTelegramCryptId: () => Promise<IUserResponceData | false>
  }

  interface IApiAuthConfig {
    appId: number
    guardIntervalOffset: number
    flags: {
      isAuthorizeWithUrl: boolean
      isGuardInterval: boolean
    }
    localStorageName: {
      clientId: string
      jwt: string
      fastLogin: string
    }
    routerPush: (routeName: EApiRouterPushName, routeReason: IApiStoreOutPayload) => void
    storeCommit: (what: EApiStoreCommitWhat, payload: IApiStoreOutPayload) => void
  }

  interface IApiAuthConfigSetter {
    appId: number
    guardIntervalOffset?: number
    flags?: {
      isAuthorizeWithUrl?: boolean
      isGuardInterval?: boolean
    }
    localStorageName?: {
      clientId?: string
      jwt?: string
      fastLogin?: string
    }
    routerPush?: (routeName: EApiRouterPushName, routeReason: IApiStoreOutPayload) => void
    storeCommit?: (what: EApiStoreCommitWhat, payload: IApiStoreOutPayload) => void
  }

  enum EApiRouterPushName {
    current = 'current',
    main = 'main',
    error = 'error',
  }

  enum EApiStoreCommitWhat {
    login = 'login',
    register = 'register',
    logout = 'logout',
    error = 'error',
  }

  interface IApiStoreOutPayload {
    code: number
    message?: string
    data?: unknown
  }

  function getUserNone(): IUserResponceData {
    return {
      uid: 0,
      domain: '',
      telegram: 0,
      uid_crypt: '',
      password: '',
      name: '',
      surname: '',
      gender: IUserResponceGender.none,
      birthday: '',
      avatar: '',
      email: '',
      access: IUserResponceAccess.none,
      blocking: IUserResponceBlocking.none,
    }
  }

  const Api = reactive<IApiAuth>({
    // system
    system: {
      guardInterval: 0,
    },

    // config
    config: reactive({
      // base
      appId: 0,
      guardIntervalOffset: 5 * 60 * 1000,

      // flags
      flags: {
        isAuthorizeWithUrl: true,
        isGuardInterval: true,
      },

      // localStorage
      localStorageName: {
        clientId: 'client_id',
        jwt: 'jwt',
        fastLogin: 'fastLogin',
      },

      // router api
      routerPush: (routeName, routeReason) => {
        logger('log', 'routerPush key in config')
        logger('log', 'you have not installed callback for getters')
        logger('log', 'name: ', routeName, 'routeReason: ', routeReason)
      },
      storeCommit: (what, payload) => {
        logger('log', 'routerPush key in config')
        logger('log', 'you have not installed callback for getters')
        logger('log', 'what: ', what, 'payload: ', payload)
      },
    }),

    // user
    user: reactive({
      isAuth: false,
      data: reactive(getUserNone()),
    }),

    setConfig(config) {
      if (!config?.appId) {
        logger('error', 'specify the app id')
        return false
      }
      this.config.appId = config.appId

      if (config?.guardIntervalOffset) {
        this.config.guardIntervalOffset = config.guardIntervalOffset
      }
      if (config?.flags?.isAuthorizeWithUrl) {
        this.config.flags.isAuthorizeWithUrl = config.flags.isAuthorizeWithUrl
      }
      if (config?.flags?.isGuardInterval) {
        this.config.flags.isGuardInterval = config.flags.isGuardInterval
      }
      if (config?.routerPush && typeof config.routerPush === 'function') {
        this.config.routerPush = config.routerPush
      }
      if (config?.storeCommit && typeof config.storeCommit === 'function') {
        this.config.storeCommit = config.storeCommit
      }
    },

    install(config) {
      this.setConfig(config)
    },

    /* life cycle */
    async created() {
      const clientId = clientIdCookie.value
      if (!clientId) {
        await this.setClientId(() => {
        }, () => {
        })
      }
      this.restoreSession()
      await this.refreshJwt()
      return clientIdCookie.value
    },
    mounted() {
      this.restoreSession()

      if (this.config.flags.isGuardInterval) {
        this.system.guardInterval = setInterval(() => {
          this.refreshJwt()
        }, this.config.guardIntervalOffset)
      }
      if (this.config.flags.isAuthorizeWithUrl) {
        const authParamName = 'auth'
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.get(authParamName)) {
          const jwt = searchParams.get(authParamName)
          if (!jwt) {
            return
          }
          jwtCookie.value = jwt
          this.restoreSession()
          this.config.routerPush(EApiRouterPushName.current, { code: 0, message: 'Fix query auth' })
        }
      }
    },
    unmounted() {
      if (this.system.guardInterval) {
        clearInterval(this.system.guardInterval)
      }
    },

    // app
    async getAppById(id) {
      return id
    },

    // device
    getDeviceIcon(device) {
      const deviceKeys = Object.keys(deviceObject)
      const deviceKey = device.toLowerCase()
      if (deviceKeys.includes(deviceKey)) {
        return deviceObject[deviceKey as keyof typeof deviceObject]
      }
      return deviceObject.undefined
    },

    async sessionsShow() {
      const jwt = jwtCookie.value
      const clientId = clientIdCookie.value
      const res = await axios.get(`${API_PATH_METHOD}user.sessionsShow?v=1.0&jwt=${jwt}&client_id=${clientId}`)
      return res.data
    },
    async sessionDelete(specifiedClientId) {
      const jwt = jwtCookie.value
      const clientId = clientIdCookie.value
      const res = await axios.get(`${API_PATH_METHOD}user.sessionsLogout?v=1.0&jwt=${jwt}&client_id=${clientId}${(specifiedClientId ? `&specified_client_id=${specifiedClientId}` : '')}`)
      return res.data
    },

    // client
    async setClientId(fnStart = (appId, platform) => {
      logger('log', appId, platform)
    }, fnEnd = (appId, platform, clientId) => {
      logger('log', appId, platform, clientId)
    }) {
      const appId = this.config.appId
      const platform = useInyDevice()
      fnStart(appId, platform || '')
      const response = await axios.get(`${API_PATH_METHOD}device.getClientId?v=1.0&app_id=${appId}&platform=${platform}`)
      useInyMiddleware(response)
      if (response?.data?.clientId) {
        const clientId = response.data.clientId
        clientIdCookie.value = clientId
        fnEnd(appId, platform || '', clientId)
      }
    },

    async getClientId() {
      let userClientId = clientIdCookie.value || ''
      if (!userClientId) {
        await this.setClientId(() => {
        }, (appId, platform, clientId) => {
          userClientId = clientId
        })
      }
      return userClientId
    },

    async login(username, password) {
      const clientId = clientIdCookie.value
      const response = await axios.get(`${API_PATH_METHOD}user.login?v=1.0&email=${username}&password=${password}&client_id=${clientId}`)
      useInyMiddleware(response)
      const userData = this.parseJwt(response.data.jwt)
      if (userData) {
        jwtCookie.value = response.data.jwt
        this.config.storeCommit(EApiStoreCommitWhat.login, {
          code: 1,
          message: 'logged',
          data: userData,
        })

        this.setUserObject('login', userData)

        return { status: 1, data: userData }
      }

      this.config.storeCommit(EApiStoreCommitWhat.error, response.data)

      return { ...response.data }
    },
    async register(name, surname, email, gender, password) {
      const clientId = clientIdCookie.value
      const response = await axios.get(`${API_PATH_METHOD}user.register?v=1.0&client_id=${clientId}&name=${name}&surname=${surname}&email=${email}&gender=${gender}&password=${password}`)
      useInyMiddleware(response)
      const userData = this.parseJwt(response.data.jwt)
      if (userData) {
        jwtCookie.value = response.data.jwt
        this.config.storeCommit(EApiStoreCommitWhat.register, {
          code: 1,
          message: 'logged',
          data: userData,
        })

        this.setUserObject('login', userData)

        return { status: 1, data: userData }
      }

      this.config.storeCommit(EApiStoreCommitWhat.register, response.data)

      return { ...response.data }
    },
    async logout() {
      jwtCookie.value = 'logout'
      this.user.isAuth = false
      this.user.data = getUserNone()
      this.config.storeCommit(EApiStoreCommitWhat.login, { code: 0, message: 'logout' })
      this.config.routerPush(EApiRouterPushName.main, { code: 0, message: 'because the user logged out' })
    },
    async refreshJwt() {
      const isAuth = this.user.isAuth
      const jwt = jwtCookie.value
      const clientId = clientIdCookie.value
      if (!isAuth) {
        return true
      }
      if (import.meta.server && !navigator?.onLine) {
        return true
      }

      const response = await axios.get(`${API_PATH_METHOD}user.refreshJwt?v=1.0&jwt=${jwt}&client_id=${clientId}`)
        .catch(() => {
          this.logout()
        })

      if (!response) {
        return false
      }
      const user = useInyMiddleware(response)
      if (user && user?.jwt) {
        if (user?.jwt !== jwt) {
          if (user?.jwt === 'logout') {
            this.logout()
          }
          else {
            this.config.storeCommit(EApiStoreCommitWhat.login, {
              code: 1,
              message: 'logged',
              data: this.parseJwt(user.jwt),
            })
            return true
          }
        }
        if (user.permission === 'deny') {
          this.logout()
        }
      }
      return false
    },
    getJwt() {
      return jwtCookie.value || ''
    },
    restoreSession() {
      const jwt = jwtCookie.value
      if (jwt) {
        const userData = this.parseJwt(jwt)
        if (!userData) {
          this.logout()
          return
        }
        this.setUserObject('login', userData)
      }
    },
    parseJwt(jwt) {
      if (typeof jwt !== 'string') {
        return false
      }
      const [headerB64, dataB64, salt] = jwt.split('.')
      if (!headerB64 || !dataB64 || !salt) {
        return false
      }
      const json = atob(dataB64)
      const data = JSON.parse(json) as IUserResponceData
      if (!data?.uid) {
        return false
      }
      return data
    },
    setUserObject(type, payload) {
      if (typeof payload !== 'object') {
        return
      }
      if ((type === 'login' || type === 'register') && payload.uid) {
        this.user.isAuth = true
        this.user.data = payload
      }
      if (type === 'logout' || !payload.uid) {
        this.user.isAuth = false
        this.user.data = getUserNone()
      }
    },

    getFastLogin() {
      const json = fastLoginCookie.value || '[]'
      const fastLogin = JSON.parse(json)
      if (!fastLogin) {
        return []
      }
      return fastLogin
    },
    addFastLogin() {
      if (!this.user.isAuth) {
        return false
      }
      const user = this.user.data
      const currentData = {
        uid: user.uid,
        name: user.name,
        surname: user.surname,
        email: user.email,
        gender: user.gender,
      }
      const fastLogin = this.getFastLogin()
      if (!fastLogin.find(item => item.uid === user.uid)) {
        fastLogin.push(currentData)
        const fastLoginJson = JSON.stringify(fastLogin)
        fastLoginCookie.value = fastLoginJson
      }
      return false
    },
    deleteFastLogin(uid) {
      const fastLogin = this.getFastLogin()
      fastLogin.forEach((user, idx) => {
        if (user.uid === uid) {
          fastLogin.splice(idx, 1)
          const fastLoginJson = JSON.stringify(fastLogin)
          fastLoginCookie.value = fastLoginJson
        }
      })
      return fastLogin
    },

    // user methods
    async getUserPublicInfo(uid = 0, domain = '') {
      let res
      if (uid) {
        res = await axios.get(`${API_PATH_METHOD}user.getPublicInfo?v=1.0&uid=${uid}`)
      }
      if (domain) {
        res = await axios.get(`${API_PATH_METHOD}user.getPublicInfo?v=1.0&domain=${domain}`)
      }
      if (res?.data) {
        return res.data
      }
      return res
    },
    async getUserPrivateInfo(uid = 0, domain = '') {
      const jwt = jwtCookie.value
      let res
      if (uid) {
        res = await axios.get(`${API_PATH_METHOD}user.getPrivateInfo?v=1.0&uid=${uid}&jwt=${jwt}`)
      }
      if (domain) {
        res = await axios.get(`${API_PATH_METHOD}user.getPrivateInfo?v=1.0&domain=${domain}&jwt=${jwt}`)
      }
      if (res?.data) {
        return res.data
      }
      return res
    },
    async userEditSave(obj = {
      name: '',
      surname: '',
      birthday: '',
      gender: '',
    }) {
      const jwt = jwtCookie.value
      const res = await axios.get(`${API_PATH_METHOD}user.editSave?v=1.0&jwt=${jwt}${(obj?.name ? `&name=${obj.name}` : '')}${(obj?.surname ? `&surname=${obj.surname}` : '')}${(obj?.birthday ? `&birthday=${obj.birthday}` : '')}${(obj?.gender ? `&gender=${obj.gender}` : '')}`)
      if (res?.data) {
        return res.data
      }
      return res
    },
    isOnline(dateVisit) {
      const gap = 300000
      const currentTime = Date.now()
      const visitTime = +dateVisit * 1000
      return visitTime + gap > currentTime
    },
    async getTelegramCryptId() {
      const jwt = jwtCookie.value
      const res = await axios.get(`${API_PATH_METHOD}telegram.getCrypt?v=1.0&jwt=${jwt}`)
      if (!res?.data?.jwt) {
        logger('warn', 'response error', res)
        return false
      }
      const userData = this.parseJwt(res.data.jwt)
      if (!userData) {
        return false
      }
      return userData
    },
  })

  interface IAuthAnswerDefault {
    data?: {
      jwt?: string
      status?: number
      permission?: string
    }
  }

  function useInyMiddleware(response: IAuthAnswerDefault) {
    let tryToReset = false
    const reseter = async () => {
      if (navigator.onLine) {
        logger('error', 'Fatal error / Reloading page')
        await Api.setClientId(() => {
        }, () => {
          tryToReset = true
        })
      }
    }

    try {
      if (response?.data?.status === 419) {
        reseter()
      }
    }
    catch (e) {
      reseter()
      consola.warn(e)
    }

    if (tryToReset && import.meta.client) {
      window.location.reload()
    }

    return response.data
  }

  return {
    Api,
    deviceObject,
    deviceTest,
    EApiRouterPushName,
    EApiStoreCommitWhat,
    IUserResponceGender,
    IUserResponceAccess,
    IUserResponceBlocking,
  }
}

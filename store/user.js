import Caches from '@/utils/caches'

const $Caches = new Caches()

export const state = () => ({
  user: $Caches.get('user', {})
})

export const mutations = {
  updateUser(state, user) {
    state.user = user
    // eslint-disable-next-line no-undef
    $nuxt.$storage.set('user', user)
  }
}

export const getters = {
  token: (state) => state.user.token
}

import Caches from '@/utils/caches'

const $Caches = new Caches()

export default {
  active: 0,
  menus: $Caches.get('menu', [])
}

/**
 * 封装个Storage， Cookie的
 */

import Caches from '@/utils/caches'

export default function({ app }, inject) {
  inject('storage', new Caches())
  inject('session', new Caches('sessionStorage'))
  inject('cookie', new Caches('Cookie'))
}

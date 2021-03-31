import Utils from '~/utils'
export default function({ app, axios }, inject) {
  inject('utils', Utils)
}

import moment from 'moment'

export default function({ store }, inject) {
  moment.locale(store.state.i18n.locale)
  inject('moment', moment)
}

import Vue from 'vue'
export default function({ app }, inject) {
  inject('bus', new Vue())
}

import axios from 'axios'
// 获取远端图片
export default function({ app, store, route, redirect, req }, inject) {
  /**
   *
   * @param {*} url
   * 链接数组
   */
  const getImage = (url, cors) => {
    return new Promise((resolve, reject) => {
      const urlArray = []
      url.forEach(async (item, index) => {
        const imgUrl = await ajax(item)
        urlArray.push(imgUrl)
        if (urlArray.length === url.length) {
          resolve(urlArray)
        }
      })
    })
  }

  // 请求图片
  const ajax = (item) => {
    const seal = item.replace(/.+\.com(.+)/, `${location.origin}/cors$1`)
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: seal,
        responseType: 'arraybuffer'
      }).then((response) => {
        resolve(
          'data:image/png;base64,' +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
        )
      })
    })
  }

  inject('getCorsImage', getImage)
}

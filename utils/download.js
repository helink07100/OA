import axios from 'axios'
export default (link, name, download) => {
  const oA = document.createElement('a')

  if (download) {
    axios
      .get(link, {
        responseType: 'blob'
      })
      .then((response) => {
        if (response.status === 200) {
          const blob = response.data
          oA.download =
            name || `${new Date().getFullYear()}-${new Date().getMonth()}`
          oA.href = window.URL.createObjectURL(blob)
          oA.click()
          oA.remove()
        }
      })
  } else {
    oA.href = link
    oA.target = '_blank'
    oA.click()
    oA.remove()
  }
}

<template>
  <div id="download-wrapper" class="download-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  props: {
    proxy: {
      default: '',
      type: String
    },
    type: {
      default: 'IMAGE',
      type: String
    }
  },
  data() {
    return {
      JsPDF: ''
    }
  },
  mounted() {
    this.html2canvas = html2canvas
    this.JsPDF = JsPDF
  },
  methods: {
    // 通过canvas 生成需要的类型
    toCanvas() {
      const ele = document.getElementById('download-wrapper')
      const pos = ele.getBoundingClientRect()
      const width = pos.width
      let height = pos.height

      this.html2canvas(ele, { allowTaint: true, useCORS: true }).then((cc) => {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        canvas.setAttribute('crossorigin', 'anonymous')
        const ctx = canvas.getContext('2d')
        ctx.drawImage(cc, 0, 0, width, height, 0, 0, width, height)
        const pageData = canvas.toDataURL('image/png')
        const title = `${new Date().getFullYear()}-${new Date().getMonth()}`

        // 生成图片
        if (this.type === 'IMAGE') {
          this.$utils.download(pageData)

          // 生成PDF
        } else if (this.type === 'PDF') {
          let position = 0
          const imgWidth = 595.28
          const imgHeight = (592.28 / width) * height
          const pageHeight = (width / 592.28) * 841.89
          const pdf = new this.JsPDF('', 'pt', 'a4')
          if (height < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (height > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              height -= pageHeight
              position -= 841.89
              if (height > 0) {
                pdf.addPage()
              }
            }
          }
          pdf.save(title + '.pdf')
        }
      })
    }
  }
}
</script>
<style></style>

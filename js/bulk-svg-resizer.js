function blobToDataURL(blob, callback) {
  var a = new FileReader()
  a.onload = function (e) {
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}
zipFileType = 'svg'
renderFileTypes = ['svg']
const batchConversion = async (file, indexValue) => {
  return new Promise((resolve, reject) => {
    if (file) {
      console.log(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        if (e.target.result) {
          var svg = atob(
            reader.result.replace(/data:image\/svg\+xml;base64,/, '')
          )
          let newSvg = document.createElement('svg')

          const parser = new DOMParser()
          const doc = parser.parseFromString(svg, 'text/html')
          let temp = doc.getElementsByTagName('svg')[0]
          svgHeight = Number(document.querySelector('#image-height').value)
          svgWidth = Number(document.querySelector('#image-width').value)
          temp.setAttribute('height', `${svgHeight}`)
          temp.setAttribute('width', `${svgWidth}`)
          const svgTodownload = temp
          console.log(svgTodownload)
          document.body.appendChild(svgTodownload)
          if (svgTodownload) {
            let clonedSvgElement = svgTodownload.cloneNode(true)
            let outerHTML = clonedSvgElement.outerHTML,
              blob = new Blob([outerHTML], {
                type: 'image/svg+xml;charset=utf-8',
              })
            blobToDataURL(blob, function (dataurl) {
              resolve([indexValue, dataurl, 'image'])
            })
          }

          newSvg.append(temp)
        }
      }
    }
  })
}

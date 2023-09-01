const batchConversion = async (file, indexValue) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        if (e.target.result) {
          let image = new Image()
          let canvas = document.createElement('canvas')
          canvas.setAttribute('id', 'canvas-img')
          let ctx = canvas.getContext('2d')
          image.onload = () => {
            canvas.width = Number(document.querySelector('#image-height').value)
            canvas.height = Number(document.querySelector('#image-width').value)
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            resolve([indexValue, canvas.toDataURL('image/png'), 'image'])
          }
          image.src = e.target.result
        }
      }
    }
  })
}

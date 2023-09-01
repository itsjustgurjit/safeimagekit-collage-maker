;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.eightBit = factory()
  }
})(this, function () {
  /**
   * Draws a pixelated version of an image in a given canvas
   * @param {object} canvas - a canvas object
   * @param {object} image - an image HTMLElement object
   * @param {number} scale - the scale factor: between 0 and 100
   */
  var eightBit = function (canvas, image, scale) {
    scale *= 0.01

    canvas.width = image.width
    canvas.height = image.height

    var scaledW = canvas.width * scale
    var scaledH = canvas.height * scale

    var ctx = canvas.getContext('2d')

    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false

    ctx.drawImage(image, 0, 0, scaledW, scaledH)
    let newCanva = document.createElement('canvas')
    newCanva.width = image.width
    newCanva.height = image.height
    let context = newCanva.getContext('2d')

    context.mozImageSmoothingEnabled = false
    context.webkitImageSmoothingEnabled = false
    context.imageSmoothingEnabled = false
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
      canvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      image.width,
      image.height
    )
    document.body.appendChild(newCanva)
    return newCanva.toDataURL('image/jpeg')
  }

  return eightBit
})
const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const downloadButton = document.querySelector('#download-button')
let root = document.querySelector(':root')
root.style.setProperty('--maincolor', fileDropBox.dataset.color)
const workspace = document.querySelector('.workspace')
const canvasPanel = document.getElementById('canvas-box-panel')

let inputFile = ''
let imgCanvas = null
let downloadImg = null

const showLoader = () => {
  showLoading()
}
const closeLoader = () => {}
const mimeTypes = 'image/png,image/jpg,image/jpeg,image/webp'
const filemimes = ['.png', '.webp', '.jpg', '.jpeg']
gdrive.addEventListener(
  'click',
  (getFile, mimeTypes, showLoader, closeLoader) => {
    const data = loadPicker()
  }
)
const getDropBoxFile = (file) => {
  handleFile(file)
}
const getFile = (file) => {
  handleFile(file)
}
const fileOnChange = () => {
  handleFile(file.files[0])
}
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
  'click',
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox()
  }
)
inputBox.onclick = function () {
  document.querySelector('#file').click()
}
fileDropBox.addEventListener('dragover', (e) => {
  e.preventDefault()
})
fileDropBox.addEventListener('drop', (e) => {
  e.preventDefault()
  handleFile(e.dataTransfer.files[0])
})
const showLoading = () => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
}
const stopLoading = () => {
  fileDropBox.style.display = 'none'
}
const handleFile = (file) => {
  document.querySelector('#image-format').value = file.type.split('/')[1]
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  var file = inputFile
  if (file) {
    console.log(file)
    var reader = new FileReader()
    reader.onload = function (e) {
      var img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        let canvas = document.createElement('canvas')
        imgCanvas = eightBit(canvas, img, 8)
        let image = new Image()
        image.src = imgCanvas
        image.onload = () => {
          canvasPanel.appendChild(image)
          stopLoading()
          workspace.style.display = 'block'
          console.log(inputFile.type.split('/')[1])
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
const handleDownload = () => {
  let url = imgCanvas
  let a = document.createElement('a')
  a.href = url
  console.log(inputFile.type.split('/'))
  a.download = `safeimagekit-8-bit-art.${inputFile.type.split('/')[1]}`
  document.body.appendChild(a)
  a.click()
  if (lang === 'en') {
    window.location.href = `/download?tool=${pageTool}`
  } else {
    window.location.href = `/${lang}/download?tool=${pageTool}`
  }
}

downloadButton.addEventListener('click', handleDownload)

const showDropDown = document.querySelector('.file-pick-dropdown')
const icon = document.querySelector('.arrow-sign')
const dropDown = document.querySelector('.file-picker-dropdown')
showDropDown.addEventListener('click', () => {
  addScripts()
  if (dropDown.style.display !== 'none') {
    dropDown.style.display = 'none'
    icon.classList.remove('fa-angle-up')
    icon.classList.add('fa-angle-down')
  } else {
    dropDown.style.display = 'block'
    icon.classList.remove('fa-angle-down')
    icon.classList.add('fa-angle-up')
  }
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const downloadButton = document.querySelector('#download-button')
const dimensions = document.querySelector('#dimensions')
const canvasBoxPanel = document.getElementById('canvas-box-panel')
let type = 'stretch'
let image = null
let imageOriginalHeight = null
let imageOriginalWidth = null
let fixedImageHeight = null
let fixedImageWidth = null
let lockedAspectRadio = true
let imageHeightDiffValue = 0
let imageWidthDiffValue = 0
let fileType = ''
let color = document.querySelector('#color')
let fixedTab = document.querySelector('#fixed-tab')
let autoAdjustTab = document.querySelector('#auto-adjust-tab')
let strechyTab = document.querySelector('#strechy-tab')
const imageHeightInputBox = document.querySelector('#img_height')
const imageWidthInputBox = document.querySelector('#img_width')
let stretchRangeInput = document.querySelector('#strech-range')
let aspectRadioElement = document.querySelector('#aspect-radio')
const renderResizedImage = (height, width) => {
  let canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  let ctx = canvas.getContext('2d')
  canvas.height = height
  canvas.width = width
  ctx.drawImage(image, 0, 0, width, height)
  canvasBoxPanel.innerHTML = ''
  canvasBoxPanel.appendChild(canvas)
  stopLoading()
  document.querySelector('.workspace').style.display = 'block'
}
const drawLikeCropImage = (height, width) => {
  let canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  let ctx = canvas.getContext('2d')
  canvas.height = height
  canvas.width = width
  let resizeAspect = width / height
  if (aspectRatio === resizeAspect) {
    ctx.drawImage(image, 0, 0, width, height)
  } else {
    if (width < image.width || height < image.height) {
      let startPointX = width - image.width
      let startPointY = height - image.height
      ctx.drawImage(
        image,
        -startPointX / 2,
        -startPointY / 2,
        image.width,
        image.height,
        0,
        0,
        image.width,
        image.height
      )
    } else {
      let startPointX = width - image.width
      let startPointY = height - image.height
      if (startPointX > startPointY) {
        image.width = width
        image.height = width / aspectRatio
      } else {
        image.height = height
        image.width = height * aspectRatio
      }
      let tempCanvas = document.createElement('canvas')
      tempCanvas.setAttribute('id', 'canvas')
      tempCanvas.width = image.width
      tempCanvas.height = image.height
      let context = tempCanvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      let newImage = new Image()
      newImage.src = tempCanvas.toDataURL('image/png')
      newImage.onload = () => {
        startPointX = width - newImage.width
        startPointY = height - newImage.height
        ctx.drawImage(
          newImage,
          -startPointX / 2,
          -startPointY / 2,
          newImage.width,
          newImage.height,
          0,
          0,
          newImage.width,
          newImage.height
        )
      }
    }
  }
  canvasBoxPanel.innerHTML = ''
  canvasBoxPanel.appendChild(canvas)
  image.width = imageOriginalWidth
  image.height = imageOriginalHeight
  stopLoading()
  document.querySelector('.workspace').style.display = 'block'
}
const drawFixedImage = (heightDiff, WidthDiff, imageHeight, imageWidth) => {
  image.height = imageHeight
  image.width = imageWidth
  imageHeightDiffValue = heightDiff
  imageWidthDiffValue = WidthDiff
  let canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  canvas.width = Number(imageWidthInputBox.value)
  canvas.height = Number(imageHeightInputBox.value)
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = color.value
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, WidthDiff / 2, heightDiff / 2, imageWidth, imageHeight)
  canvasBoxPanel.innerHTML = ''
  canvasBoxPanel.appendChild(canvas)
  url = canvas.toDataURL()
}
const handleFile = (file) => {
  Coloris({
    el: '.coloris',
    swatches: [
      '#264653',
      '#2a9d8f',
      '#e9c46a',
      '#f4a261',
      '#e76f51',
      '#d62828',
      '#023e8a',
      '#0077b6',
      '#0096c7',
      '#00b4d8',
      '#48cae4',
    ],
  })

  Coloris({
    el: '.coloris',
    swatches: [
      '#264653',
      '#2a9d8f',
      '#e9c46a',
      '#f4a261',
      '#e76f51',
      '#d62828',
      '#023e8a',
      '#0077b6',
      '#0096c7',
      '#00b4d8',
      '#48cae4',
    ],
  })

  Coloris.setInstance('.instance1', {
    theme: 'pill',
    themeMode: 'dark',
    formatToggle: true,
    swatches: [
      '#067bc2',
      '#84bcda',
      '#80e377',
      '#ecc30b',
      '#f37748',
      '#d56062',
    ],
  })

  fileType = file.type.split('/')[1]
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target.result) {
        image = new Image()
        image.onload = () => {
          imageOriginalHeight = image.height
          imageOriginalWidth = image.width
          imageHeightInputBox.value = imageOriginalHeight
          imageWidthInputBox.value = imageOriginalWidth
          fixedImageHeight = imageOriginalHeight
          fixedImageWidth = imageOriginalWidth
          aspectRatio = imageOriginalWidth / imageOriginalHeight
          renderResizedImage(image.height, image.width)
        }
        image.src = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
  stopLoading()
  document.querySelector('.workspace').style.display = 'block'
}
const showLoading = () => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
}
const stopLoading = () => {
  fileDropBox.style.display = 'none'
}
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
let inputFile = ''
const checkFixed = () => {
  let imageHeightInputBoxValue = Number(imageHeightInputBox.value)
  let imageWidthInputBoxValue = Number(imageWidthInputBox.value)
  let resizeAspect = imageWidthInputBoxValue / imageHeightInputBoxValue
  if (resizeAspect === aspectRatio) {
    renderResizedImage(imageHeightInputBoxValue, imageWidthInputBoxValue)
  } else {
    let checkHeightDiff = imageHeightInputBoxValue - imageOriginalHeight
    let checkWidthDiff = imageWidthInputBoxValue - imageOriginalWidth
    if (checkWidthDiff > checkHeightDiff) {
      drawFixedImage(
        0,
        imageWidthInputBoxValue - imageHeightInputBoxValue * aspectRatio,
        imageHeightInputBoxValue,
        imageHeightInputBoxValue * aspectRatio
      )
    } else {
      drawFixedImage(
        imageHeightInputBoxValue - imageWidthInputBoxValue / aspectRatio,
        0,
        imageWidthInputBoxValue / aspectRatio,
        imageWidthInputBoxValue
      )
    }
  }
}
color.addEventListener('input', () => {
  checkFixed()
})
dimensions.addEventListener('change', (e) => {
  let dimensionsValue = e.target.value.split('x')
  imageHeightInputBox.value = Number(dimensionsValue[0])
  imageWidthInputBox.value = Number(dimensionsValue[1])
  checkType()
})
stretchRangeInput.addEventListener('change', (e) => {
  perc.innerHTML = `${e.target.value}%`
  let imageHeight = Math.round(
    (imageOriginalHeight * Number(e.target.value)) / 100
  )
  let imageWidth = Math.round(
    (imageOriginalWidth * Number(e.target.value)) / 100
  )
  imageWidthInputBox.value = imageWidth
  imageHeightInputBox.value = imageHeight
  renderResizedImage(imageHeight, imageWidth)
})
autoAdjustTab.addEventListener('click', () => {
  type = 'auto-adjust'
  checkType()
})
fixedTab.addEventListener('click', () => {
  type = 'fixed'
  aspectRadioElement.dataset.originalTitle = 'Lock aspect'
  lockedAspectRadio = false
  aspectRadioElement.className = 'fas fa-unlock'
  checkType()
})
strechyTab.addEventListener('click', () => {
  type = 'stretch'
  checkType()
})
let changeConfig = document.getElementsByClassName('change-config')
const checkType = () => {
  if (type === 'stretch') {
    renderResizedImage(imageHeightInputBox.value, imageWidthInputBox.value)
  } else if (type === 'fixed') {
    checkFixed()
  } else {
    drawLikeCropImage(imageHeightInputBox.value, imageWidthInputBox.value)
  }
}

Array.from(changeConfig).map((i) => {
  i.addEventListener('change', (e) => {
    if (e.target.value < 0) {
      e.target.id = 'img_height' ? (e.target.value = 1) : (e.target.value = 1)
    }
    if (type === 'stretch') {
      if (lockedAspectRadio) {
        if (e.target.id === 'img_height') {
          imageWidthInputBox.value = Math.round(
            imageHeightInputBox.value * aspectRatio
          )
        } else {
          imageHeightInputBox.value = Math.round(
            imageWidthInputBox.value / aspectRatio
          )
        }
      }
      renderResizedImage(imageHeightInputBox.value, imageWidthInputBox.value)
    } else if (type === 'fixed') {
      if (lockedAspectRadio) {
        if (e.target.id === 'img_height') {
          imageWidthInputBox.value = Math.round(
            imageHeightInputBox.value * aspectRatio
          )
        } else {
          imageHeightInputBox.value = Math.round(
            imageWidthInputBox.value / aspectRatio
          )
        }
        fixedImageHeight = imageHeightInputBox.value
        fixedImageWidth = imageWidthInputBox.value
        drawFixedImage(
          0,
          0,
          imageHeightInputBox.value,
          imageWidthInputBox.value
        )
      } else {
        checkFixed()
      }
    } else {
      drawLikeCropImage(imageHeightInputBox.value, imageWidthInputBox.value)
    }
  })
})
aspectRadioElement.addEventListener('click', (e) => {
  lockedAspectRadio = lockedAspectRadio ? false : true
  lockedAspectRadio
    ? (e.target.dataset.originalTitle = 'Unlock aspect')
    : (e.target.dataset.originalTitle = 'Lock aspect')
  e.target.className =
    e.target.className === 'fas fa-lock' ? 'fas fa-unlock' : 'fas fa-lock'
})

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
const handleDownload = () => {
  document.getElementById('saving-data').style.display = 'block'
  let boxCanvas = document.querySelector('#canvas')
  let imageType = document.querySelector('#image-format').value
  let url = boxCanvas.toDataURL(`image/${imageType}`)
  let a = document.createElement('a')
  a.href = url
  a.download = `Safeimagekit-resized-img.${imageType}`
  document.body.appendChild(a)
  a.click()
  if (lang === 'en') {
    window.location.href = `/download?tool=${pageTool}`
  } else {
    window.location.href = `/${lang}/download?tool=${pageTool}`
  }
}
downloadButton.addEventListener('click', handleDownload)

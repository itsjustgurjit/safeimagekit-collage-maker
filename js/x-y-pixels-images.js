
let page = 1
let perPage = 12
const params = new URLSearchParams(window.location.search)
let x = params.has('x') ? Number(params.get('x')) : 400
let y = params.has('y') ? Number(params.get('y')) : 400
document.querySelector(
  '.feature-h1'
).innerHTML = `Sample images of size ${x}x${y} pixels`
document.querySelector(
  '.feature-h2'
).innerHTML = `Sample images of size ${x}x${y} pixels`

let generateImage = () => {
  let canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas-img')
  let ctx = canvas.getContext('2d')
  canvas.height = y
  canvas.width = x
  ctx.fillStyle = '#cccccc'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = `bold 26px sans-serif`
  ctx.fillStyle = '#000000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${x}x${y}`, canvas.width / 2, canvas.height / 2)
  let image = new Image()
  image.onload = () => {
    let div = document.createElement('div')
    div.setAttribute('class', 'col-md-6 col-lg-4 px-0 mb-3')
    let img = document.createElement('img')
    img.src = image.src
    img.setAttribute('class', 'img-responsive')
    img.setAttribute('loading', 'lazy')
    div.appendChild(img)
    let button = document.createElement('button')
    button.dataset.value = canvas.toDataURL()
    button.innerHTML = `<svg width="32" height="32" class="c_c7b" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en">Arrow pointing down</desc><path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path></svg>`
    button.addEventListener('click', downloadImage)
    div.appendChild(button)
    document.querySelector('#gallery').appendChild(div)
  }
  image.src = canvas.toDataURL()
}
const appendData = () => {
  const client_id = 'Mg0dbmexPNVwT7Eop-oqTlIJfGQBhWeUIRmRyCqBJs8'
  const fetchUrl = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=random&page=${page}&per_page=${perPage}`
  page += 1
  perPage = 12
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      data.results.map((i) => {
        let div = document.createElement('div')
        div.setAttribute('class', 'col-md-6 col-lg-4 px-0 mb-3')
        let img = document.createElement('img')
        let button = document.createElement('button')
        button.dataset.value = i.urls.full + `&w=${x}&h=${y}&fit=crop`
        button.innerHTML = `<svg width="32" height="32" class="c_c7b" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en">Arrow pointing down</desc><path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path></svg>`
        img.src = i.urls.full + `&w=${x}&h=${y}&fit=crop`
        img.setAttribute('class', 'img-responsive')
        img.setAttribute('loading', 'lazy')
        div.appendChild(img)
        div.appendChild(button)
        button.addEventListener('click', downloadImage)
        document.querySelector('#gallery').appendChild(div)
      })
    })
}

generateImage()
appendData()
let downloadImage = (e) => {
  let image = new Image()
  image.crossOrigin = 'Anonymous'
  image.src = e.currentTarget.dataset.value
  image.onload = () => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    canvas.height = y
    canvas.width = x
    ctx.drawImage(image, 0, 0, x, y)
    let url = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    a.download = `safeimagekit-${x}x${y}-image.png`
    a.href = url
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}
window.addEventListener('scroll', () => {
  appendData()
})

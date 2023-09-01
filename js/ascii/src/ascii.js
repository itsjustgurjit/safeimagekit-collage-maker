/*
Copyright (c) 2018 Victor Ribeiro - victorqribeiro@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/victorqribeiro/imgToAscii

*/

// █▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
let first = true
class imgToAscii {
  constructor(image, size, charType) {
    this.size = (size <= 0 || size > 1 ? 1 : size) || 1
    this.charType = charType || 0
    this.alphabet = {
      0: ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '],
      1: [
        '$',
        '@',
        'B',
        '%',
        '8',
        '&',
        'W',
        'M',
        '#',
        '*',
        'o',
        'a',
        'h',
        'k',
        'b',
        'd',
        'p',
        'q',
        'w',
        'm',
        'Z',
        'O',
        '0',
        'Q',
        'L',
        'C',
        'J',
        'U',
        'Y',
        'X',
        'z',
        'c',
        'v',
        'u',
        'n',
        'x',
        'r',
        'j',
        'f',
        't',
        '/',
        '\\',
        '|',
        '(',
        ')',
        '1',
        '{',
        '}',
        '[',
        ']',
        '?',
        '-',
        '_',
        '+',
        '~',
        '<',
        '>',
        'i',
        '!',
        'l',
        'I',
        ';',
        ':',
        ',',
        '"',
        '^',
        '`',
        "'",
        '.',
        ' ',
      ],
      2: ['█', '▒', '░'],
    }
    this.string = ''
    this.stringColor = ''
    this.imageSrc = image
    this.loadImage = new Promise((resolve, reject) => {
      this.image = new Image()
      this.image.src = this.imageSrc
      this.image.onload = () => {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.image.width * this.size
        this.canvas.height = this.image.height * this.size
        this.context = this.canvas.getContext('2d')
        this.context.drawImage(
          this.image,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        )
        this.imageData = this.context.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height
        )
        let grayStep = Math.ceil(255 / this.alphabet[this.charType].length)
        for (let i = 0; i < this.imageData.data.length; i += 4) {
          for (let j = 0; j < this.alphabet[this.charType].length; j++) {
            let r = this.imageData.data[i]
            let g = this.imageData.data[i + 1]
            let b = this.imageData.data[i + 2]
            if (r * 0.2126 + g * 0.7152 + b * 0.0722 < (j + 1) * grayStep) {
              const char = this.alphabet[this.charType][j]
              this.string += char
              this.stringColor +=
                '<span style="color: rgb(' +
                r +
                ',' +
                g +
                ',' +
                b +
                '); ">' +
                char.replace(' ', '&nbsp;') +
                '</span>'
              break
            }
          }
          if (!((i / 4 + 1) % this.canvas.width)) {
            this.string += '\n'
            this.stringColor += '<br>'
          }
        }
        resolve()
      }
      this.image.error = reject
    }).catch((e) => console.error(e))
  }

  getPreElement() {
    if (first == false) {
      var Removepre = document.querySelector('pre')
      Removepre.remove()
    }
    first = false

    const pre = document.createElement('pre')
    pre.setAttribute('id', 'myInput')
    pre.style.fontFamily = 'Courier, monospace'
    pre.style.lineHeight = '6px'
    pre.style.fontSize = '11px'
    pre.style.display = 'inline-block'
    if (invert == true) {
      pre.style.background = '#000'
      pre.style.color = '#fff'
    }

    return pre
  }

  async display(appendToBody = true) {
    const pre = this.getPreElement()
    if (appendToBody) document.body.appendChild(pre)
    await this.loadImage
    pre.innerText = this.string
    if (!appendToBody) return pre
  }

  async displayColor(bg, appendToBody = true) {
    const pre = this.getPreElement()
    pre.style.backgroundColor = bg
    if (appendToBody) document.body.appendChild(pre)
    await this.loadImage
    pre.innerHTML = this.stringColor
    if (!appendToBody) return pre
  }
}

let invert = false
const invertColor = () => {
  if (invert == false) {
    invert = true
  } else {
    invert = false
  }
  document.getElementById('fontLoader').style.display = `flex`
  fontFlag = true
  setAscii()

  // $(window).scrollTop(0);
  // document.getElementById("Showloader").style.display = "block";
  // document.getElementById("slider").style.display = "none";
  // document.getElementById("buttonDiv").style.display = "none";
  // document.getElementById("modalContainer").style.display = "none";

  // document.querySelector("#content").style.display = "block";
  // document.querySelector("#upper-loader").style.display = "none";
  // document.querySelector(".container2").style.height = `300px`;
  // document.querySelector(".box-border").style.display = "block";
  // document.querySelector(".box").style.background = "#6666ff";
}

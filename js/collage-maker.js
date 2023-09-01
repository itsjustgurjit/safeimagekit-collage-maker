const templatesIcon = document.querySelector("#templates-icon");
const styleIcon = document.querySelector("#style-icon");
const templatesBox = document.querySelector(".templates");
const styling = document.querySelector(".styling");
const templateElements = document.querySelectorAll(".template");
const frameElements = document.querySelectorAll(".frame");
templatesIcon.addEventListener("click", (e) => {
  e.currentTarget.classList.add("active");
  templatesBox.style.display = "flex";
  styling.style.display = "none";
  styleIcon.classList.remove("active");
});
styleIcon.addEventListener("click", (e) => {
  e.currentTarget.classList.add("active");
  templatesBox.style.display = "none";
  styling.style.display = "flex";
  templatesIcon.classList.remove("active");
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let gap = 3;
let cells = [];
const backgroundColorInput = document.getElementById("backgroundColorInput");
const borderRadiusInput = document.getElementById("borderRadiusInput");
const clearBtn = document.getElementById("clearButton");
let frameWidth = 5;

const templates = [
  //1
  [
    { x: 0, y: 0, w: 0.5, h: 0.5 },
    { x: 0.5, y: 0, w: 0.5, h: 0.5 },
    { x: 0, y: 0.5, w: 1, h: 0.5 },
  ],
  //2
  [
    { x: 0, y: 0, w: 0.33, h: 1 },
    { x: 0.33, y: 0, w: 0.34, h: 1 },
    { x: 0.67, y: 0, w: 0.33, h: 1 },
  ],
  //3
  [
    { x: 0, y: 0, w: 1, h: 0.33 },
    { x: 0, y: 0.33, w: 1, h: 0.34 },
    { x: 0, y: 0.67, w: 1, h: 0.33 },
  ],
  //4
  [
    { x: 0, y: 0, w: 0.5, h: 0.5 },
    { x: 0.5, y: 0, w: 0.5, h: 0.5 },
    { x: 0, y: 0.5, w: 0.5, h: 0.5 },
    { x: 0.5, y: 0.5, w: 0.5, h: 0.5 },
  ],
  //5
  [
    { x: 0, y: 0, w: 1, h: 0.33 },
    { x: 0, y: 0.33, w: 0.5, h: 0.34 },
    { x: 0.5, y: 0.33, w: 0.5, h: 0.34 },
    { x: 0, y: 0.67, w: 1, h: 0.33 },
  ],
  //6
  [
    { x: 0, y: 0, w: 1, h: 0.5 },
    { x: 0, y: 0.5, w: 0.33, h: 0.5 },
    { x: 0.33, y: 0.5, w: 0.34, h: 0.5 },
    { x: 0.67, y: 0.5, w: 0.33, h: 0.5 },
  ],
  //7
  [
    { x: 0, y: 0, w: 0.33, h: 0.33 },
    { x: 0.33, y: 0, w: 0.34, h: 0.33 },
    { x: 0.67, y: 0, w: 0.33, h: 0.33 },
    { x: 0, y: 0.33, w: 0.33, h: 0.34 },
    { x: 0.33, y: 0.33, w: 0.34, h: 0.34 },
    { x: 0.67, y: 0.33, w: 0.33, h: 0.34 },
    { x: 0, y: 0.67, w: 0.33, h: 0.33 },
    { x: 0.33, y: 0.67, w: 0.34, h: 0.33 },
    { x: 0.67, y: 0.67, w: 0.33, h: 0.33 },
  ],
  //8
  [
    { x: 0, y: 0, w: 0.5, h: 0.33 },
    { x: 0.5, y: 0, w: 0.5, h: 0.33 },
    { x: 0, y: 0.33, w: 0.5, h: 0.34 },
    { x: 0.5, y: 0.33, w: 0.5, h: 0.34 },
    { x: 0, y: 0.67, w: 0.5, h: 0.33 },
    { x: 0.5, y: 0.67, w: 0.5, h: 0.33 },
  ],
  //10
  [
    { x: 0, y: 0, w: 0.66, h: 0.5 },
    { x: 0.66, y: 0, w: 0.34, h: 0.5 },
    { x: 0, y: 0.5, w: 0.33, h: 0.5 },
    { x: 0.33, y: 0.5, w: 0.34, h: 0.5 },
    { x: 0.67, y: 0.5, w: 0.33, h: 0.5 },
  ],
  //11
  [
    { x: 0, y: 0, w: 0.5, h: 0.66 },
    { x: 0.5, y: 0, w: 0.5, h: 0.34 },
    { x: 0.5, y: 0.34, w: 0.5, h: 0.33 },
    { x: 0, y: 0.66, w: 0.5, h: 0.34 },
    { x: 0.5, y: 0.67, w: 0.5, h: 0.44 },
  ],
  // 12 heart
[
  { x: 0, y: 0, w: 1, h: 0.25 },
  { x: 0, y: 0.25, w: 0.5, h: 0.5 },
  { x: 0.5, y: 0.25, w: 0.5, h: 0.5 },
  { x: 0, y: 0.75, w: 1, h: 0.25 },
  ],
  //14
  [
  { x: 0, y: 0, w: 0.25, h: 1 },
  { x: 0.25, y: 0, w: 0.5, h: 0.5 },
  { x: 0.75, y: 0, w: 0.25, h: 1 },
  { x: 0.25, y: 0.5, w: 0.5, h: 0.5 },
  ],
  //15
  [
  { x: 0, y: 0, w: 0.33, h: 0.5 },
  { x: 0.33, y: 0, w: 0.34, h: 0.5 },
  { x: 0.67, y: 0, w: 0.33, h: 0.5 },
  { x: 0, y: 0.5, w: 0.33, h: 0.5 },
  { x: 0.33, y: 0.5, w: 0.34, h: 0.5 },
  { x: 0.67, y: 0.5, w: 0.33, h: 0.5 },
  ],
  //16
  [
  { x: 0, y: 0, w: 1, h: 0.2 },
  { x: 0, y: 0.2, w: 0.5, h: 0.6 },
  { x: 0.5, y: 0.2, w: 0.5, h: 0.6 },
  { x: 0, y: 0.8, w: 1, h: 0.2 },
  ],
  //17
  [
  { x: 0, y: 0, w: 0.6, h: 0.5 },
  { x: 0.6, y: 0, w: 0.4, h: 0.5 },
  { x: 0, y: 0.5, w: 0.4, h: 0.5 },
  { x: 0.4, y: 0.5, w: 0.6, h: 0.5 },
  ],
  //18
  [
  { x: 0, y: 0, w: 0.4, h: 0.5 },
  { x: 0.4, y: 0, w: 0.6, h: 0.5 },
  { x: 0, y: 0.5, w: 0.6, h: 0.5 },
  { x: 0.6, y: 0.5, w: 0.4, h: 0.5 },
  ],
  //19
  [
  { x: 0, y: 0, w: 0.5, h: 0.33 },
  { x: 0.5, y: 0, w: 0.5, h: 0.33 },
  { x: 0, y: 0.33, w: 0.33, h: 0.34 },
  { x: 0.33, y: 0.33, w: 0.34, h: 0.34 },
  { x: 0.67, y: 0.33, w: 0.33, h: 0.34 },
  { x: 0, y: 0.67, w: 0.5, h: 0.33 },
  { x: 0.5, y: 0.67, w: 0.5, h: 0.33 },
  ],
  
  
];




const frames = document.querySelectorAll(".frames");

Array.from(frames).map((item, index) => {
  item.addEventListener("click", (e) => {
    selectFrame(frame[index]);
    drawGrid()
  });
});




const gapInput = document.getElementById("gapInput");


const frameWidthInput = document.getElementById("frameWidthInput");
frameWidthInput.addEventListener("change", function () {
  frameWidth = parseInt(frameWidthInput.value);
  drawGrid();
});

function drawFrame(template) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  template.forEach((cell) => {
    ctx.beginPath();
    ctx.rect(cell.x * canvas.width, cell.y * canvas.height, cell.w * canvas.width, cell.h * canvas.height);
    ctx.stroke();
  });
}

templateElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    drawFrame(templates[index]); // Assuming 'templates' contains the frames
  });
});

frameElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    drawFrame(templates[index]); // Assuming 'templates' contains the frames
  });
})

gapInput.addEventListener("change", function () {
  gap = parseInt(gapInput.value);
  drawGrid();
});
Array.from(templateElements).map((item, index) => {
  item.addEventListener("click", (e) => {
    selectTemplate(templates[index]);
  });
});

clearBtn.addEventListener("click", function () {
  cells.forEach((cell) => {
    delete cell.image;
  });
  drawGrid();
});

borderRadiusInput.addEventListener("change", function () {
  drawGrid();
});


backgroundColorInput.addEventListener("input", function () {
  ctx.strokeStyle = backgroundColorInput.value;
  drawGrid();
});

function drawGrid() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColorInput.value;
  ctx.fillRect(0, 0, width, height);
  cells.forEach((cell) => {
    const x = cell.x * width + gap / 2;
    const y = cell.y * height + gap / 2;
    const w = cell.w * width - gap;
    const h = cell.h * height - gap;
    ctx.fillStyle = backgroundColorInput.value;
    
    // Create a rounded rectangle path
    const radius = parseInt(borderRadiusInput.value);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    if (cell.image) {
      // Clip to the rounded rectangle path
      ctx.save();
      ctx.clip();

      // Calculate the scale (while keeping aspect ratio)
      const scale = Math.max(cell.image.width / w, cell.image.height / h);

      // Calculate the top left position to start drawing from the image
      const imgX = (cell.image.width - w * scale) / 2;
      const imgY = (cell.image.height - h * scale) / 2;

      // Draw the image on the canvas
      ctx.drawImage(cell.image, 0, 0, w, h, x, y, w, h);

      // Restore the context to remove the clipping region
      ctx.restore();
    } else {
      ctx.fillStyle = "lightgray";
      ctx.fill();
    }

    ctx.strokeStyle = backgroundColorInput.value;
    ctx.lineWidth = gap;
    ctx.strokeRect(x, y, w, h);
    ctx.lineWidth = frameWidth;
    ctx.strokeStyle = backgroundColorInput.value;
    ctx.strokeRect(frameWidth / 2, frameWidth / 2, width - frameWidth, height - frameWidth);
  });
}


backgroundColorInput.addEventListener("input", function () {
  ctx.strokeStyle = backgroundColorInput.value;
});

// Select a template
function selectTemplate(template) {
  cells = template.map((cell) => ({ ...cell }));
  drawGrid();
}
// Add event listener for uploading images
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) / width;
  const y = (event.clientY - rect.top) / height;
  for (const cell of cells) {
    if (
      x >= cell.x &&
      x <= cell.x + cell.w &&
      y >= cell.y &&
      y <= cell.y + cell.h
    ) {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          const img = new Image();
          img.onload = function () {
            // Calculate the aspect ratios of the image and the cell
            const imgRatio = img.width / img.height;
            const cellW = cell.w * width - gap;
            const cellH = cell.h * height - gap;
            const cellRatio = cellW / cellH;

            // Create a temporary canvas to crop the image
            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d");

            // Set the temporary canvas dimensions to match the cell size
            tempCanvas.width = cellW;
            tempCanvas.height = cellH;

            // Determine the cropping parameters based on the aspect ratio comparison
            let cropX, cropY, cropWidth, cropHeight;
            if (imgRatio > cellRatio) {
              // Image is wider than cell, crop horizontally
              cropWidth = img.height * cellRatio;
              cropHeight = img.height;
              cropX = (img.width - cropWidth) / 2;
              cropY = 0;
            } else {
              // Image is taller than cell, crop vertically
              cropWidth = img.width;
              cropHeight = img.width / cellRatio;
              cropX = 0;
              cropY = (img.height - cropHeight) / 2;
            }

            // Draw the cropped image on the temporary canvas
            tempCtx.drawImage(
              img,
              cropX,
              cropY,
              cropWidth,
              cropHeight,
              0,
              0,
              cellW,
              cellH
            );

            // Save the temporary canvas as the cell's image
            cell.image = tempCanvas;
            drawGrid();
          };
          img.src = reader.result;
        };

        reader.readAsDataURL(file);
      });
      fileInput.click();
      break;
    }
  }
});
// Call this function to initialize the collage maker with the first template
selectTemplate(templates[0]);

//download btn
downloadButton.addEventListener("click", function () {
  const dataUrl = canvas.toDataURL("image/jpeg",1); // or 'image/png'
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "collage.jpg";
  link.click();
});

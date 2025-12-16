let filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturation: { value: 100, min: 0, max: 200, unit: "%" },
  huerotation: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 200, unit: "%" },
  sepia: { value: 0, min: 0, max: 200, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 200, unit: "%" },
};

const presets = {
  // ===== BASIC =====
  vivid: {
    brightness: 110,
    contrast: 120,
    saturation: 150,
    huerotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  soft: {
    brightness: 105,
    contrast: 90,
    saturation: 90,
    huerotation: 0,
    blur: 1,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  // ===== BLACK & WHITE =====
  classicBW: {
    brightness: 110,
    contrast: 130,
    saturation: 0,
    huerotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  // ===== WARM =====

  sunset: {
    brightness: 112,
    contrast: 110,
    saturation: 160,
    huerotation: 25,
    blur: 0,
    grayscale: 0,
    sepia: 30,
    opacity: 100,
    invert: 0,
  },

  goldenHour: {
    brightness: 110,
    contrast: 100,
    saturation: 140,
    huerotation: 18,
    blur: 0,
    grayscale: 0,
    sepia: 35,
    opacity: 100,
    invert: 0,
  },

  // ===== COOL =====
  coolBreeze: {
    brightness: 95,
    contrast: 110,
    saturation: 120,
    huerotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  // ===== VINTAGE / FILM =====
  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    huerotation: 0,
    blur: 1,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  polaroid: {
    brightness: 108,
    contrast: 95,
    saturation: 120,
    huerotation: 5,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  // ===== CINEMATIC =====
  cinematic: {
    brightness: 90,
    contrast: 140,
    saturation: 110,
    huerotation: 190,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  // ===== CREATIVE =====
  dreamy: {
    brightness: 110,
    contrast: 95,
    saturation: 125,
    huerotation: 0,
    blur: 2,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  retroPop: {
    brightness: 105,
    contrast: 135,
    saturation: 160,
    huerotation: 340,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  // ===== SPECIAL =====

  blurFocus: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    huerotation: 0,
    blur: 3,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const resetBtn = document.querySelector("#reset-btn");
const downloaBtn = document.querySelector("#download-btn");
const filterContainer = document.querySelector(".filters");
const presetConatiner = document.querySelector(".Presets");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let loadedImg = null;

function createFilterElement(name, unit, value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");
  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;
  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", () => {
    filters[name].value = input.value;
    applyFilter();
  });

  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max
    );
    filterContainer.appendChild(filterElement);
  });
}
createFilters();

imageInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "flex";
  imagePlaceholder.style.display = "none";
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    loadedImg = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilter() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter =
    `brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.huerotation.value}${filters.huerotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})`.trim();

  canvasCtx.drawImage(loadedImg, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    huerotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 200, unit: "%" },
    sepia: { value: 0, min: 0, max: 200, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 200, unit: "%" },
  };
  applyFilter();
  filterContainer.innerHTML = "";
  createFilters();
});

downloaBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

Object.keys(presets).forEach((presetName) => {
  const presetBtn = document.createElement("button");
  presetBtn.classList.add("btn");
  presetBtn.innerText = presetName;
  presetConatiner.appendChild(presetBtn);

  presetBtn.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilter();
    filterContainer.innerHTML = "";
    createFilters();
  });
});

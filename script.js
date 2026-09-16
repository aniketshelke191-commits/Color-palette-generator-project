const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", (e) => {
  if (e.target.nodeName == "I") {
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        let copyBtn = e.target;
        showCopySuccess(copyBtn);
      })
      .catch((err) => {
        alert(err);
      });
  } else if (e.target.classList.contains("color")) {
    const hexValue =
      e.target.nextElementSibling.querySelector(".hex-value").textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn"));
      })
      .catch((err) => {
        alert(err);
      });
  }
});

function showCopySuccess(copyBtn) {
  copyBtn.classList.remove("far", "fa-copy");
  copyBtn.classList.add("fas", "fa-check");

  copyBtn.style.color = "#48bb78";

  setTimeout(() => {
    copyBtn.classList.add("far", "fa-copy");
    copyBtn.classList.remove("fas", "fa-check");

    copyBtn.style.color = "#64748b";
  }, 1500);
}

function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDiplayColor(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * (15 - 0 + 1)) + 0];
  }

  return color;
}

function updatePaletteDiplayColor(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

generatePalette();

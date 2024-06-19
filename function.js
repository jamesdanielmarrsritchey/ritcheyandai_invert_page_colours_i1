function invertColors() {
  const elements = document.querySelectorAll('body, body *');

  const hexToRgb = (hex) => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      let fullHex = hex.length === 4 ? '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3] : hex;
      let r = parseInt(fullHex.substring(1, 3), 16);
      let g = parseInt(fullHex.substring(3, 5), 16);
      let b = parseInt(fullHex.substring(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return null;
  };

  const invertRgbColor = (color) => {
    let rgb = color.match(/\d+/g).map(Number);
    rgb = rgb.map(c => 255 - c);
    return `rgb(${rgb.join(', ')})`;
  };

  const convertAndInvertColor = (color) => {
    if (color.startsWith('#')) {
      const rgb = hexToRgb(color);
      if (rgb) return invertRgbColor(rgb);
    } else if (color.startsWith('rgb')) {
      return invertRgbColor(color);
    }
    return color;
  };

  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    let backgroundColor = style.backgroundColor;
    let textColor = style.color;

    // Convert and invert colors
    const newBgColor = convertAndInvertColor(backgroundColor);
    const newTextColor = convertAndInvertColor(textColor);

    // Apply the inverted colors
    el.style.backgroundColor = newBgColor;
    el.style.color = newTextColor;
  });
}



/*
Example:

window.onload = function() {
    const element = document.querySelector("#myElement");
    if (element) {
        invertColors();
    }
};

OnClick Example: 

document.querySelector("#myButton").addEventListener("click", function() {
    const element = document.querySelector("#myElement");
    if (element) {
        invertColors();
    }
});

*/
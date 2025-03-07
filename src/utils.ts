import { extractColors } from "extract-colors";

export function convertMiliseconds(miliseconds: number) {
  let minutes = Math.trunc(miliseconds / 60000);
  let seconds = ((miliseconds % 60000) / 1000).toFixed(0);
  return String(
    Number(seconds) == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
  );
}

export function getIdFromURL() {
  const queryParams = window.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const id = urlParams.get("id");
  return id;
}

export async function getColorsFromImage(imageUrl: string) {
  const colors = await extractColors(imageUrl, {
    crossOrigin: "anonymous",
    pixels: 10000,
    distance: 0.22,
    saturationDistance: 0.2,
    lightnessDistance: 0.2,
    hueDistance: 0.083,
  }).then((colors) => {
    return colors;
  });

  return colors;
}

export function getContrastYIQ(hexcolor: string) {
  var r = parseInt(hexcolor.substring(1, 3), 16);
  var g = parseInt(hexcolor.substring(3, 5), 16);
  var b = parseInt(hexcolor.substring(5, 7), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

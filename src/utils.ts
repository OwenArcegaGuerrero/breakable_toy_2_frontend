export function convertMiliseconds(miliseconds: number) {
  let minutes = Math.trunc(miliseconds / 60000);
  let seconds = ((miliseconds % 60000) / 1000).toFixed(0);
  return String(
    Number(seconds) == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
  );
}

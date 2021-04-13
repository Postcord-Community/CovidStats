export async function resolveHTML(html) {
  this.html = html;

  var resultJson: object = {};

  var count: string = await this.html
    .match(
      /(?<=(<text.*?>))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(<\/text>))/g
    )
    .map((a) => parseInt(a.replace(" ", "").replace(".", "")));
  var city: string[] = await this.html
    .match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g)
    .filter((a) => a.includes("data-adi"))
    .map((b) => b.slice(10).replace('"', ""));

  city.forEach(async (x, y) => {
    resultJson[x] = count[y];
  });

  return resultJson;
}

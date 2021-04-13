export async function getStats(params) {
  this.type = params.type;
  this.html = params.html;

  var resultType: string;

  if (this.type) {
    if (this.type.toLowerCase() === "geneldurumjson") {
      resultType = JSON.parse(
        this.html.split("var geneldurumjson =")[1].split(";//")[0].trim()
      );
    } else if (this.type.toLowerCase() === "sondurumjson") {
      resultType = JSON.parse(
        this.html.split("var sondurumjson =")[1].split(";//")[0].trim()
      );
    }
  }

  if (resultType) {
    return resultType;
  } else return false;
}

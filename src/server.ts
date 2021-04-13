import { load } from "cheerio";
import express, { Application } from "express";
import axios from "axios";
import { resolveHTML } from "./services/resolveHTML";
import { getStats } from "./services/getStats";

const app: Application = express();

app.get("/sondurumasi.json", async (req, res, next) => {
  try {
    await axios.get("https://covid19asi.saglik.gov.tr").then(async (result) => {
      var $ = load(result.data);
      var dataHTML = $('g[id="turkiye"]').html().split("</defs>")[1].trim();
      var jsonData = await resolveHTML(dataHTML);

      if (req.query.searchQuery) {
        var key: any = req.query.searchQuery;
        if (jsonData[key]) {
          jsonData = { searchResult: jsonData[key] };
        } else
          jsonData = {
            error: "I couldn't find this city in a bag (╯°□°）╯︵ ┻━┻",
          };
      }

      res.status(200).json({
        author: "Bris (Hasan)",
        github: "https://github.com/brisdevs/CovidStats",
        source: "T.C Sağlık Bakanlığı (https://covid19asi.saglik.gov.tr)",
        data: jsonData,
      });
    });
  } catch (error) {
    throw error;
  }
});

app.get("/sondurum.json", async (req, res, next) => {
  try {
    await axios.get("https://covid19.saglik.gov.tr/").then(async (result) => {
      res.status(200).json({
        author: "Bris (Hasan)",
        github: "https://github.com/brisdevs/CovidStats",
        source: "T.C Sağlık Bakanlığı (https://covid19.saglik.gov.tr)",
        data: await getStats({ type: "sondurumjson", html: result.data }),
      });
    });
  } catch (error) {
    throw error;
  }
});

app.get("/geneldurum.json", async (req, res, next) => {
  try {
    await axios
      .get(
        "https://covid19.saglik.gov.tr/TR-66935/genel-koronavirus-tablosu.html"
      )
      .then(async (result) => {
        res.status(200).json({
          author: "Bris (Hasan)",
          github: "https://github.com/brisdevs/CovidStats",
          source: "T.C Sağlık Bakanlığı (https://covid19.saglik.gov.tr)",
          data: await getStats({ type: "geneldurumjson", html: result.data }),
        });
      });
  } catch (error) {
    throw error;
  }
});

app.listen(3000, () =>
  console.log("Connected successfully " + 3000)
);
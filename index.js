const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const readCSVLinks = require("./src/readCSVLinks");
const savePropertyCSV = require("./src/savePropertyCSV");

async function main() {
  let links = await readCSVLinks();

  for (let i = 0; i < links.length; i++) {
    let response = await axios({
      method: "get",
      url: `https://${links[i]}`,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
        "Upgrade-Insecure-Requests": 1,
        scheme: "https"
      }
    });

    // HElP US SEE THE WHOLE RESPONSE
    // fs.writeFile("./data/response.html", response.data, function(err) {
    //   if(err) {
    //     return console.log(err);
    //   }

    //   console.log("🚀🚀 THE FILE WAS SAVED 👌👌");
    // });

    await scrapeData(links, response, i);
  }
}

async function scrapeData(links, response, i) {
  try {
    const $ = cheerio.load(response.data);
    let script = $("script");
    let data = script[script.length - 1].children[0].data;
    data = data.replace(
      "(function(){var w=window;w.$components=(w.$components||[]).concat(",
      ""
    );

    data = data.replace(")||w.$components})()", "");
    data = JSON.parse(data);

    let base = data.o.w[2][3].s; //Basic path
    let property = {};
    property.title = base.adTitle;
    property.images = base.pictures;
    property.adId = base.adId;
    property.link = links[i];
    property.price = base.adSummary.price.amount;
    property.currency = base.adSummary.price.currency;
    property.creationDate = base.adSummary.creationDate;
    property.views = base.adSummary.viewCount;
    property.sellerName = base.adSummary.sellerName;
    property.sellerLink = base.adSummary.sellerLink;
    property.sellerPicture = base.adSummary.sellerPicture;
    property.sellerPhone = base.replyInfo.adPhone;
    property.propertyArea = base.generalDetails.attributes[0].value;
    property.propertyLocation = base.generalDetails.locationName;
    property.propertyLat = base.location.latitude;
    property.propertyLng = base.location.longitude;
    property.propertyStaticMap = base.location.signedMapUrl;
    property.propertyDescription = base.description.description;

    await savePropertyCSV(property, i);
  } catch (err) {
    console.log("THERE WAS AN ERROR IN THE STRUCTURE: ", err);
  }
}

main();

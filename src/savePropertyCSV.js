const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = async (property, flag) => {
  let append; 
  if(flag == 1){
    append = false; 
  }else{
    append = true; 
  }

  const csvWriter = createCsvWriter({
    path: './data/properties.csv',
    append: append,
    header: [
      {id: 'title', title: 'TITLE'},
      {id: 'images', title: 'IMAGES'},
      {id: 'adId', title: 'ADID'},
      {id: 'link', title: 'LINK'},
      {id: 'price', title: 'PRICE'},
      {id: 'currency', title: 'CURRENCY'},
      {id: 'creationDate', title: 'CREATION-DATE'},
      {id: 'views', title: 'VIEWS'},
      {id: 'sellerName', title: 'SELLER-NAME'},
      {id: 'sellerLink', title: 'SELLER-LINK'},
      {id: 'sellerPicture', title: 'SELLER-PICTURE'},
      {id: 'sellerPhone', title: 'SELLER-PHONE'},
      {id: 'propertyArea', title: 'PROPERTY-AREA'},
      {id: 'propertyLocation', title: 'PROPERTY-LOCATION'},
      {id: 'propertyLat', title: 'PROPERTY-LAT'},
      {id: 'propertyLng', title: 'PROPERTY-LNG'},
      {id: 'propertyStaticMap', title: 'PROPERTY-STATIC-MAP'},
      {id: 'propertyDescription', title: 'PROPERTY-DESCRIPTION'}
    ]
  }, {flags: 'a'});
  
  const records = [{
    title: JSON.stringify(property.title),
    images: JSON.stringify(property.images),
    adId: JSON.stringify(property.adId), 
    link: JSON.stringify(property.link),
    price: JSON.stringify(property.price),
    currency: JSON.stringify(property.currency),
    creationDate: JSON.stringify(property.creationDate),
    views: JSON.stringify(property.views),
    sellerName: JSON.stringify(property.sellerName),
    sellerLink: JSON.stringify(property.sellerLink),
    sellerPicture: JSON.stringify(property.sellerPicture),
    sellerPhone: JSON.stringify(property.sellerPhone),
    propertyArea: JSON.stringify(property.propertyArea),
    propertyLocation: JSON.stringify(property.propertyLocation),
    propertyLat: JSON.stringify(property.propertyLat),
    propertyLng: JSON.stringify(property.propertyLng),
    propertyStaticMap: JSON.stringify(property.propertyStaticMap),
    propertyDescription: JSON.stringify(property.propertyDescription)
  }];
  
  await csvWriter.writeRecords(records)
  console.log('🚀🚀 SAVED ROW');
}
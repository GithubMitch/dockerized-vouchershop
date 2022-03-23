import dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk'
import config from '../../config.js';

AWS.config.update(config.aws_remote_config)
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com"
});

let items = [
]  
//   {
//       "ean": "8715872000578",
//       "value": 2000,
//       "brand": "tmobile",
//       "price": 2000,
//       "inStock": "NULL",
//       "key": "tmobile20",
//       "name": "T-mobile €20",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8712421040443",
//       "value": 2000,
//       "brand": "kpn",
//       "price": 2000,
//       "inStock": "NULL",
//       "key": "kpn20",
//       "name": "KPN €20",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8715872000493",
//       "value": 1000,
//       "brand": "tmobile",
//       "price": 1000,
//       "inStock": "NULL",
//       "key": "tmobile10",
//       "name": "T-mobile €10",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8715557006192",
//       "value": 4000,
//       "brand": "voda",
//       "inStock": "NULL",
//       "key": "vodafone40",
//       "price": 4000,
//       "name": "Vodafone €40",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "9120005812246",
//       "value": 5000,
//       "brand": "paysafecard",
//       "key": "paysafe50",
//       "price": 5000,
//       "inStock": "NULL",
//       "name": "PaySafeCard €50",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8717624590030",
//       "value": 1000,
//       "brand": "ortel",
//       "price": 1000,
//       "inStock": "NULL",
//       "key": "ortel10",
//       "name": "Ortel €10",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8719326012551",
//       "value": 1000,
//       "brand": "lmobi",
//       "price": 1000,
//       "inStock": "NULL",
//       "key": "lmobi10",
//       "name": "L-Mobi €10",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8712421074141",
//       "value": 3000,
//       "brand": "kpn",
//       "price": 3000,
//       "inStock": "NULL",
//       "key": "kpn30",
//       "name": "KPN €30",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8719326012544",
//       "value": 500,
//       "brand": "lmobi",
//       "price": 500,
//       "inStock": "NULL",
//       "key": "lmobi5",
//       "name": "L-Mobi €5",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8717472240033",
//       "value": 1000,
//       "brand": "lebara",
//       "price": 1000,
//       "inStock": "NULL",
//       "key": "lebara",
//       "name": "Lebara €10",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8719326012568",
//       "value": 1500,
//       "brand": "lmobi",
//       "price": 1500,
//       "inStock": "NULL",
//       "key": "lmobi15",
//       "name": "L-Mobi €15",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "5392000039216",
//       "value": 2000,
//       "brand": "lyca",
//       "key": "lyca20",
//       "price": 2000,
//       "inStock": "NULL",
//       "name": "Lyca €20",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8715557006185",
//       "value": 3000,
//       "brand": "voda",
//       "inStock": "NULL",
//       "key": "vodafone30",
//       "price": 3000,
//       "name": "Vodafone €30",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8712421056901",
//       "value": 1500,
//       "brand": "kpn",
//       "price": 1500,
//       "inStock": "NULL",
//       "key": "kpn15",
//       "name": "KPN €15",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8712421045820",
//       "value": 1000,
//       "brand": "kpn",
//       "price": 1000,
//       "inStock": "NULL",
//       "key": "kpn10",
//       "name": "KPN €10",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "9120005812345",
//       "value": 10000,
//       "brand": "paysafecard",
//       "price": 10000,
//       "inStock": "NULL",
//       "key": "paysafe100",
//       "name": "PaySafeCard €100",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8715557006178",
//       "value": 2000,
//       "brand": "voda",
//       "price": 2000,
//       "inStock": "NULL",
//       "key": "vodafone20",
//       "name": "Vodafone €20",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "8717624590047",
//       "value": 2000,
//       "brand": "ortel",
//       "price": 2000,
//       "inStock": "NULL",
//       "key": "ortel20",
//       "name": "Ortel €20",
//       "actionLabel": "opwaarderen"
//   },
//   {
//       "ean": "5391515720466",
//       "value": 1000,
//       "brand": "gtmobile",
//       "inStock": "NULL",
//       "key": "gtmobile10",
//       "price": 1000,
//       "name": "GT-Mobile €10",
//       "actionLabel": "opwaarderen"
//   }

export default async (req, res) => {
  
  let tableName = 'products';
  let params = {
      TableName: tableName
  };

  dynamodb.scan(params, (err, data) => {
    items = data.Items
    return items;
  });
  return items
}

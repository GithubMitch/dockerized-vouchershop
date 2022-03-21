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
  {key: "voda", name: "Vodafone"},
  {key: "lyca", name: "Lycamobile"},
  {key: "gtmobile", name: "GT-Mobile"},
  {key: "lmobi", name: "L-Mobi"},
  {key: "paysafe", name: "PaySafeCard"},
  {key: "ortel", name: "Ortel"},
  {key: "lebara", name: "Lebara"},
  {key: "kpn", name: "KPN"},
  {key: "apple", name: "Apple"},
  {key: "tmobile", name: "T-Mobile"},
]

export default async (req, res) => {
  // let tableName = 'brands';
  // let params = {
  //     TableName: tableName
  // };
  
  // dynamodb.scan(params, (err, data) => {
    
  //   if (err) {
  //     throw { msg: 'Request failed' , data: err };
  //     return
  //   } else {
  //     items = data.Items
  //     // console.log('Brands >>>> Finished dynamoDB SCAN....');
  //     return items;
  //   };
  // });
  return items 
}
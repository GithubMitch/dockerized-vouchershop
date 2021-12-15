import dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk'
import config from '../../config.js';
import {ref, toRaw} from 'vue';

// import {_} from 'lodash';

// import bodyParser from 'body-parser';

AWS.config.update(config.aws_remote_config)

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com"
});

let items = {}

export default async (req, res) => {
    
  let tableName = 'brands';
  let params = {
      TableName: tableName
  };

  dynamodb.scan(params, (err, data) => {
    if (err) return;
      //throw { msg: 'Request failed' , data: err };
    items = data.Items
    console.log('Brands >>>> Finished dynamoDB SCAN....');
    return items;
  });
  return items 
}
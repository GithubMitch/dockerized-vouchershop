import dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk'
import config from '../../config.js';

AWS.config.update(config.aws_remote_config)
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com"
});

let items = []  
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

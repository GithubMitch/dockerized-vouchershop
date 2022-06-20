import AWS from 'aws-sdk'
import fs from 'fs'

const config = useRuntimeConfig().public

AWS.config.update(config.aws_remote_config)
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com"
});

let items = []

export default defineEventHandler((event) => {
  let tableName = 'testtable';
  let params = {TableName: tableName};
  
  console.log("Importing items into testtable. Please wait...");
  let dummy_products = JSON.parse(fs.readFileSync('./dummy_giftcards.json', 'utf8'));
  dummy_products.forEach(function(product) {
    console.log(product)
      var params = {
          TableName: "products",
          Item: {
              "key": product.key,
              "name": product.name,
              "brand": product.brand,
              "ean": product.ean,
              "value": product.value,
              "price": product.price,
              "actionLabel": product.actionLabel,
              "category": product.category,
              "inStock": product.inStock
          }
      };
      dynamodb.put(params, function(err, data) {
         if (err) {
             console.error(err);
         } else {
             console.log("PutItem succeeded:", product.name);
         }
      });
  });
  return console.log('done')
})


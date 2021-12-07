import AWS from 'aws-sdk'
import config from '../../config.js';

AWS.config.update(config.aws_remote_config)

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com"
});

// let products: any[] 


export default async (req, res) => {
  // await someAsyncFunction() 
  // let data = 'string'
  let tableName = 'products';
  let params = {
      TableName: tableName
  };

    try {
      const products = await dynamodb.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let items = [];
            for (let i in data.Items)
                items.push(data.Items[i]);
                
            console.log('AWS-DynamoDB : table : items: ', '\n' , items)
            console.log('Fetched')
            // res.contentType = 'application/json';
  
            
            return {
              items
            }
          }
        })
      
    } catch (error) {
      console.log(error)
    }
  // res.send(products);
  res.end()
}
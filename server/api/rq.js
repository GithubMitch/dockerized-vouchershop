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




let items = []  

export default async (req, res) => {
    
    // await someAsyncFunction() 
    // let data = 'string'
    let tableName = 'products';
    let params = {
        TableName: tableName
    };

    console.log( '1>>>>' );
    console.log( '2>>>>' );

    let products = await dynamodb.scan(params, (err, data) => {


      // console.log( '3>>>>', err, data );

      if (err) return;
        //throw { msg: 'Request failed' , data: err };

      // console.log(data.Items);

      items = data.Items

      

      //return ;

      // for (let i in data.Items)
      //     items.push(JSON.stringify(data.Items[i]));
            
        // console.log('AWS-DynamoDB : table : items: ', '\n' , items)
        // console.log('Fetched')
        // res.contentType = 'application/json';

      console.log('3>>>> Finished dynamoDB SCAN....');

      // res.statusCode = 200
      
      return items;
      
    });

    // res.json({products});

    //res(awsRequest);

    
  // try {
  // } catch (error) {
  //   console.log('caught error::', error);
  //   //res.send(error);
  // }
  
  

  return items
  
}
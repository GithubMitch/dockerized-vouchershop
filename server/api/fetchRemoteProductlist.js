import AWS from 'aws-sdk'
const runTimeConfig = useRuntimeConfig()

AWS.config.update(runTimeConfig.public.aws_remote_config)
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com",
});

let items = []  
export default defineEventHandler(async(event) => {
  let tableName = 'products';
  let params = {TableName: tableName};

  dynamodb.scan(params, (err, data) => {
    if (err) {
      throw { msg: 'Request failed' , data: err };
      return
    } else {
      items = data.Items
      return items;
    };
  });

  return items
})
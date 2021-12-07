module.exports = {
    aws_table_name: 'dynamodb-test',
    region: 'eu-central-1',
    aws_local_config: {
        //Provide details for local configuration
        accessKeyId: process.env.ACCES_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCES_KEY,
        region: 'eu-central-1',
    },
    aws_remote_config: {
      accessKeyId: process.env.ACCES_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCES_KEY, 
      region: 'eu-central-1',
    },
};
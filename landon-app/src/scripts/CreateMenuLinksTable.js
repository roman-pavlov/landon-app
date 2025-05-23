var AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-2"
});


if (process.env.AWS_SAM_LOCAL) {
  AWS.config.update({
    endpoint: "http://localhost:8000"
  });
}
// Create the DynamoDB service object
var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "MenuLinks",
  KeySchema: [
    // Partition Key
    { AttributeName: "href", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "text", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "class", AttributeType: "S" },
    { AttributeName: "href", AttributeType: "S" },
    { AttributeName: "text", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "href", KeyType: "HASH" },
        { AttributeName: "class", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});
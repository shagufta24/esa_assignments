# ESA-Assignment4

## SMS API microservice

Download and extract the zip file, then follow the following steps to run the code.

1. Change the MongoDb URL in the`config/db.js` file to your custom URL

2. Initialize `package.json` file and install dependencies

### Run the following commands

- ` npm init`
- ` npm install mongoose express body-parser`
- `npm install dotenv`
- `npm install --save express-rate-limit`
- `npm install memory-cache --save`

3. To run the server locally, use the command `npm start` or `node server.js`

Output:

```
Server running at http://localhost:3000
Database connection established!
```

## Deployment

The server is deployed on an AWS EC2 instance. To access the server, use the following url:
http://ec2-18-191-32-77.us-east-2.compute.amazonaws.com:3000
<br>
The following 2 endpoints are available:<br>
POST: /inbound/sms<br>
POST: /outbound/sms

Request body:

```
{
    "from": 123456788,
    "to": 237916438,
    "text": "good morning!"
}
```

## Example test cases

```
from : "1234567890"
to : "12345"
text : "hello"

output : "message": "Forbidden.... Authorization failed."
```

```
from : "1234567890"
to : "245693197641"
text : "hello how are you"

output :
{
    "message": "outbound sms is in correct format",
    "error": ""
}
```

### Author

Shagufta Anjum - 19XJ1A0568

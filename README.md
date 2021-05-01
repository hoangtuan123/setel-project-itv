## Running the app

```bash
$ docker-compose up
```
## Test the app
```bash
curl -X 'POST' \
  'http://localhost:3000/orders' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "amount": 0,
  "cardInfo": "string"
}'
```
## Check all order
```bash
curl -X 'GET' \
  'http://localhost:3000/orders' \
  -H 'accept: */*'
```
## Check an order
```bash
curl -X 'GET' \
  'http://localhost:3000/orders/1/status' \
  -H 'accept: */*'
```
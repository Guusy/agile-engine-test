# Agile engine test

Used boilerplate : [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)

[Test](https://agileengine.bitbucket.io/fsNDJmGOAwqCpzZx/)

## How to run the app

```
npm run dev
```

Port: 3000

## How to run test

```
npm run test
```

## Client urls

`Transactions page -> / `

## Server urls

`Commit new transaction to the account -> POST /api/transactions`

`Fetches transactions history -> GET /api/transactions`

`Find transaction by ID -> GET /api/transactions/:id`

`Balance -> GET /`

- To make it easier to test from postman, the balance starts with money

Postman collection with cases:

```json
{
  "info": {
    "_postman_id": "9226e330-54d1-4448-bf6d-a6318c9d00a7",
    "name": "Transactions",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Add Transaction",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n \"amount\":20,\n \"type\":\"debit\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/transactions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions"]
        }
      },
      "response": []
    },
    {
      "name": "Add Transaction - Invalid type",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n \"amount\":20,\n \"type\":\"INVALID TYPE\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/transactions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions"]
        }
      },
      "response": []
    },
    {
      "name": "Add Transaction - Invalid amount",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n \"amount\":\"--.\",\n \"type\":\"debit\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/transactions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions"]
        }
      },
      "response": []
    },
    {
      "name": "Add Transaction - not enough balance",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n \"amount\":23123123,\n \"type\":\"debit\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/transactions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions"]
        }
      },
      "response": []
    },
    {
      "name": "By id",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/transactions/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions", "1"]
        }
      },
      "response": []
    },
    {
      "name": "By id - invalid id",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/transactions/3.-o,",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions", "3.-o,"]
        }
      },
      "response": []
    },
    {
      "name": "By id - not found",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/transactions/1000",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions", "1000"]
        }
      },
      "response": []
    },
    {
      "name": "All",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/transactions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transactions"]
        }
      },
      "response": []
    }
  ]
}
```

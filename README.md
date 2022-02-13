## Prerequsite

- NodeJS

## Installation

1. clone repo
```
$ git clone https://github.com/aliyura/indicina-url-shortener.git
$ cd indicina-url-shortener
```
4. install node modules
```
$ npm i
```
5. start web server
```
$ npm start
```

6. server will start on port define in `.env`.


7. Test encoding on the  service


```
$ POST http://localhost:5005/encode

$ Encoding Request Body:
$ {
    "url": "https://www.indicina.co"
  }

$ Encoding Expected Response
$ {
  "status": 200,
  "message": "success",
  "data": {
    "url": "http://127.0.0.1:5005/{shortURLID}"
  }
}

```

8. Test decoding on the  service


```
$ GET http://localhost:5005/decode/{shortURLID}

Decoding Expected Response
$ {
  "status": 200,
  "message": "success",
  "data": {
    "url": "https://www.indicina.co"
  }
}

```

9. Test stat on the  service
   I haven't really understand what you wanted me to return here


```
$ GET http://localhost:5005/statistic/{shortURLID}

Stat Expected Response i just did instead
$ {
  "status": 200,
  "message": "success",
  "data": {
    "url": "https://www.indicina.co",
    "urlId": "{shortURLID}",
    "createdAt": "2022-02-13T07:44:36.587Z",
  }
}

```
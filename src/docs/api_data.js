define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Base Page",
    "name": "Base",
    "group": "Base",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Fuck CORONA\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Base"
  },
  {
    "type": "get",
    "url": "/corona/",
    "title": "Request All Countries Stats",
    "name": "Get_Countries_Stats",
    "group": "Corona",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"countryName\": \"United States\",\n        \"stats\": [\n            \"615,215\",\n            \"26,211\",\n            \"49,970\"\n        ],\n        \"refs.\": [\n            \"https://coronavirus.1point3acres.com/en\"\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/routes.js",
    "groupTitle": "Corona"
  },
  {
    "type": "get",
    "url": "/corona/:CountryName",
    "title": "Request Stats for Country",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "CountryName",
            "defaultValue": "India",
            "description": ""
          }
        ]
      }
    },
    "name": "Get_Country_Stats",
    "group": "Corona",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"countryName\": \"India\",\n    \"stats\": [\n        \"11,933\",\n        \"392\",\n        \"1,344\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/routes.js",
    "groupTitle": "Corona"
  },
  {
    "type": "get",
    "url": "/corona/",
    "title": "Request State Headers",
    "name": "Get_Headers",
    "group": "Corona",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    \"Countries and territories\",\n    \"Cases\",\n    \"Deaths\",\n    \"Recov.\",\n    \"Ref.\"\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/routes.js",
    "groupTitle": "Corona"
  },
  {
    "type": "get",
    "url": "/corona/",
    "title": "Request List of Countries for Available Data",
    "name": "Get_List_of_Countries",
    "group": "Corona",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    \"United States\",\n    \"Spain\",\n    \"Italy\",\n    \"India\",\n    \"China\",\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/routes.js",
    "groupTitle": "Corona"
  },
  {
    "type": "get",
    "url": "/corona/",
    "title": "Request WorldWide stats",
    "name": "Get_WorldWide_Stats",
    "group": "Corona",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"countryName\": \"world\",\n    \"stats\": [\n        \"2,006,513\",\n        \"128,886\",\n        \"501,758\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/routes.js",
    "groupTitle": "Corona"
  }
] });

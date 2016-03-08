# Company-Manager

A web application that manages organizational structure for parent and child companies

## Installation

First install [node.js](http://nodejs.org/) and [mongodb](https://www.mongodb.org/downloads). Then:

```sh
$ npm install
```
[Specify a Data Directory](https://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/)
(default database included)

Modify server.js for your database
```sh
var db = mongojs("your_database_server/companies",["companies"]); // connect to mongoDB database
```

To start application, in application directory, type:
```sh
$ node server.js
```

## Demo

[company-manager-danylomaster.c9users.io](https://company-manager-danylomaster.c9users.io/)
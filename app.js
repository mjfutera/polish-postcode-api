const {
    polishPostCodeVerifier,
    polishPostCodeModifier,
} = require("./scripts");

const express = require('express');
const app = express();
const mysql = require('mysql');
const {db_details} = require('./important_data');

app.get('/:pc', function (req, res) {
    const code = req.params.pc
    const resultObject = {
        "Request": `Postcode: ${code}`,
        "Request_URL": server.address().address,
        "Result": null,
        "API_Owner":"Michal Futera",
        "API_Owner_Link":"https:\/\/linktr.ee\/mjfutera"
    };
    if(polishPostCodeVerifier(code)){
      const newCode = polishPostCodeModifier(code);
      const connection = mysql.createConnection(db_details);
      connection.connect();
      connection.query(`SELECT postcode, location, voivodeship, county FROM pl_postcodes WHERE postcode="${newCode}" LIMIT 1;`, function (error, results, _fields) {
        if (error) throw error;
        resultObject['Result']=results,
        res.set('Content-Type', 'application/json');
        res.send(resultObject);
        res.end();
      });
      connection.end();
    } else {
      resultObject['Result']='Invalid postcode';
      res.set('Content-Type', 'application/json');
      res.send(resultObject);
      res.end();
    }
 })

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("server started " + host + " at port " + port + ".");
 })
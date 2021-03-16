// STWORZENIE SERWERA RESTOWEGO W EXPRESS.JS
const mysql = require('mysql');
let express = require("express");
const fs = require("fs-extra");
let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // wsparcie przesyłania plików json
app.use(bodyParser.urlencoded({ extended: true }));
// DEKLARACJA BIBLIOTEKI ODPOWIEDZIALNEJ ZA ODCZYT / ZAPIS DANYCH DO PLIKU

// DEKLARACJA ZMIENNEJ ODPOWIEDZIALNEJ ZA RÓZNE FUNKCJE POMOCNICZE
let lodash = require("lodash");
var easyinvoice = require('easyinvoice');
const FileSaver = require('file-saver');

const DATABASE_HOST='localhost';
const DATABASE_USER='root';
const DATABASE_PASSWORD='root';
const DATABASE_NAME='baza2';

const db = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
})


db.connect((err) => {
    if(err){
        throw err
    }
    console.log('MySql connected')
})


app.get('/addPupil/:name/:surname/:pesel/:class', function (request, response) {
    var newPupilQueryValues = "INSERT INTO pupil (pupil_id, name, surname, pesel, class) VALUES (" + Math.random() + ",'"
    + request.params.name + "','" + request.params.surname + "'," + request.params.pesel + ",'" + request.params.class + "');"
    console.log(newPupilQueryValues)
    db.query(newPupilQueryValues , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log("Pupil " + request.params.name + ' ' + request.params.surname + " added succesfully");
        return response.send("Pupil " + request.params.name + ' ' + request.params.surname + " added succesfully");
    });
  });

app.get('/removePupil/<int:id>', (request, response) => {
    let id = request.params.id
    let sql = 'DELETE FROM Pupil WHERE pupil_id = ?';
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log("pupil removed")
    }) 
})




app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
index_1.parseCSVFile('./cities.csv', { trim: true })
    .then(function (data) {
    console.log("Field/Header names: ", data.output[0]);
    console.log("Number of lines: ", data.lines);
    console.log("Number of records: ", data.records);
    console.log("Bytes parsed: ", data.byteCount);
})
    .catch(function (error) {
    console.log(error.message);
});

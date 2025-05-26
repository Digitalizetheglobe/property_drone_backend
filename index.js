import express from "express";
import mysql2 from "mysql2";

// const connection = mysql2.createConnection({
//   host: "localhost",        
//   database: "property_drone", 
//   user   : "root",        
  
// });
const connection = mysql2.createConnection({
  host: "localhost",        
  database: "propertydrone", 
  user: "property_user",
  password: "PropertyDrone@2025"
});


const express = require("express");

const app = express();
const POST = 8000;

// Routes 

app.listen(PORT, () => console.log(`server run of PORT = ${PORT} `))
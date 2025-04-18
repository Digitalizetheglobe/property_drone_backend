import express from "express";
import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",        // host 
  database: "property_drone", // database name
  user   : "root",        // username
  
});

const express = require("express");

const app = express();
const POST = 8000;

// Routes 

app.listen(PORT, () => console.log(`server run of PORT = ${PORT} `))
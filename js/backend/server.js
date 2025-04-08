const express = require('express')
const cors = require('cors')
const {v4:uuidv4} = require('uuid')
const sqlite3 = require('sqlite3').verbose()

const HTTP_PORT = 8000

app.use(cors())
app.use(express.json())
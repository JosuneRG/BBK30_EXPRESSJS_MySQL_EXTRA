const express = require("express");
const app = express();
const port = 3000;
const mysql = require('mysql2');

app.use(express.json());

// Crear conexión SIN base de datos
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root'
});

// Conectar
db.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});

// Endpoint para crear la base de datos
app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE market';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('✅ Base de datos "market" creada.');
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

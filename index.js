const express = require("express");
const app = express();
const port = 3000;
const mysql = require('mysql2');

app.use(express.json());

// Crear conexión SIN base de datos
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database: 'market'
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

//Creamos la tabla Users
app.get('/createTableUsers', (req, res) => {
    const sql = ` CREATE TABLE Users (
                      idUser INT AUTO_INCREMENT PRIMARY KEY,
                      firstName VARCHAR(255) NOT NULL, 
                      lastName VARCHAR(255) NOT NULL, 
                      age INTEGER(2) NOT NULL)`;
    
    db.query(sql, (err, result) => {

        if (err) throw err
        
            console.log(result)

        res.send('Tabla de usuarios creada.')
    });
});

//Creamos la tabla Orders
app.get('/createTableOrders', (req, res) => {
    const sql = ` CREATE TABLE Orders (
                      idOrder INT AUTO_INCREMENT PRIMARY KEY, 
                      orderDate date DEFAULT NULL, 
                      idUser int NOT NULL)
                      FOREIGN KEY (idUser) REFERENCES Users(idUser) )`;

    db.query(sql, (err, result) => {
        if (err) throw err
            console.log(result)

        res.send('Tabla de productos creada.')
    });
});


// Tabla intermedia (muchos a muchos)
app.get('/createTableUsersOrder', (req, res) => {
    const sql = `CREATE TABLE user_order (
                    idUser INT,
                    idOrder INT,
                    PRIMARY KEY (idUser, idOrder),
                    FOREIGN KEY (idUser) REFERENCES Users(idUser),
                    FOREIGN KEY (idOrder) REFERENCES Orders(idOrder) )`;
    
    db.query(sql, (err, result) => {
        
        if (err) throw err;
            res.send('Tabla Users-Order creada');
    });
    
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

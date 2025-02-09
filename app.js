const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5500;
const app = express();

//const bodyParser = require('body-parser');
app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      // if (path.endsWith('.js')) {
      //   res.setHeader('Content-Type', 'text/javascript');
      // }
      // if (path.endsWith('.html')) {
      //   res.setHeader('Content-Type', 'text/html');
      // }
    }
  }));

app.get('/public/contact.html',(req,res)=>{
    res.sendFile(__dirname + '/public/contact.html');

})

app.post('/formPost',(req,res)=>{
    console.log(req.body);
    res.send(`<h2>Form data received successfully!</h2>`);
})

app.get('/blog.html',(req,res)=>{
  res.sendFile(__dirname + '/blog.html');
})


app.get('/adminLogin.html',(req,res)=>{
  res.sendFile(__dirname + '/adminLogin.html');
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');

})

app.get('/index.html',(req,res)=>{
    res.sendFile(__dirname + '/index.html');

})
app.get('/payment.html',(req,res)=>{
  res.sendFile(__dirname + '/payment.html');
})
//-------------------------------------


app.get('/#event',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})


//---------------------------------------


// live stats script

const mysql = require('mysql');
const path = require('path');


// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: '<host_name>',
    user: '<user_name>',
    password: '<password>',
    database: '<database>'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

// Define a route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route to fetch data from MySQL
app.get('/data', (req, res) => {
    connection.query('SELECT campaign, SUM(amount) AS total_amount FROM donor_details GROUP BY campaign order by total_amount desc', (error, results, fields) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Error fetching data from database.');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
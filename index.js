import bodyParser from 'body-parser'
import express from 'express'
import sql from 'mssql'
import 'msnodesqlv8'
import cors from 'cors'


const app = express();
const port = 3001
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
var result;
var request;
var query;
var con;
const main = async() =>{
    con = await new sql.ConnectionPool({
        database: "master",
        server: "DESKTOP-06VONNS",
        driver: "msnodesqlv8",
        user: 'test',
        password: '12345678',
        options: {
            trustServerCertificate: true,
          trustedConnection: true
        }
    });
    
    await con.connect();
    console.log("conencted");
    request = new sql.Request(con);
    
    query = `select * from dispenser`;
    
    result = await request.query(query);
    
    console.log(result);
}

main();



app.post('/postDispenser', (req,res)=>{
    request = new sql.Request(con);
    console.log(req.body);
    const dispenserName = req.body.dispenserName;
    const val = req.body.val;
    
    request.query(request.template`INSERT into dispenser values (${dispenserName},${val});`,
    (err,result)=>{
        if(err)console.log(err);
        else {
            res.send("Values inserted");
        }
    });
})

app.get('/getDispenser', (req,res)=>{
    request = new sql.Request(con);
    console.log(req.query);
    const orderID = req.query.orderId;
    
    
    request.query(request.template`select * from dispenser`,
    (err,result)=>{
        if(err)console.log(err);
        else {
            res.send(result);
        }
    });
})

app.listen(port, () => console.log(`Server is running on port : http://localhost:${port}`))
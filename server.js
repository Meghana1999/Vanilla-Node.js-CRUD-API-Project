
const http = require("http");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let movies = require("./data/movies.json");

//dotenv => to use .env 
//require("dotenv").config();

const PORT = process.env.PORT || 5001;

// Creating HTTP server
const server = http.createServer((req,res)=>{ 
    req.movies = movies;
    switch(req.method){
        case "GET":
            getReq(req,res);
            break;
        case "POST":
            postReq(req,res);
            break;
        case "PUT":
            putReq(req,res);
            break;
        case "DELETE":
            deleteReq(req,res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(
                // JSON.stringify({message:"Hello Meghana, Welcome tooo, to NodeJs Course"})
                JSON.stringify({title:"Not Found", message:"Route not Found"})
                );
            res.end();

    }


    
});

// We need to listen the server on a PORT
server.listen(PORT, ()=>{
    console.log(`Server started on PORT : ${PORT}`);
});

// For other methods, POST, PUT
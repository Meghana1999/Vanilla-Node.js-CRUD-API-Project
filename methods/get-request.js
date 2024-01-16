module.exports = (req,res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    console.log(baseUrl);
    let id = req.url.split("/")[3];
    console.log(id);
    
    // UUID v4 RegEx matching in node.js
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    
    // Get movies
    if (req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }

    // Get particular movie
    // Check UUID we passed is a valid UUID or not?? => regexV4.test(UUID)
    else if(!regexV4.test(id)){
        res.writeHead(400, {"Content-Type":"application/json"});
        res.end(JSON.stringify({
            title:"Validation failed",
             message:"UUID not valid"
        }));
    }

    else if(baseUrl==="/api/movies/" && regexV4.test(id)){
        res.statusCode = 200;
        res.setHeader("Content-Type","Application/json");
        // .filter() => creates new Array with all elements that pass the provided test/criteria
        // (movie)=>{return movie.id === id;} => for each movie object in req.movies, checks if its id matches the id from URL
        // If match found, then movie object is included in filteredMovie array
        // Here movie is an automatically invoked callback function
        let filteredMovie = req.movies.filter((movie)=>{
            return movie.id === id;
        });
        if(filteredMovie.length>0){
            res.statusCode=200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else{
            res.statusCode=404;
            res.write(JSON.stringify({title:"Not Found", message:"Route not found"}));
            res.end();
        } 
    }

    else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Not Found", message:"Route not found"}));
    }
};
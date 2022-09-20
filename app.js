const express=require("express");
const https=require("https");
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
  res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req , res ){
  console.log(req.body.cityName);
  console.log("post recieved");
  const query=req.body.cityName;
  const units="metric";
  const apiKey = "d26278f6613101b4a0c33f017ec49f55";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units="+units+"";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description= weatherData.weather[0].description;
      const icon= weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon +"@2x.png";
      res.write("<p> the weather is currently "+description+" in "+query+"");
      res.write("<h1>The temperature  in "+query+" is "+temp+" degree celsius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});





app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

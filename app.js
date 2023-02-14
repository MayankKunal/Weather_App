const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
const { response } = require("express");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.render("index");
})
app.post("/",function(req,res)
{
    
    const Query=req.body.cityName;
    if(Query=="")
    {
        res.render("error");
    }
    const key="a9f99c8a00dafe405f2e01071ff7553a";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+Query+"&appid="+key+"&units="+unit;
  
https.get(url,function(response)
{
    response.on("data",function(data)
{
    if(response.statusCode===200){
    const weatherData=JSON.parse(data);
   var temp=weatherData.main.temp;
   var feel=weatherData.main.feels_like;
   var humidity=weatherData.main.humidity;
   var icon=weatherData.weather[0].icon;
   const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
   var weatherDescription=weatherData.weather[0].description;
   const city=req.body.cityName;
    res.render("output",{c:city,t:temp,f:feel,h:humidity,w:weatherDescription,i:imgUrl});
    }
    else{
        res.render("error");
    }
})

})
});

app.post("/failure",function(req,res)
 {
     res.redirect("/");
 })
 app.post("/success",function(req,res)
 {
     res.redirect("/");
 })
app.listen(process.env.PORT||"3000",function()
{
    console.log("The port is Online");
})
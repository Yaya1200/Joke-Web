import express from "express";
import axios from "axios";
const app = express();
app.use(express.urlencoded({extended:true}));
const port =  3000;
const API = "https://v2.jokeapi.dev/joke";
app.use(express.static("public"));
app.get("/", (req, res)=>{
  res.render("index.ejs", {
    jokeTeller: "",
    jokeReciver: ""
  })
})
app.post('/', async(req, res)=>{
   let jokeText = "";
    let jokeSetup = "";
  try{
    const response = await axios.get(`${API}/${req.body.action}`);
    if (response.data.type === "single") {
      jokeText = response.data.joke;
    } else if (response.data.type === "twopart") {
      jokeText = response.data.delivery;
      jokeSetup = response.data.setup
    }
  }
  catch(error){
    console.log("There is an error" , error);
    res.render("index.ejs" , {
    jokeTeller: error.response.data,
    jokeReciver: error.response.data
    })
  }
  res.render("index.ejs",{
    jokeTeller: jokeText,
    jokeReciver: jokeSetup
  });
})
app.listen(port, ()=>{
  console.log(`Listening to port ${port}`);
})
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// to create a folder if folder not exist
// add files to created folder
app.post("/crFile",function(req,res){

const d = new Date();

let date = `${d.getDate()}_${d.getMonth()+1}_${d.getFullYear()}`;
let time =`${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;

    
    if(fs.existsSync("./myFolder")){
        fs.writeFile(`./myFolder/${date}-${time}.txt`,`${d}`,"utf-8",function(err){
            if(err) throw err;
            console.log("file created 1")
            })
            res.json({messege:"file created...."})
    }
    else if(!fs.existsSync("./myFolder")){
fs.mkdir("myFolder",function(err){
if(err) throw err;
fs.writeFile(`./myFolder/${date}-${time}.txt`,`${d}`,"utf-8",function(err){
    if(err) throw err;
    // console.log("file created 2")
    })
})
res.json({messege:"file created...."})
    }
    
})

// to retrive .txt files from the particular folder 
// if .txt files does not exits no .txt file will be shown

app.get("/files",function(req,res){
    
   fs.readdir("./myFolder",function(err,files){
if(err) throw err;
// console.log(files)
let arr=[];

files.map((val,index)=>{
 if(path.extname(`${val}`) === ".txt"){
    let obj={};
    obj[`file${index+1}`] = val;
arr.push(obj);
return arr;
 }

})
if(arr.length === 0){
    return res.json({messege:"No .txt file"})
 }
res.json({messege:arr})
if(err) throw err;

   })
   
})



app.listen(3000);


const { DataTypes } = require("sequelize");
const sequalize=require("./db.js");
const express=require("express")
const Task=require("./taskModel.js")
const cors=require('cors')
const app=express();

app.use(express.json())
app.use(cors())


app.post('/tasks', async(req,res)=>{
    try{
        const data=req.body;
        const task = await Task.create(
        {
            title: data.title,
            description: data.description,
            completed: data.completed,
            due_date: data.due_date,
        }
      );
      console.log(task)
      res.send(task)
    }catch(err){
        res.json(err)
    }
})

app.get('/tasks',async(req,res)=>{
    try{
        const task = await Task.findAll();
        if(task.length>0){
            res.send(task); 
        }
        else{
            res.status(404).send("No tasks found");
        }
   }
   catch(err){
    res.json(err)
   }
    
})

app.get('/tasks/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const task = await Task.findOne({ where: { id: req.params.id } });
         res.send(task); 
        if(task){
        res.send(task); 
        }
        else{
            res.status(404)   
        }
   }
   catch(err){
    res.json(err)
   }
    
})

app.delete('/tasks/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const users = await Task.destroy({
            where: {
              id: id,
            },
          }); 
          res.send("deleted"); 
    }
    catch(err){
        res.json(err)
    }
})

app.put('/tasks/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const users = await Task.update(req.body,{
            where: {
              id: id,
            },
          }); 
          res.send({ message: "updated", result: users }); 
    }
    catch(err){
        res.json(err)
    }
})

sequalize.sync().then(()=>{
    console.log("db connected")
})

app.listen(3000,()=>{
    console.log("server running");
})
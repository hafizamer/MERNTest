const express= require ('express')
const app= express()
const cors = require ('cors')
const mongoose = require('mongoose')
const UserModel= require('./models/Users')
require('dotenv').config({ path: "../.env" });


app.use(cors())
app.use(express.json())


//DB
mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser:true}
)

app.post('/adduser', async (req,res)=>{
    const name =req.body.name;
    const age=req.body.age;
    const user = UserModel({ name: name, age: age})
    await user.save()
    res.send("ダタ-インサ-ト")
})

app.get("/read", async (req,res)=>{
    UserModel.find({},(err,result)=>{
        if (err){
            res.send(err)
        } else{
            res.send(result)
        }
    })
})

app.put('/update', async (req,res)=>{
    const newAge =req.body.newAge;
    const id=req.body.id;
    console.log(newAge, id)

    try{

    await UserModel.findById(id,(error,userToUpdate)=>{
        userToUpdate.age=Number(newAge);
        userToUpdate.save()
    })
    } catch (err){
        console.log(err)
    }

    res.send("updated")

})

app.delete('/delete/:id', async(req, res)=>{
    const id=req.params.id
    await UserModel.findByIdAndRemove(id).exec()
    res.send("deleted")
})

app.listen(3001,()=>{
    console.log("コネクトする ")
})
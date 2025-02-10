import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import Product from "./models/product.model.js";
const app=express();
dotenv.config();
app.get("/",(req,res)=>{
    res.send("server is ready");
})
app.use(express.json());
console.log(process.env.MONGO_URI);

app.post("/api/products",async(req,res)=>{

    const product=req.body;
    if(!product.name||!product.price||!product.image)
    {
        return res.status(400).json({success:false,message:"please enter above field"});

    }
    const newproduct=new Product(product);
    try{
        await newproduct.save();
        res.status(201).json({
            success:true,
            data:newproduct
        })
    }
    catch(error)
    {
console.log("error created",error.message);
  res.status(500).json({success:false,message:"server error"});

    }
    

    }
)

app.get("/api/products",async(req,res)=>{
try{
const products=await Product.find({});
res.status(200).json(products);
}
catch(eror)
{
    res.status(500).json({success:false,message:eror.message});

}

})


app.get("/api/products/:id",async(req,res)=>{
    try{
        const {id}=req.params;
    const product=await Product.findById(id);
    res.status(200).json(product);
    }
    catch(eror)
    {
        res.status(500).json({success:false,message:eror.message});
    
    }
    
    })


    app.put("/api/products/:id",async(req,res)=>{
        try{
            const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
if(!product)
{
    res.status(404).json({success:false,message:"Product not found"});

}

const updateProduct=await Product.findById(id);
        res.status(200).json(updateProduct);
        }
        catch(eror)
        {
            res.status(500).json({success:false,message:eror.message});
        
        }
        
        })
    

        app.delete("/api/products/:id",async(req,res)=>{
            try{
                const {id}=req.params;
            const product=await Product.findByIdAndDelete(id);
            if(!product)
                {
                    res.status(404).json({success:false,message:"Product not found"});
                
                }
            res.status(200).json({success:true,message:"deleted successfully"});
            }
            catch(eror)
            {
                res.status(500).json({success:false,message:eror.message});
            
            }
            
            })



app.listen(5000,()=>{
    connectDb();
    console.log("server started at http://localhost:5000 hello");
})
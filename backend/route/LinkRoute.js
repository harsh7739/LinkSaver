const express = require("express");
const { LinkModel } = require("../model/LinkSchema");


const urlRouter = express.Router()


// For getting All URL

urlRouter.get("/", async(req,res) => {
    try {
        let url = await LinkModel.find()
        if(url.length > 0){
            res.status(200).send(url)
        }else{
            res.status(200).send({res:"No url Found..."})
        }
    } catch (error) {
        console.log(error)
    }
})  

//For posting url 

urlRouter.post("/save", async (req, res) => {
  try {
    req.body.created_at = new Date();
    // console.log("request from url save data ",req.body)
    let url = new LinkModel(req.body);
    // console.log("url....",url)
    await url.save();
    res.status(201).send({ message: "URL BookMarked successfully...", url });
  } catch (error) {
    console.log(error)
  }
});

// For update the url
urlRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    req.body.updated_at=new Date()
    const url=await LinkModel.findOne({_id:id})
    if (!url) {
      res.status(204).json({ error: "no URL found" });
    } else {
     await LinkModel.findByIdAndUpdate({_id:id},req.body);
      res.status(204).send({ "message": "URL updated successfully" });
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: error.message});
  }
});

// For delete url
urlRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let url= await LinkModel.findOne({_id:id})
    if (!url) {
      res.status(202).json({ error: "no Url found" });
    } else {
      await LinkModel.findByIdAndDelete({_id:id});
      res
        .status(202)
        .send({ message: "URL deleted successfully" });
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: error.message});
  }
});

module.exports = {
  urlRouter,
};
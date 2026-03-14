const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

/* GET ALL TASKS */
router.get("/", async (req,res)=>{
    const tasks = await Task.find();
    res.json(tasks);
});

/* ADD TASK */
router.post("/", async (req,res)=>{
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

/* UPDATE TASK STATUS */
router.put("/:id", async (req,res)=>{
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(updatedTask);
});

/* DELETE TASK */
router.delete("/:id", async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:"Task Deleted"});
});

module.exports = router;
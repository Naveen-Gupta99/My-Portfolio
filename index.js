const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'src/.env') });
const Enquiry = require("./encaury.mongoose.js");
const cor = require('cors') // Ensure the file name matches
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cor());

mongoose.connect(process.env.dburl).then(()=>{
  console.log("Connected_database");
  // console.log("Congartulation")
  app.listen(process.env.PORT , ()=>{
    console.log("server is running on "+process.env.PORT)
});
app.post('/api/enquiry-insert', async (req, res) => {
    try {
      const enquiry = new Enquiry({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address:req.body.address,
        message: req.body.message,
      });
  
      await enquiry.save(); // Save the document to the database
      res.status(201).send({ status: 1, msg: "Data received and saved." });
    }catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
         // Duplicate key error
         res.status(400).send({ status: 0, msg: "Email already exists. Please use a different email." });
        } else {
          console.error("Error saving data:", error.message);
          res.status(500).send({ status: 0, msg: "An error occurred while saving data." });
        }
      }
    });

    
});
app.get('/api/enquiry-search', async (req, res) => {
    try {
      const query = req.query.query; // Get the search query from the request
      const enquiries = await Enquiry.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
          { email: { $regex: query, $options: "i" } }, // Case-insensitive search for email
        //   { _id: { $regex: query, $options: "i" } },
        ],
      });
      res.status(200).send(enquiries);
    } catch (error) {
      console.error("Error searching data:", error.message);
      res.status(500).send({ status: 0, msg: "An error occurred while searching data." });
    }
  });




const routes = require("express").Router();
const Upload = require("../models/Upload");
const str = require("random-string");
const path = require("path");
const { json } = require("express");

routes.post("/upload", (req, res) => {
  let body = JSON.parse(req.body.data);
  let image = req.files.file;
  let random_string = str({ length: 100 });
  let original_name = image.name;
  let array = original_name.split(".");
  let extension = array[array.length - 1];
  let new_name = random_string + "." + extension;
  body.image = new_name;
  image.mv(path.resolve() + "/assets/screenShots/" + new_name, (error) => {
    let allImages = [];
    allImages.push(new_name);
    Upload.create(body, (error) => {
      // let obj =  {name : "http://localhost:3000/screenShots/" + new_name};
      res.send({ success: true });
    });
  });
});
routes.get("/files", (req, res) => {
  Upload.find({}, (error, result) => {
    let new_result = result.map((x) => {
      x.image = "http://localhost:3000/screenShots/" + x.image;
      return x;
    });
    res.send(new_result);
  });
});

routes.get("/files/:id", (req, res) => {
  let id = req.params.id;
  Upload.find({ _id: id }, (error, result) => {
    let new_result = result.map((x) => {
      x.image = "http://localhost:3000/screenShots/" + x.image;
      return x;
    });
    res.send(new_result[0]);
  });
});
routes.delete("/:id", (req, res) => {
  let id = req.params.id;
  Upload.deleteMany({ _id: id }, (error) => {
    let new_result = result.map((x) => {
      x.image = "http://localhost:3000/screenShots/" + x.image;
      return x;
    });
    res.send(new_result[0]);
  });
});

routes.get("/files/data/:comp", (req, res) => {
  let comp = req.params.comp;
  console.log(comp);
  Upload.find({ compName: "screen" }, (error, result) => {
    let new_result = result.map((x) => {
      x.image = "http://localhost:3000/screenShots/" + x.image;
      return x;
    });
    res.send(new_result);
  });
});

module.exports = routes;

//dependency required
import express from "express";
import { json } from "body-parser";
import hbs from "hbs";
var app = express();
const port = process.env.PORT || 3001;
import request from "request";
import { Converter } from "showdown";
import cors from "cors";
import Resume from "./components/Resume";
import Resume2 from "./components/Resume-2";
import ReactDOMServer from "react-dom/server";
import React from "react";
import path from "path";
const converter = new Converter();

import fs from "fs";
import pdf from "html-pdf";
import html5pdf from "html5-to-pdf";

//setting view engine
app.set("view engine", "hbs");

// middleware
app.use(cors());
app.use(json());
app.use(express.static("public"));
app.use("/assets", express.static("assets"));
app.use("/home", express.static("home"));

//Routes

app.get("/", (req, res) => {
  res.render("app");
});
/*
app.get("/home", (req, res) => {
  res.status(404).end("Not implemented");
});
*/

app.get("/learn", (req, res) => {
  res.render("learn");
});

app.post("/generate", async (req, res) => {
  const resumes = [Resume, Resume2];
  var { data, resume } = req.body;
  console.log(req.body);
  const Choice = resumes[resume];
  console.log(Choice);
  //injecting request data to template string html
  //setting options for PDF
  var options = { format: "A4" };
  var webpage = ReactDOMServer.renderToStaticMarkup(<Choice data={data} />);
  //Reads the Base Template from the Views Folder
  var template = hbs.compile(fs.readFileSync("././views/gen.hbs", "utf8"));

  //Proccessing the base template with the content
  var html = template({ content: webpage });

  var filename = `${data.firstname}${data.lastname}${new Date().toISOString()}`;

  const inFile = path.join("./assets", `${filename}.html`);
  const outFile = path.join("./assets", `${filename}.pdf`);
  fs.writeFileSync(inFile, html);
  //create PDF from the above generated html
  const html5ToPDF = new html5pdf({
    inputPath: inFile,
    outputPath: outFile,
    include: [
      path.join("./components", "base.min.css"),
      path.join("./components", "components.min.css"),
      path.join("./components", "utilities.min.css"),
      path.join("./components", "tailwind.min.css"),
    ],
  });

  try {
    await html5ToPDF.start();
    await html5ToPDF.build();
    await html5ToPDF.close();
    console.log("DONE");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, message: "an error occured" });
  }
  /*
  pdf
    .create(html, options)
    .toFile(`./public/${filename}.pdf`, function (err, resp) {
      if (resp) return res.json({ filename: filename + ".pdf" });
      else {
        console.log(err);
        return res.json({ error: "error creating the pdf" });
      }
    });
    */
  return res.json({ filename: filename + ".pdf" });
});

//listen to voice of God
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

export default {
  app,
};

import multer from 'multer';
import { Request, Response } from "express";

//function that will ensure the file uploaded is an excel or spreadsheet file
const excelFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

//create directories that will store the uploaded excel
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-arpan-${file.originalname}`);
  },
});

export var uploadFile = multer({ storage: storage, fileFilter: excelFilter });

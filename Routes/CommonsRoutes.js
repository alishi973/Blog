const express = require("express");
const router = express.Router();
const fs = require("fs");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const Controller = require("../Controller");

const multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });

router.post("/image/upload", AuthMiddleware, upload.single("image"), (req, res) => {
  if (!req.isAuth) return res.status(403).send("شما به این قسمت دسترسی ندارید");
  if (req.file) {
    let fileType = req.file.originalname.split(".");
    fileType = fileType[fileType.length - 1];

    const fileName = `${
      Math.random().toString(20).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }.${fileType}`;
    if (!fileName.match(/\.(jpg|jpeg|png|bmp)$/)) return res.status(405).send("فرمت عکس صحیح نیست");

    const avatar = `uploads/images/${fileName}`;
    fs.writeFileSync(avatar, req.file.buffer);
    res.send(`${process.env.HOST}:${process.env.PORT}/static/images/${fileName}`);
  }
  res.status(400).send("عدم ثبت تصویر");
});
router.get("/feed", Controller.CommonController.Feed);

module.exports = router;

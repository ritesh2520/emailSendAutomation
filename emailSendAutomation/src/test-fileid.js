const extractFileId = require("./utils/extractFileId");

const url =
  "https://drive.google.com/file/d/15527hL5EFkhG1ceNvSvdAGYJqSbYLUbt/view?usp=drive_link";

console.log(extractFileId(url));
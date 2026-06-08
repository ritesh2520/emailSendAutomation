require("dotenv").config();

const { drive } = require("./config/google");

async function testDrive() {
  try {
    const response = await drive.files.get({
      fileId: "15527hL5EFkhG1ceNvSvdAGYJqSbYLUbt",
      fields: "id,name,mimeType",
    });

    console.log("Drive Connected");
    console.log(response.data);
  } catch (error) {
    console.error("Drive Error");
    console.error(error.message);
  }
}

testDrive();
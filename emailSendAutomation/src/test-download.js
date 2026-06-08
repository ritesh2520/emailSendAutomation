require("dotenv").config();

const { getPdfBuffer } = require("./services/driveService");

async function test() {
  const buffer = await getPdfBuffer(
    "15527hL5EFkhG1ceNvSvdAGYJqSbYLUbt"
  );

  if (!buffer) {
    console.log("Download failed");
    return;
  }

  console.log("Buffer Size:", buffer.length);
  console.log("Type:", Buffer.isBuffer(buffer));
}

test();
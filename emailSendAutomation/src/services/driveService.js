const { drive } = require("../config/google");

async function getPdfBuffer(fileId) {
  try {
    const response = await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      {
        responseType: "stream",
      },
    );

    const chunks = [];

    return await new Promise((resolve, reject) => {
      response.data
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(chunks));
        })
        .on("error", reject);
    });
  } catch (error) {
    console.error(`Drive download failed for fileId=${fileId}`);

    console.error(error.message);

    return null;
  }
}
async function getFileMetadata(fileId) {
  try {
    const response = await drive.files.get({
      fileId,
      fields: "id,name",
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to get metadata for fileId=${fileId}`);

    return null;
  }
}

module.exports = {
  getPdfBuffer,
  getFileMetadata,
};

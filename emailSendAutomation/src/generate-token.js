require("dotenv").config();

const oauth2Client = require("./config/google");

const code =
  "4/0AeoWuM9jx8Yh5fOEMioMwv9c_mZG1oR6Lp3iDBwvaxJ0hgv52oGdC_nmPVuw0GSXks4tHg&scope=https://www.googleapis.com/auth/gmail.send%20https://www.googleapis.com/auth/drive.readonly";

async function generateToken() {
  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n===== TOKENS =====\n");
    console.log(tokens);
    console.log("\nREFRESH TOKEN:");
    console.log(tokens.refresh_token);
  } catch (error) {
    console.error(error);
  }
}

generateToken();

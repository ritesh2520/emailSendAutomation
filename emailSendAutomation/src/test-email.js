require("dotenv").config();

const {
  getPdfBuffer,
} = require("./services/driveService");

const {
  sendEmail,
} = require("./services/gmailService");

async function testEmail() {
  try {
    const pdfBuffer = await getPdfBuffer(
      "15527hL5EFkhG1ceNvSvdAGYJqSbYLUbt"
    );

    if (!pdfBuffer) {
      throw new Error(
        "Failed to download PDF"
      );
    }

    await sendEmail({
      to: process.env.EMAIL_TO,
      subject: "Test Logistics Email",
      body: "Testing Gmail API attachment.",
      attachments: [
        {
          filename: "AWB_TEST.pdf",
          content: pdfBuffer,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
}

testEmail();
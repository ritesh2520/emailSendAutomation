const { gmail } = require("../config/google");
const { createMimeMessage } = require("../utils/mimeBuilder");

async function sendEmail({ to, subject, html, attachments = [] }) {
  try {
    const rawMessage = createMimeMessage({
      to,
      subject,
      html,
      attachments,
    });

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: rawMessage,
      },
    });

    console.log("Email sent successfully");
    console.log("Message ID:", response.data.id);

    return response.data;
  } catch (error) {
    console.error("Gmail API Error");
    console.error(error.message);
    throw error;
  }
}

module.exports = {
  sendEmail,
};

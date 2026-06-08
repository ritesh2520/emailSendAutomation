function createMimeMessage({ to, subject, html, attachments = [] }) {
  const boundary = `boundary_${Date.now()}`;

  let message = "";

  message += `To: ${to}\r\n`;
  message += `Subject: ${subject}\r\n`;
  message += `MIME-Version: 1.0\r\n`;
  message += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;

  // HTML Body
  message += `--${boundary}\r\n`;
  message += `Content-Type: text/html; charset=UTF-8\r\n\r\n`;
  message += html;
  message += `\r\n\r\n`;

  // Attachments
  for (const attachment of attachments) {
    message += `--${boundary}\r\n`;
    message += `Content-Type: application/pdf; name="${attachment.filename}"\r\n`;
    message += `Content-Transfer-Encoding: base64\r\n`;
    message += `Content-Disposition: attachment; filename="${attachment.filename}"\r\n\r\n`;

    message += attachment.content.toString("base64");
    message += "\r\n\r\n";
  }

  message += `--${boundary}--`;

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

module.exports = {
  createMimeMessage,
};

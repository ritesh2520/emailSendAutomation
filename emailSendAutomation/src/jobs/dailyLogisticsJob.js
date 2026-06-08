const extractFileId = require("../utils/extractFileId");

const { getTodaysRecords } = require("../services/logisticsService");

const { getPdfBuffer, getFileMetadata } = require("../services/driveService");

const { sendEmail } = require("../services/gmailService");

const logger = require("../utils/logger");

function generateEmailHtml(orderSummary) {
  const rows = orderSummary
    .map(
      (item) => `
            <tr>
                <td>${item.orderId}</td>
                <td>${item.awbNumber || "-"}</td>
            </tr>
        `,
    )
    .join("");

  return `
        <h2>Daily Logistics Documents</h2>

        <p>Please find attached today's AWB and FedEx Invoice PDFs.</p>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr>
                <th>Order ID</th>
                <th>AWB Number</th>
            </tr>

            ${rows}
        </table>

        <br>

        <p><b>Total Orders:</b> ${orderSummary.length}</p>
    `;
}

async function runDailyJob() {
  try {
    logger.log("Daily Logistics Job Started");

    const records = await getTodaysRecords();

    if (!records.length) {
      logger.log("No records found for today");
      return;
    }

    const attachments = [];
    const orderSummary = [];

    for (const record of records) {
      logger.log(`Processing Order ${record.order_id}`);

      // ==========================
      // AWB PDF
      // ==========================
      if (record.awb_url) {
        const awbFileId = extractFileId(record.awb_url);

        if (awbFileId) {
          try {
            const awbBuffer = await getPdfBuffer(awbFileId);

            if (awbBuffer) {
              const awbMetadata = await getFileMetadata(awbFileId);

              attachments.push({
                filename: awbMetadata?.name || `AWB_${record.order_id}.pdf`,
                content: awbBuffer,
              });
            }
          } catch (error) {
            logger.error(
              `Failed AWB download for Order ${record.order_id}`,
              error,
            );
          }
        }
      }

      // ==========================
      // Invoice PDF
      // ==========================
      if (record.fedex_invoice_url) {
        const invoiceFileId = extractFileId(record.fedex_invoice_url);

        if (invoiceFileId) {
          try {
            const invoiceBuffer = await getPdfBuffer(invoiceFileId);

            if (invoiceBuffer) {
              const invoiceMetadata = await getFileMetadata(invoiceFileId);

              attachments.push({
                filename:
                  invoiceMetadata?.name || `Invoice_${record.order_id}.pdf`,
                content: invoiceBuffer,
              });
            }
          } catch (error) {
            logger.error(
              `Failed Invoice download for Order ${record.order_id}`,
              error,
            );
          }
        }
      }

      orderSummary.push({
        orderId: record.order_id,
        awbNumber: record.awb_number,
      });
    }

    if (!attachments.length) {
      logger.log("No valid attachments found");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const html = generateEmailHtml(orderSummary);

    await sendEmail({
      to: process.env.EMAIL_TO,
      subject: `Daily Logistics Documents - ${today}`,
      html,
      attachments,
    });

    logger.log(
      `Email sent successfully with ${attachments.length} attachments`,
    );
  } catch (error) {
    logger.error("Daily Job Failed", error);
  }
}

module.exports = {
  runDailyJob,
};

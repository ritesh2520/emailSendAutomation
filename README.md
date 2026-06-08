# Email Automation Project Setup Guide

## Project Overview

This project automatically sends daily logistics documents by email.

Flow:

MySQL Database
→ Read today's records
→ Fetch PDFs from Google Drive
→ Attach PDFs to email
→ Send email using Gmail API
→ Run automatically every day at 9:30 PM

---

# Step 1: Install Node.js

Download and install Node.js LTS version.

Verify installation:

```bash
node -v
npm -v
```

---

# Step 2: Create Project

```bash
mkdir emailSendAutomation
cd emailSendAutomation
npm init -y
```

---

# Step 3: Install Packages

```bash
npm install googleapis mysql2 dotenv node-cron
```

---

# Step 4: Create MySQL Database

Login to MySQL:

```sql
CREATE DATABASE logistics_email_service;

SHOW DATABASES;

USE logistics_email_service;
```

---

# Step 5: Create Logistics Table

```sql
CREATE TABLE logistics_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(100) NOT NULL,
    awb_number VARCHAR(100),
    awb_url TEXT,
    fedex_invoice_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Verify:

```sql
DESC logistics_records;
```

---

# Step 6: Insert Sample Data

```sql
INSERT INTO logistics_records (
    order_id,
    awb_number,
    awb_url,
    fedex_invoice_url
)
VALUES (
    'ORD1001',
    '1234567890',
    'AWB_GOOGLE_DRIVE_LINK',
    'INVOICE_GOOGLE_DRIVE_LINK'
);
```

Verify:

```sql
SELECT * FROM logistics_records;
```

---

# Step 7: Create Google Cloud Project

1. Open Google Cloud Console
2. Create Project
3. Enable Google Drive API
4. Enable Gmail API

---

# Step 8: Create OAuth Credentials

1. APIs & Services
2. Credentials
3. Create OAuth Client
4. Desktop Application

Download credentials.

Save:

* Client ID
* Client Secret

---

# Step 9: Generate Refresh Token

Use OAuth Playground.

Save:

* Refresh Token

---

# Step 10: Create Environment File

Create:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=logistics_email_service

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

EMAIL_TO=abc@gmail.com
```

---

# Step 11: Project Structure

```text
emailSendAutomation
│
├── src
│   ├── config
│   ├── services
│   ├── jobs
│   ├── utils
│   └── index.js
│
├── .env
├── package.json
```

---

# Step 12: Run Application

```bash
node src/index.js
```

---

# Step 13: Schedule Daily Job

Cron:

```javascript
30 21 * * *
```

Meaning:

```text
Every day at 9:30 PM
```

---

# Step 14: Verify Email

Expected Email:

Subject:

Daily Logistics Documents - YYYY-MM-DD

Attachments:

* AWB PDF
* Invoice PDF

Table:

| Order ID | AWB Number |
| -------- | ---------- |
| ORD1001  | 1234567890 |

---

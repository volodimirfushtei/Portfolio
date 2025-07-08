import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Підписка на розсилку
app.post("/api/subscribe", async (req, res) => {
  const { email, firstName, lastName } = req.body;

  const mailchimpData = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  try {
    const response = await axios.post(
      `https://us7.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      mailchimpData,
      {
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Subscribed:", response.data.email_address);
    alert("✅ Subscribed!");
    res.status(200).json({ success: true });
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.title === "Member Exists"
    ) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }

    console.error("❌ Mailchimp error:", error.response?.data || error.message);

    res.status(500).json({ error: "Subscription failed" });
  }
});

// ✅ Підписка на розсилку
app.post("/api/contact", async (req, res) => {});

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
app.post("/api/telegram", async (req, res) => {
  const { name, email, message } = req.body;

  const text = `
    📩 Нова заявка з сайту:
    👤 Ім'я: ${name}
    📧 Email: ${email}
    💬 Повідомлення: ${message || "—"}
    `;

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }
    );

    const messageId = response.data.result.message_id;

    // Видалення через 30 сек
    setTimeout(async () => {
      try {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/deleteMessage`,
          {
            chat_id: CHAT_ID,
            message_id: messageId,
          }
        );
        console.log(`✅ Message ${messageId} deleted from Telegram`);
      } catch (deleteError) {
        console.error(
          "❌ Failed to delete Telegram message:",
          deleteError.message
        );
      }
    }, 30000); // 30 секунд

    console.log("✅ Message sent to Telegram");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Telegram error:", error.response?.data || error.message);
    res.status(500).json({ error: "Telegram error" });
  }
});

// ✅ Запуск сервера
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

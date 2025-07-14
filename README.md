## 📘 Disclaimer

This project was created **for learning and practice purposes only**.  
It is not intended for commercial use or production deployment as-is.

---

# Telegram Support Bot

A simple Telegram bot for handling user questions, sending FAQ info, and allowing admin replies. Built with **Node.js**, **Express**, **Telegraf**, and **MongoDB**.

## 📦 Features

- `/start`, `/help`, `/faq`, `/ask` commands
- Admin panel functionality via inline buttons (`answer`, `delete`)
- Handles both user and group chats
- Session management
- MongoDB for storing questions and admin responses

## 🛠 Tech Stack

- [Telegraf](https://telegraf.js.org/) - Telegram Bot Framework
- [Express](https://expressjs.com/) - HTTP Server
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Dotenv](https://github.com/motdotla/dotenv) - Environment variable support
- [Nodemon](https://nodemon.io/) (dev) - Auto-restart on file changes

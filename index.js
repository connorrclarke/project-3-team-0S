// index.js
const express = require('express');
const app = express();
const PORT = 5555;

app.use(express.json());

// Temporary route for the manager view
app.get('/api/manager', (req, res) => {
  res.json({ message: "Manager interface API endpoint" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

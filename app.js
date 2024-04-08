const express = require('express');
const cors = require('cors');
const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("", router);

app.listen(port, () => { console.log(`Server started on port ${port}!`) });
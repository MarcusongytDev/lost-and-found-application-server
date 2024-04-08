const express = require('express');
const cors = require('cors');
const { initializeFirebaseApp } = require("./FirebaseServices/FirebaseService");
const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

initializeFirebaseApp();

app.use("", router);

// app.use("*", router, (req, res) => {
//     console.log(req.body);
// })

app.listen(port, () => { console.log(`Server started on port ${port}!`) });
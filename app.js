const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const lostItemPostsRouter = require('./routes/lostItemPosts');
const foundItemPostsRouter = require('./routes/foundItemPosts');
const searchFiltersRouter = require('./routes/searchFilters');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/lostItemPosts', lostItemPostsRouter);

let dataArray = [
      { name: "John", age: 12 },
      { name: "Lisa", age: 15 },
      { name: "Dave", age: 13 },
  ];

app.get("/api", (req, res, next) => {
    res.json({
        data: dataArray
    });
});

app.listen(port, () => { console.log(`Server started on port ${port}!`) });
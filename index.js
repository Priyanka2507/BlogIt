const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRouter = require('./routes/post');
const post = require('./models/post');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(console.log("Database Connected"))
    .catch((err) => console.log(err))

app.get("/", async (req, res) => {
    const posts = await post.find().sort({
        date: 'desc'
    })
    res.render('index', { posts: posts });
});

app.use('/posts', postRouter);

app.listen("3000", () => {
    console.log(`Server listening at http://localhost:${port}`);
});
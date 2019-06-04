require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;
var passport = require("passport");

// var modals = require("./public/js/modals");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("views/images"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// // Connect to News API
// const NewsAPI = require("newsapi");
// const newsapi = new NewsAPI("f040e9c3149442ae93a7d68d6e99271b");
// // To query /v2/top-headlines
// // All options passed to topHeadlines are optional, but you need to include at least one of them
// newsapi.v2
//   .topHeadlines({
//     // sources: "bbc-news,the-verge",
//     q: "amazon",
//     category: "",
//     // language: "en"
//     country: "us"
//   })
//   .then(response => {
//     console.log(response);
//     /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
//   });

// var testObject = {
//   source: [Object],
//   author: null,
//   title:
//     "Why Are Gray Whales Dying? Researchers Cut Through The Blubber For Answers - NPR",
//   description:
//     "More than 60 dead gray whales have washed up on Pacific coasts this year, the most in two decades. Researchers are trying to determine whether their food source is a problem, or climate change.",
//   url:
//     "https://www.npr.org/2019/06/01/728033320/why-are-gray-whales-dying-researchers-cut-through-the-blubber-for-answers",
//   urlToImage:
//     "https://media.npr.org/assets/img/2019/05/29/img_7664-900x600_wide-0b921f09b853e63eef221756591cf3cc5c68fda7.jpg?s=1400",
//   publishedAt: "2019-06-01T13:00:00Z",
//   content:
//     "Dr. Kathy Burek, a veterinary pathologist, slices through the blubber layer on a gray whale that was beached outside Anchorage, Alaska, earlier this month. Scientists are trying to figure out why so many gray whales are dying.\r\nNat Herz/Alaska's Energy Desk\r\n… [+5338 chars]"
// };

// console.log(JSON.stringify(testObject));
// var testObjectString = JSON.stringify(testObject);

// console.log(JSON.parse(testObjectString));

module.exports = app;

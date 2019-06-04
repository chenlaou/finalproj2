var db = require("../models");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("f040e9c3149442ae93a7d68d6e99271b");

module.exports = function(app) {
  // Load index page displaying top news
  app.get("/", function(req, res) {
    newsapi.v2
      .topHeadlines({
        q: "",
        category: "",
        country: "us",
        pageSize: 100
      })
      .then(response => {
        console.log(response);
        res.render("index", {
          newsArticles: response.articles,
          newsArticlesURL: response.articles.url
        });
      });
  });

  // Load entertainment page
  app.get("/category/entertainment", function(req, res) {
    console.log(Date.now());
    newsapi.v2
      .topHeadlines({
        q: "",
        category: "entertainment",
        country: "us",
        pageSize: 100
      })
      .then(response => {
        // console.log(response);
        res.render("index", {
          newsArticles: response.articles
        });
      });
  });

  // Load sports page
  app.get("/category/sports", function(req, res) {
    console.log(Date.now());
    newsapi.v2
      .topHeadlines({
        q: "",
        category: "sports",
        country: "us",
        pageSize: 100
      })
      .then(response => {
        // console.log(response);
        res.render("index", {
          newsArticles: response.articles
        });
      });
  });

  // Load favorite page
  app.get("/category/favorites", function(req, res) {
    console.log(Date.now());
    newsapi.v2
      .topHeadlines({
        q: "",
        category: "",
        country: "us",
        pageSize: 100
      })
      .then(response => {
        // console.log(response);
        res.render("index", {
          newsArticles: response.articles
        });
      });
  });

  // Load user search page
  app.get("/:search", function(req, res) {
    console.log(Date.now());
    newsapi.v2
      .everything({
        q: req.params.search,
        // category: "",
        from: "2019-12-01",
        to: "2017-12-12",
        language: "en",
        pageSize: 100
        // country: "us"
      })
      .then(response => {
        // console.log(response);
        res.render("index", {
          newsArticles: response.articles
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

var db = require("../models");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const uuidv1 = require("uuid/v1");
var passport = require("passport");

module.exports = function(app) {
  // Get all users

  app.post("/api/login", passport.authenticate("basic"), function(req, res) {
    console.log("login");
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  //Create a new User
  app.post("/api/users/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      user_id: req.body.user_id,
      user_password: req.body.user_password
    })
      .then(function() {
        // const msg = {
        //   to: dbUser.email,
        //   from: 'twood06@gmail.com',
        //   subject: 'THIS IS SO MUCH FUN!',
        //   text: 'ANYTHING YOU CAN DO I CAN DO BETTER!',
        //   html: '<strong>I AM BETTER</strong>',
        // };
        // sgMail.send(msg);
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  app.post("/api/users/login", function(req, res) {
    db.User.findAll({
      where: {
        user_id: req.body.user_id,
        user_password: req.body.user_password
      }
    }).then(function(dbUser) {
      var uuid = uuidv1();
      console.log(dbUser);
      if (!dbUser.length) {
        res.send({ error: "This is not a valid user." });
      } else {
        res.send(uuid);
      }
    });
  });

  // Delete an example by id
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/users", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //save favorited article
  app.post("/api/savedarticles", function(req, res) {
    db.Article.create(req.body).then(function(dbArticle) {
      res.json(dbArticle);
    });
  });

  app.get("/api/savedarticles", function(req, res) {
    db.User.findAll({}).then(function(dbArticle) {
      res.json(dbArticle);
    });
  });
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
};

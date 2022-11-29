"use strict";

// require express rate limit
const rateLimit = require("express-rate-limit");

// applying rate limit of 1 hour
const limit = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes minutes
  max: 50, // limit each 'from' field to 50 requests per windowMs
  statusCode: 429,
  message:
    "Too many requests created from this 'from' field, please try again in an hour",
  headers: true,
});

// create App function
module.exports = function (app) {
  var SMSList = require("../controllers/todoController");

  // SMS Routes

  // inbound request endpoint
  app.route("/inbound/sms").post(SMSList.InboundSMS);

  // outbound request endpoint
  app.route("/outbound/sms").post(SMSList.OutboundSMS, limit);

  // wrong routes
  app
    .route("/inbound/sms")
    .get(async (req, res) => res.status(405).send({ error: "wrong route" }));
  app
    .route("/outbound/sms")
    .get(async (req, res) => res.status(405).send({ error: "wrong route" }));
  app
    .route("/inbound/sms")
    .put(async (req, res) => res.status(405).send({ error: "wrong route" }));
  app
    .route("/outbound/sms")
    .put(async (req, res) => res.status(405).send({ error: "wrong route" }));
  app
    .route("/inbound/sms")
    .delete(async (req, res) => res.status(405).send({ error: "wrong route" }));
  app
    .route("/outbound/sms")
    .delete(async (req, res) => res.status(405).send({ error: "wrong route" }));

  // default response
  app.use(SMSList.defaultResponse);
};

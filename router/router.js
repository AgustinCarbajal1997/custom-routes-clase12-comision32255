const { Router } = require("express");
const jwt = require("jsonwebtoken");

class Route {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.genarateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.genarateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callbacks) => async (...params) => {
      try {
        await callbacks.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error);
      }
    });
  }

  genarateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: 200, payload });
    res.sendServerError = (error) => res.send({ status: 500, error });
    res.sendUserError = (error) => res.send({ status: 400, error });
    next();
  };

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next(); // cualquiera puede ingresar
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res
        .status(401)
        .send({ status: "error", error: "No estas autorizado" });
    }
    const token = authHeaders.split(" ")[1]; // removemos el bearer, queda solo el token
    let user = jwt.verify(token, "secreto");
    if (!policies.includes(user.role.toUpperCase())) {
      return res.status(403).send({ error: "Forbidden" });
    }
    req.user = user;
    next();
  };
}

module.exports = Route;

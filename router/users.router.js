const Route = require("./router");
const jwt = require("jsonwebtoken");
const mockusers = require("../mockdata/index");
class UserRouter extends Route {
  init() {
    this.post("/login", ["PUBLIC"], (req, res) => {
      if (!mockusers[req.body.email]) {
        res.sendUserError({ error: "El usuario no existe en nuestra base" });
        return;
      }
      let user = {
        email: req.body.email,
        role: mockusers[req.body.email],
      };
      let token = jwt.sign(user, "secreto");
      res.sendSuccess({ token });
    });

    this.get("/admin", ["ADMIN"], (req, res) => {
      res.sendSuccess("Respuesta exitosa, sos admin");
    });

    this.get("/privateuser", ["USER"], (req, res) => {
      res.sendSuccess("Respuesta exitosa, sos user");
    });

    this.get("/", (req, res) => {
      res.sendServerError("Respuesta fallida");
    });
  }
}

module.exports = UserRouter;

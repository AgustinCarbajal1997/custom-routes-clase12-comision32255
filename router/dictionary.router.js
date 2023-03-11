const { Router } = require("express");
const router = Router();

const words = ["ferrari", "aston", "porsche"];

// router.param("word", async (req, res, next, word) => {
//   let searchWord = words.includes(word);
//   if (!searchWord) {
//     res.status(404).json({ status: "error", error: "La palabra no existe" });
//   }
//   req.word = word;
//   next();
// });

router.get(
  "/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)",
  authSession(req, res, next),
  expressValidator(req, res, next),
  async (req, res, next) => {
    res.status(200).json({ status: "success", payload: req.params.word });
  }
);

// router.get(
//   "/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)",
//   async (req, res) => {
//     res.status(200).json({ payload: req.params.word });
//   }
// );

// router.get(
//   "/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)",
//   async (req, res) => {
//     res.status(200).json({ status: "success", payload: req.params.word });
//   }
// );

router.get("*", async (req, res) => {
  res.status(404).json({
    status: "error",
    data: "La ruta no existe!!",
  });
});

module.exports = router;

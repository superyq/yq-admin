const express = require("express");
const router = express.Router();

router.get('/login', (req, res) => {
  res.render("login")
})

router.post('/login', (req, res) => {
  console.log(req.body);
  res.json({
    code: 200,
    msg: 'success',
    token: 'xxxx'
  })
})

module.exports = router;


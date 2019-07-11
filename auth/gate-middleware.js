module.exports = gate;

function gate(req, res, next) {
  const password = req.headers.password;
  if (password && password === "mellon") {
    next();
  } else {
    // res.status(401).json({ you: "Shall not pass!" });
    next(401) //will go to the next error handling middleware
  }
};

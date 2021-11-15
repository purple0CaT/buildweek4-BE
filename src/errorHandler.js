export const generalErrHandl = (err, req, res, next) => {
  if (err.status >= 400 && err.status < 500) {
    res.status(err.status).send({
      status: "error",
      message: err.message || "Error!",
    });
  } else {
    next(err);
  }
};

export const catchAllHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ status: "error", message: "Generic Server Error" });
};

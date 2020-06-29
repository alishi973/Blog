module.exports = (req, props, removeEmptyEntity = false, next) => {
  const verifiedBody = {};
  Object.keys(req.body).filter(
    (eachField) =>
      props.includes(eachField) &&
      Object.assign(verifiedBody, { [eachField]: req.body[eachField] })
  );
  req.body = verifiedBody;
  if (removeEmptyEntity) {
    for (let propName in req.body) {
      if (req.body[propName].length < 1) delete req.body[propName];
      else req.body[propName];
    }
  }

  next();
};

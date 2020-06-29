module.exports = (req, props, removeEmptyEntity = false, next) => {
  const verifiedBody = {};
  Object.keys(req.body).filter(
    (eachField) =>
      props.includes(eachField) &&
      Object.assign(verifiedBody, { [eachField]: req.body[eachField] })
  );
  req.body = verifiedBody;
  next();
};

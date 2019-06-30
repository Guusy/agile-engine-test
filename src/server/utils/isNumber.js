const numberRegex = new RegExp(/^[0-9]*$/);

module.exports = (value) => {
  const stringValue = value.toString();
  return numberRegex.test(stringValue);
};

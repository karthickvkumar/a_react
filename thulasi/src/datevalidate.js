function datevalidate(input) {
  var regex = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
  if (!regex.test(input)) {
    return false;
  }
  return true;
}
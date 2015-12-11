var EmailValidation = function(input) {
    var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailFormat.test(input) == true) {
        return false
    } else {
        return true
    }
}
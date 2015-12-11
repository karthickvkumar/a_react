var CurrencyFromatting = function(amount) {
    var symbol = "Rs."
    if (amount.search(symbol) == -1) {
        var indianFormat = /(?=.)^((([1-9][0-9]{0})*([1-9][0-9]{1})*(,[0-9]{2})*(,[0-9]{3}))|[0-9]+)?(\.[0-9]{1,2})?$/;
        if (indianFormat.test(amount) == true) {
            return false;
        } else {
            return true;
        }
    } else {
        var amount = amount.slice(3);
        var indianFormat = /(?=.)^((([1-9][0-9]{0})*([1-9][0-9]{1})*(,[0-9]{2})*(,[0-9]{3}))|[0-9]+)?(\.[0-9]{1,2})?$/;
        if (indianFormat.test(amount) == true) {
            return false;
        } else {
            return true;
        }
    }
}




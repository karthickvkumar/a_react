describe("currency validation", function() {
    it("Accepted currency formats-Rs.50,00,000.00", function() {
        expect(CurrencyFromatting("Rs.50,00,000.00")).toEqual(false);
    });
    it("Accepted currency formats without prefix-50,00,000.00", function() {
        expect(CurrencyFromatting("50,00,000.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.5,00,000.00", function() {
        expect(CurrencyFromatting("Rs.5,00,000.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.50,000.00", function() {
        expect(CurrencyFromatting("Rs.50,000.00")).toEqual(false);
    });
    it("Accepted currency formats without prefix-50,000.00", function() {
        expect(CurrencyFromatting("50,000.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.5,000.00", function() {
        expect(CurrencyFromatting("Rs.5,000.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.500.00", function() {
        expect(CurrencyFromatting("Rs.500.00")).toEqual(false);
    });
    it("Accepted currency formats without prefix-500.00", function() {
        expect(CurrencyFromatting("500.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.50.00", function() {
        expect(CurrencyFromatting("Rs.50.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.5.00", function() {
        expect(CurrencyFromatting("Rs.5.00")).toEqual(false);
    });
    it("Accepted currency formats without prefix-5.00", function() {
        expect(CurrencyFromatting("5.00")).toEqual(false);
    });
    it("Accepted currency formats-Rs.0.50", function() {
        expect(CurrencyFromatting("Rs.0.50")).toEqual(false);
    });
    it("currency not in format-1,000,000.50", function() {
        expect(CurrencyFromatting("1,000,000.50")).toEqual(true);  
     });
    it("currency not in format-Rs.00,000.50", function() { 
        expect(CurrencyFromatting("Rs.00,000.50")).toEqual(true);     
     });
    it("currency not in format-Rs.11,00.50", function() {  
        expect(CurrencyFromatting("Rs.11,00.50")).toEqual(true);  
     });
    it("currency not in format-1000,00.50", function() {
        expect(CurrencyFromatting("1000,00.50")).toEqual(true);
     });
});
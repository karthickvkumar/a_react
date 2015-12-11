describe("Number validation", function() {
    it("Accept if number is Integer", function() {
        expect(NumberValidation(1)).toEqual(false);
    });
    it("Accept if number is Decimal", function() {
        expect(NumberValidation(0.009172)).toEqual(false);
    });
    it("Accept if number is Negative", function() {
        expect(NumberValidation(-1)).toEqual(false);
    });
    it("Accept if number is Float", function() {
        expect(NumberValidation(1.05101)).toEqual(false);
    });
    it("input is String", function() {
        expect(NumberValidation("one")).toEqual(true);
    });
    it("input is Null", function() {
        expect(NumberValidation(undefined)).toEqual(true);
    });
});
describe("Total Number", function() {
    it("Sum is equal to Total", function() {
        expect(TotalValue(6)).toEqual(false);
    });
    it("Sum is not equal to Total", function() {
        expect(TotalValue(0)).toEqual(true);
    });
});
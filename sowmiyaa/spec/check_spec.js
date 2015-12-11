describe("Validation with if required", function(){
	it("should checked", function(){
		expect(check(true,"hai")).toEqual(true);
		expect(check(false," ")).toEqual(false);
	});
});

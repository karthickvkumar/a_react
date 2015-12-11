describe("validations", function(){
	it("should return", function(){
		expect(required("")).toEqual(true);
		expect(required(57677)).toEqual(false);
		expect(required("dora")).toEqual(false);
	});
});

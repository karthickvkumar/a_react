describe("Minimum",function(){
	it("should return the required value",function(){
		expect(minimum(20,25)).toEqual(false);
	});
	it("should return the correct value ",function(){
		expect(minimum(70,25)).toEqual(true);
	});
});
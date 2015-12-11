describe("Maximum",function(){
	it("should return the required value",function(){
		expect(minimum(20000, 50000)).toEqual(false);
	});
	it("should return the correct value ",function(){
		expect(minimum(70000,50000)).toEqual(true);
	});
});
describe("Format date",function(){
	it("should return the  formatted date",function(){
		expect(date('1994/12/03')).toEqual("03-12-1994");
	});
});
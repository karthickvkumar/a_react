describe("Date Validation",function(){
	it("should return the valid date",function(){
		expect(datevalidate('13-03-1994')).toEqual(true);
	});
	it("should return the invalid date",function(){
		expect(datevalidate('13/03/1994')).toEqual(false);
	});
});
describe("DateRange", function(){
	it("should be greater", function(){
		expect(daterange(new Date("2016-11-13"),new Date("2015-09-06"))).toEqual(false);
		expect(daterange(new Date("2015-09-30"),new Date("2017-12-06"))).toEqual(true);
	});
});

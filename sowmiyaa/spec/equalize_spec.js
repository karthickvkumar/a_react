describe("Equalizations", function(){
	it("should be equal", function(){
		expect(equalize("7637","font")).toEqual(true);
		expect(equalize("dora","dora")).toEqual(false);
	});
});

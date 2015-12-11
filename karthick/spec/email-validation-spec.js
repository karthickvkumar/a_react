describe("Email validation", function() {
    it("Accepted email format-karthick@live.in", function() {
        expect(EmailValidation("karthick@live.in")).toEqual(false);
    });
    it("Accepted email format-k@g.i", function() {
        expect(EmailValidation("k@g.i")).toEqual(false);
    });
    it("Accepted email format-k#$%*kumar@gm#!.org", function() {
        expect(EmailValidation("k#$%*kumar@gm#!.org")).toEqual(false);
    });
    it("Accepted email format-#!$%&'*+-/=?^_`{}|~@example.org", function() {
        expect(EmailValidation("#!$%&'*+-/=?^_`{}|~@example.org")).toEqual(false);
    });
    it("Accepted email format-kumar@atomic.in", function() {
        expect(EmailValidation("kumar@atomic.in")).toEqual(false);
    });
    it("email not in format-k@kumar@gmail.com", function() {
        expect(EmailValidation("k@kumar@gmail.com")).toEqual(true);
    });
    it("email not in format-karthick.gmail.com", function() {
        expect(EmailValidation("karthick.gmail.com")).toEqual(true);
    });
});
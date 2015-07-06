
var BankAccount = require("../app/bank_account");

beforeEach(function () {
    this.addMatchers({
        toBeNonNegative: function() {
            if (this.actual == undefined)
                return false;
            console.log(this.actual);
            return ( this.actual >= 0);
        }

    });
});

// FIX-ME: replace all new BankAccount()  with  factory

describe("BankAccount", function(){

    it("exists", function(){
        expect(BankAccount).toBeDefined();
    });

    var bankAccount  = new BankAccount({accountId: 'abc', balance: 1000, locked: false});

    it("should contain a accountId", function () {
        expect(bankAccount.accountId()).toEqual('abc');
    });

    it("should contain a balance",function(){

        expect(bankAccount.balance()).toEqual(1000);
    });

    it("should not be locked",function(){
        expect(bankAccount.locked()).toEqual(false);
    });


});

describe("Bank Account defaulting behavior when properties not provided", function () {
    var bankAccount = new BankAccount({accountId: 'abc'});

    it("balance should default to zero, when not provided", function () {
        expect(bankAccount.balance()).toBeNonNegative();
    });
    it("locked flag should default to false, when not provided",function(){
        expect(bankAccount.locked()).toEqual(false);
    });



});

describe("Bank Account behavior when invalid properties provided", function () {
    var bankAccount;

    it("should throw an exception if account id is not provided", function () {
        expect(function () {
            bankAccount =   new BankAccount({});
        }).toThrow();
    });
    it("should throw an exception if balance provided is negative", function () {
        expect(function() {
            bankAccount = new BankAccount({
                accountId: 'abc',
                balance: -1
            });
        }).toThrow();
    });
    it("should throw an exception if balance provided is not a number", function () {
        expect(function() {
            bankAccount = new BankAccount({
                accountId: 'abc',
                balance: 'bar'
            });
        }).toThrow();
    });
    it("should throw an exception if locked value provided is not true/false", function () {
        expect(function() {
            bankAccount = new BankAccount({
                accountId: 'abc',
                locked: 'foo'
            });
        }).toThrow();
    });

});

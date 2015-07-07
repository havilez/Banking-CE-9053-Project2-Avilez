
var BankAccount = require("../app/bank_account");
var BankAccountFactory = require("../app/bank_account").BankAccountFactory;

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



describe("BankAccount", function(){

    it("exists", function(){
        expect(BankAccount).toBeDefined();
    });

    var bankAccount  = BankAccountFactory.create({accountId: 'abc', balance: 1000, locked: false});

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
    var bankAccount = BankAccountFactory.create({accountId: 'abc'});

    it("balance should default to zero, when not provided", function () {
        expect(bankAccount.balance()).toBeNonNegative();
    });
    it("locked flag should default to false, when not provided",function(){
        expect(bankAccount.locked()).toEqual(false);
    });



});

describe("Bank Account behavior when creating an account with invalid properties", function () {
    var bankAccount;

    it("should throw an exception if account id is not provided", function () {
        expect(function () {
            bankAccount =   BankAccountFactory.create({});
        }).toThrow();
    });
    it("should throw an exception if balance provided is negative", function () {
        expect(function() {
            bankAccount = BankAccountFactory.create({
                accountId: 'abc',
                balance: -1
            });
        }).toThrow();
    });
    it("should throw an exception if balance provided is not a number", function () {
        expect(function() {
            bankAccount = BankAccountFactory.create({
                accountId: 'abc',
                balance: 'bar'
            });
        }).toThrow();
    });
    it("should throw an exception if locked value provided is not true/false", function () {
        expect(function() {
            bankAccount = BankAccountFactory.create({
                accountId: 'abc',
                locked: 'foo'
            });
        }).toThrow();
    });

});


describe("When depositing into Bank Account", function () {
    var account = BankAccountFactory.create({ accountId: 'abc'});

    it("should have a balance equal to what was initially deposited ",function(){
        account.deposit(1000);
        expect(account.balance()).toEqual(1000);
    });
    it("should throw an exception when value deposited is not a number", function () {
        expect(function () {
            account.deposit('z');
        }).toThrow();
    });
    it("should throw an exception when an amount of zero is deposited", function () {
        expect(function () {
            account.deposit(0);
        }).toThrow();
    });
    it("should throw an excepton when depositing into a locked account", function () {
        expect(function () {
            account._locked = true;
            account.deposit(1000);
        }).toThrow();
    });

});

describe("When withdrawing from Bank Account ", function () {
    var account = BankAccountFactory.create({ accountId: 'abc', balance: 500});

    it("should throw an exception when value withdrawn in not a number", function () {
        expect(function () {
            account.withdraw('z');
        }).toThrow();
    });
    it("should throw an exception when value withdrawn is zero or less", function () {
        expect(function () {
            account.withdraw(-1);
        }).toThrow();
    });
    it("should result in $1 charge when balance falls below $1000", function () {
        var initialBalance = account.balance();
        account.withdraw(10);
        expect(account.balance()).toEqual(initialBalance-10-1);
    });
    it("should be no penalty charge when withdrawing an amount and balance stays above $1000", function () {
        account._balance = 5000;
        var initialBalance = account.balance();
        account.withdraw(100);
        expect(account.balance()).toEqual(initialBalance-100);
    });
    it("should throw an exception when attempting to withdraw from a locked account", function () {
        expect(function () {
            account._locked = true;
            account.withdraw(1000);
        }).toThrow();

    });
    it("should throw an exception when withdrawal would result in a negative balance", function () {
        expect(function () {
            account._locked = false;
            account._balance = 1;
            account.withdraw(1);
        }).toThrow();

    });



});
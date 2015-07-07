var WITHDRAWAL_PENALTY = 1;

var _ = require('lodash');

function BankAccount( parms )
{
    // check for invalid bank account parameters
    if ( parms.balance < 0 ) throw " initial balance cannot be negative";
    else if (!parms.accountId) throw "no valid account id";
    else if (( typeof parms.locked  != 'undefined')  && (typeof parms.locked != 'boolean')) throw "invalid value for locked parameter";
    else if (( typeof parms.balance != 'undefined') && (typeof parms.balance != 'number')) throw "balance must be number";

    // default bank account properties when not provided
    this._balance = (!parms.balance) ? 0 : parms.balance;
    this._locked = ( !parms.locked ) ? false : true;

    this._accountId = parms.accountId;



};

BankAccount.prototype.accountId = function() {
    return this._accountId;
};

BankAccount.prototype.balance = function() {
    return this._balance;
};

BankAccount.prototype.locked = function() {
    return this._locked;
};


BankAccount.prototype.projectedWithdrawalBalance = function(amount)
{
    var projecedBalance  = this._balance - amount;
    return  (projecedBalance < 1000) ? projecedBalance - WITHDRAWAL_PENALTY : projecedBalance;

};

BankAccount.prototype.deposit = function( amount )
{
    // validate input
    if (this._locked) throw "cannot deposit into a locked account";
    else if (typeof amount != 'number') throw "deposit amount must be number";
    else if (amount <= 0 ) throw "deposit amount must be greater than zero";

    this._balance+= amount;
    console.log(this._balance);
};

BankAccount.prototype.withdraw = function( amount )
{
    // validate input
    if (this._locked) throw "cannot withdraw from a locked account";
    else if (typeof amount != 'number') throw "withdrawal amount must be number";
    else if ( amount < 0 ) throw "withdrawal amount cannot be zero or negative";
    else {

        var projected_balance = this.projectedWithdrawalBalance(amount)

        if ( projected_balance < 0 ) throw "withdrawal cannot result in a negative balance";
    }

    this._balance -= amount;

    this._balance = projected_balance;

    console.log(this._balance);
};





module.exports = BankAccount;


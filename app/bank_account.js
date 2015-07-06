

var _ = require('lodash');

function BankAccount( parms )
{
    // check for invalid bank account parameters
    if ( parms.balance < 0 ) throw " initial balance cannot be negative";

    if (!parms.accountId) throw "no valid account id";

    if (( typeof parms.locked  != 'undefined')  && (typeof parms.locked != 'boolean')) throw "invalid value for locked parameter";

    if (( typeof parms.balance != 'undefined') && (typeof parms.balance != 'number')) throw "balance must be number";

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








module.exports = BankAccount;


# Bank Account Assignment

Create a project which allows the following functionality. Test your functionality with jasmine tests. Use jasmine-node create a module for your BankAccount object.

I am going to do the following when I run your project:

* I am going to fork your project
* I am going to run npm install
* I am going to run npm test - this will run the jasmine-node test commands
* I will make edits and push the changes up to forked repository

You can clone this project and send me the link to the repo, or you can just create your own project. Call your project CE-9053-Banking-[your last name].


## BankAccount Creation 

* accountId - must be specified
* balance - defaults to zero - if specified must be a number greater than or equal to 0
* locked - defaults to false - if specified must be true or false

### Notes

You should be able to construct a BankAccount with a configuration object can pass all three of the properties mentioned above:

example:

```
var bankAccount = new BankAccount({
  accountId: ‘abc’,
  balance: 1000,
  locked: false
 });

or 

bankAccount = new BankAccount({
  accountId: ‘abc'
});
console.log(bankAccount.balance);//should print 0 
console.log(bankAccount.locked);//should print false 


bankAccount = new BankAccount({
});//should throw an exception

bankAccount = new BankAccount({
    accountId: 'abc',
    balance: -1
});//should throw an exception

bankAccount = new BankAccount({
    accountId: 'abc',
    balance: 'bar' 
});//should throw an exception

bankAccount = new BankAccount({
    accountId: 'abc',
    locked: 'foo'
});//should throw an exception
```
If you attempt to create a bankAccount with a negative balance, then an exception should be thrown.

## account.deposit(amount)

```
var account = new BankAccount({ id: 'abc'});
account.deposit(1000);//no exception
account.deposit('z');//exception
account.deposit(0);//exception
account.locked = true;
account.deposit(1000);//exception
```
### notes

* making a deposit doesn’t return any value
* an exception if the deposit is 0 or less— or if the value passed is not a number.
* attempting to deposit in a locked account throws an exception

## account.withdraw(amount)
```
var account = new BankAccount({ id: 'abc', balance: 500});
account.withdraw(10);//no exception
console.log(account.balance);// should print out 489
account.balance = 5000;
account.withdraw(10);//no exception
console.log(account.balance);// should print out 4900 
account.withdraw('z');//exception
account.deposit(0);//exception
account.locked = true;
account.withdraw(1000);//exception
account.locked = false;
account.balance = 1;
account.withdraw(1);//should throw an exception
```

### notes

* making a withdrawal doesn’t return any value
* an exception if the withdrawal is 0 or less— or is not a number.
* also making a withdrawal that will result in negative balance should also throw an exception
* If the user’s account balance falls below $1000, then all withdrawals should also result in a charge of $1. We need to take this into account when making a withdrawal so that if an account has a balance of $1, and a withdrawal of $1 was attempted, then we should throw an exception because that would result in a negative balance.
* attempting to widthdraw from a locked account should throw an exception

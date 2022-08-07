import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Expenses from './components/Expenses'
import Income from './components/Income'
import Accounts from './components/Accounts'
import NotFound from './components/NotFound'
import { outlay } from './components/data'
import { profit } from './components/data'
import { exp } from './components/exp'
import { inc } from './components/inc'

export default class App extends Component {
  state = {
    accounts: [
      {id: 1, name: 'Налик', amount: 208150},
      {id: 2, name: 'Сбербанк', amount: 69710},
      {id: 3, name: 'Альфа Банк', amount: 46300},
      {id: 4, name: 'Конверт 10%', amount: 100000},
    ],
    expense: exp,
    income: inc,
    result: '',
    expenseCategories: outlay,
    incomeCategories: profit,
    activeAccount: '',
    activeExpense: '',
    activeIncome: '',
    name: '',
    amount: 0,
    nameError: '',
    amountError: '',
    currCategory: '',
    currImg: '',
    spent: 0,
    resultAmount: 0,
    accountName: '',
    value: 0,
    newValue: 0,
    currentAccount: '',
    accountId: 0,
    newAccountName: '',
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.setState({
        ...JSON.parse(localStorage.getItem('state'))
      })
    }
  }

  totalSum = () => {
    let sum = this.state.accounts.reduce((sum, curr) => sum + +curr.amount, 0)
    const numberWithSpaces = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return numberWithSpaces(sum)
  }

  onClick = (button) => {
    if (button === '=') {
      this.calculate()
    } else if (button === 'X') {
      this.reset()
    } else if (button === '⌫') {
      this.backspace()
    } else {
      this.setState({
        result: this.state.result + button
      })
    }
  }

  calculate = () => {
    let checkResult = ''
    if (this.state.result.includes('--')) {
      checkResult = this.state.result.replace('--', '+')
    } else {
      checkResult = this.state.result
    }

    function calcMe(str) {
      const noWsStr = str.replace(/\s/g, '');
      const operators = noWsStr.replace(/[\d.,]/g, '').split('');
      const operands = noWsStr.replace(/[+/%*-]/g, ' ')
                              .replace(/\\,/g, '.')
                              .split(' ')
                              .map(parseFloat)
                              .filter(it => it);
    
      if (operators.length >= operands.length){
        throw new Error('Operators qty must be lesser than operands qty')
      };
    
      while (operators.includes('*')) {
        let opIndex = operators.indexOf('*');
        operands.splice(opIndex, 2, operands[opIndex] * operands[opIndex + 1]);
        operators.splice(opIndex, 1);
      };
      while (operators.includes('/')) {
        let opIndex = operators.indexOf('/');
        operands.splice(opIndex, 2, operands[opIndex] / operands[opIndex + 1]);
        operators.splice(opIndex, 1);
      };
      while (operators.includes('%')) {
        let opIndex = operators.indexOf('%');
        operands.splice(opIndex, 2, operands[opIndex] % operands[opIndex + 1]);
        operators.splice(opIndex, 1);
      };
    
      let result = operands[0];
      for (let i = 0; i < operators.length; i++) {
        operators[i] === '+' ? (result += operands[i + 1]) : (result -= operands[i + 1])
      }
      return result
    }

    try {
      this.setState({
        result: (calcMe(checkResult) || '') + ''
      })
    } catch (e) {
      this.setState({
        result: 'error'
      })
    }
  }

  reset = () => {
    this.setState({
      result: ''
    })
  }

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    })
  }

  deleteAccount = (id) => {
    const accounts = this.state.accounts.filter(item => item.id !== id)
    this.setState({
      accounts
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  addAccount = () => {
    const isValid = this.validate()

    if (isValid) {
      const accounts = [...this.state.accounts]

      const account = {
        id: this.state.accounts.length ? this.state.accounts.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 1,
        name: this.state.name,
        amount: +this.state.amount,
      }

      accounts.push(account)

      this.setState({
        accounts,
        name: '',
        amount: '',
        nameError: '',
        amountError: '',
      }, () => localStorage.setItem('state', JSON.stringify(this.state)))
    }
  }

  validate = () => {
    let nameError = ''
    let amountError = ''

    if (!this.state.name) {
      nameError = "Account's cannot be blank"
    }

    if (this.state.amount === '') {
      amountError = 'Amount is empty'
    }

    if (nameError || amountError) {
      this.setState({ nameError, amountError })
      return false
    }

    return true
  }

  addAccountName = (e) => {
    this.setState({name: e.target.value})
  }

  addAmount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }

  handleClick = (e) => {
    this.setState({
      activeAccount: e.target.id,
      accountName: e.target.attributes.getNamedItem('data-acc').value,
      sum: e.target.value,
    })
  }

  addExpenseHistory = () => {
    const expense = [...this.state.expense]

    const exp = {
      id: this.state.expense.length ? this.state.expense.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 0,
      category: this.state.currCategory,
      account: this.state.accountName,
      accountId: +this.state.activeAccount,
      spent: +this.state.result,
      img: this.state.currImg,
      date: new Date().getDate() + '.' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '.',
      time: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
    }

    expense.push(exp)

    this.setState({
      expense,
      result: '',
      activeAccount: '',
      accountName: '',
      currCategory: '',
      currImg: '',
      resultAmount: 0,
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  addExpense = () => {
    this.setState({
      accounts: Array.from(this.state.accounts, account => {
        if(account.id === +this.state.activeAccount)
        return {...account, amount: this.state.resultAmount}
        return account
      }),
    }, () => this.addExpenseHistory())
  }

  chooseExpenseCategory = (e) => { 
    let diff = this.state.sum - this.state.result
    if (this.state.activeAccount !== '') {
      this.setState({
        currCategory: e.currentTarget.getAttribute('name'),
        currImg: e.target.getAttribute('data-img'),
        resultAmount: diff,
        sum: 0,
      }, () => this.addExpense()) 
    } else {
      alert('Choose an account!')
    }
  }

  addIncomeHistory = () => {
    const income = [...this.state.income]

    const inc = {
      id: this.state.income.length ? this.state.income.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 0,
      category: this.state.currCategory,
      account: this.state.accountName,
      accountId: +this.state.activeAccount,
      earned: +this.state.result,
      img: this.state.currImg,
      date: new Date().getDate() + '.' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '.',
      time: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
    }

    income.push(inc)

    this.setState({
      income,
      result: '',
      activeAccount: '',
      accountName: '',
      currCategory: '',
      currImg: '',
      resultAmount: 0,
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  addIncome = () => {
    this.setState({
      accounts: Array.from(this.state.accounts, account => {
        if(account.id === +this.state.activeAccount)
        return {...account, amount: this.state.resultAmount}
        return account
      }),
    }, () => this.addIncomeHistory())
  }

  chooseIncomeCategory = (e) => { 
    let diff = this.state.sum + Number(this.state.result)
    if (this.state.activeAccount !== '') {
      this.setState({
        currCategory: e.currentTarget.getAttribute('name'),
        currImg: e.target.getAttribute('data-img'),
        resultAmount: diff,
        sum: 0,
      }, () => this.addIncome()) 
    } else {
      alert('Choose an account!')
    }
  }

  showExpenseEdit = (e) => {
    const value = e.currentTarget.id
    const valueSum = +e.currentTarget.attributes.getNamedItem('value').value
    const currentAccount = e.currentTarget.attributes.getNamedItem('data-acc').value
    const index = this.state.accounts.find(item => item.name === currentAccount)
    const newValue = index.amount + valueSum
    this.setState({
      activeExpense: value,
      activeIncome: '',
      accountName: index.name,
      currentAccount: index.id,
      newValue,
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  resetValues = () => {
    this.setState({
      activeExpense: '',
      activeIncome: '',
      accountName: '',
      currentAccount: '',
      newValue: 0,
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  deleteExpense = (id) => {
    const expense = this.state.expense.filter(item => item.id !== id)

    this.setState({
      expense,
      accounts: Array.from(this.state.accounts, account => {
        if (account.id === this.state.currentAccount)
        return {...account, amount: this.state.newValue}
        return account
      }),
    }, () => {
        localStorage.setItem('state', JSON.stringify(this.state));
        this.resetValues();
      }
    )
  }

  showIncomeEdit = (e) => {
    const value = e.currentTarget.id
    const valueSum = +e.currentTarget.attributes.getNamedItem('value').value
    const currentAccount = e.currentTarget.attributes.getNamedItem('data-acc').value
    const index = this.state.accounts.find(item => item.name === currentAccount)
    const newValue = index.amount - valueSum
    this.setState({
      activeIncome: value,
      activeExpense: '',
      accountName: index.name,
      currentAccount: index.id,
      newValue,
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  deleteIncome = (id) => {
    const income = this.state.income.filter(item => item.id !== id)

    this.setState({
      income,
      accounts: Array.from(this.state.accounts, account => {
        if (account.id === this.state.currentAccount)
        return {...account, amount: this.state.newValue}
        return account
      }),
    }, () => {
        localStorage.setItem('state', JSON.stringify(this.state));
        this.resetValues();
      }
    )
  }

  render() {
    return (
      <BrowserRouter>
        <div className='wrapper'>
          <h1>Money Ok</h1>

          <Switch>
            <Route exact path='/' render = { () => <Expenses 
              accounts={this.state.accounts}
              expenseCategories={this.state.expenseCategories}
              onClick={this.onClick}
              handleClick={this.handleClick}
              activeAccount={this.state.activeAccount}
              result={this.state.result}
              chooseExpenseCategory={this.chooseExpenseCategory}
              expense={this.state.expense}
              showExpenseEdit={this.showExpenseEdit}
              deleteExpense={this.deleteExpense}
              activeExpense={this.state.activeExpense}
            /> } />
            <Route path='/income' render = { () => <Income 
              accounts={this.state.accounts}
              incomeCategories={this.state.incomeCategories}
              onClick={this.onClick}
              handleClick={this.handleClick}
              activeAccount={this.state.activeAccount}
              result={this.state.result}
              chooseIncomeCategory={this.chooseIncomeCategory}
              income={this.state.income}
              showIncomeEdit={this.showIncomeEdit}
              deleteIncome={this.deleteIncome}
              activeIncome={this.state.activeIncome}
            /> } />
            <Route path='/accounts' render = { () => <Accounts 
              accounts={this.state.accounts} 
              totalSum={this.totalSum()}
              deleteAccount={this.deleteAccount}
              addAccount={this.addAccount}
              addAccountName={this.addAccountName}
              addAmount={this.addAmount}
              name={this.state.name}
              amount={this.state.amount}
              nameError={this.state.nameError}
              amountError={this.state.amountError}
            /> } />
            <Route component={NotFound} />
          </Switch>

          <ul className='list'>
            <li><NavLink exact className='list__item' to='/'><img src='rabbit.png' alt='rabbit' />Expenses</NavLink></li>
            <li><NavLink className='list__item' to='/income'><img src='pig.png' alt='pig' />Income</NavLink></li>
            <li><NavLink className='list__item' to='/accounts'><img src='cards.png' alt='cards' />Accounts</NavLink></li>
          </ul>
        </div>
      </BrowserRouter>
    )
  }
}
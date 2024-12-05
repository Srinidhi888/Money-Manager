import './index.css'

import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyList: [],
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].displayText,
  }

  onAddHistory = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.displayText === typeInput,
    )
    const {displayText} = typeOption
    const newHistory = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].displayText,
    }))
  }

  onDelete = id => {
    const {historyList} = this.state
    const updatedList = historyList.filter(each => each.id !== id)
    this.setState({historyList: updatedList})
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onType = event => {
    this.setState({typeInput: event.target.value})
  }

  getBalance = () => {
    const {historyList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expensesAmount += each.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0

    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expensesAmount = 0

    historyList.forEach(each => {
      if (each.type !== transactionTypeOptions[0].displayText) {
        expensesAmount += each.amount
      }
    })

    return expensesAmount
  }

  render() {
    const {historyList, titleInput, amountInput, typeInput} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return (
      <div className="total-bg">
        <div className="card-1">
          <h1 className="head-name">Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="name-spcl"> Money Manager </span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="card-6">
          <div className="card-3">
            <form className="card-4" onSubmit={this.onAddHistory}>
              <h1 className="head-form">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                onChange={this.onTitle}
                value={titleInput}
                placeholder="TITLE"
                type="text"
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                onChange={this.onAmount}
                value={amountInput}
                placeholder="AMOUNT"
                type="text"
              />
              <label htmlFor="type-1">TYPE</label>
              <select id="type-1" onChange={this.onType} value={typeInput}>
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="card-7">
            <h1 className="head-form">History</h1>
            <div className="card-5">
              <div className="card-8">
                <p className="space">Title</p>
                <p className="space">Amount</p>
                <p className="space">Type</p>
              </div>
              <ul className="list">
                {historyList.map(each => (
                  <TransactionItem
                    key={each.id}
                    details={each}
                    onDelete={this.onDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

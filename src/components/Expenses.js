import React from 'react'
import Calculator from './Calculator'
import ExpenseList from './ExpenseList'

const Expenses = ({ accounts, expenseCategories, onClick, result, handleClick, activeAccount, chooseExpenseCategory, expense, activeExpense, showExpenseEdit, deleteExpense }) => {
    
    return (
        <div className='container'>

            <div className='header'>
                <h2>Expenses</h2>
            </div>

            <ul className='accounts'>
                {accounts.map((account) => (
                        <li key={account.id} id={account.id} 
                            onClick={handleClick}
                            className={ +activeAccount === account.id ? 'account__item yellow' : 'account__item' }
                            value={account.amount}
                            data-acc={account.name}
                        >
                            {account.name}<br/>
                            {account.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽
                        </li>
                    )
                )}
            </ul>

            <Calculator onClick={onClick} result={result} />

            {result !== ''
                ? (<ul className='categories'>
                    {expenseCategories.map(category => {
                        return (
                            <li className='category__item' key={category.id} id={category.id} name={category.name} onClick={chooseExpenseCategory} >
                                <img src={category.img} alt={category.name} data-img={category.img} />
                                {category.name}
                            </li>
                        )
                    })}
                </ul>)
                : null
            }

            <ExpenseList expense={expense} activeExpense={activeExpense} showExpenseEdit={showExpenseEdit} deleteExpense={deleteExpense} />
            
        </div>
    )
}

export default Expenses
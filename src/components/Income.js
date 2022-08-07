import React from 'react'
import Calculator from './Calculator'
import IncomeList from './IncomeList';

const Income = ({ accounts, onClick, result, incomeCategories, handleClick, showIncomeEdit, activeAccount, activeIncome, deleteIncome, chooseIncomeCategory, income }) => {

    return (
        <div className='container'>

            <header className='header'>
                <h2>Income</h2>
            </header>

            <ul className='accounts'>
                {accounts.map((account) => {
                    return (
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
                })}
            </ul>

            <Calculator onClick={onClick} result={result} />

            {result !== ''
                ? (
                <ul className='categories'>
                    {incomeCategories.map(category => {
                        return (
                            <li className='category__item' key={category.id} id={category.id} name={category.name} onClick={chooseIncomeCategory} >
                                <img src={category.img} alt={category.name} data-img={category.img} />
                                {category.name}
                            </li>
                        )
                    })}
                </ul>
                ) : null
            }

            <IncomeList income={income} showIncomeEdit={showIncomeEdit} activeIncome={activeIncome} deleteIncome={deleteIncome} />
            
        </div>
    )
}

export default Income
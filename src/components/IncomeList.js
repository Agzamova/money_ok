import React from 'react'

const IncomeList = ({ income, showIncomeEdit, activeIncome, deleteIncome }) => {
    return (
        <ul className='transactions'>
            {income.slice(0).reverse().map((inc) => {
                return (
                    <li key={inc.id}
                        id={inc.id} 
                        onClick={showIncomeEdit}
                        className={ activeIncome !== '' && +activeIncome === inc.id ? 'transaction edit' : 'transaction' }
                        value={inc.earned}
                        data-acc={inc.account}
                    >
                        <img className='transaction__img' src={inc.img} alt={inc.category}/>
                        <div className='transaction__property'>
                            <div className='transaction__property--sum transaction__sum'>
                                <p className='transaction__sum--cat'>{inc.account}</p>
                                <p className='transaction__sum--amount'>{inc.earned}</p>
                            </div>
                            <div className='transaction__property--time'>
                                <p>{inc.category}</p>
                                <p>{inc.date} {inc.time}</p>
                            </div>
                        </div>
                        { activeIncome !== '' && +activeIncome === inc.id
                            ? (<div className='transaction__btns'>
                                <button className='transaction__btns--del' onClick={() => deleteIncome(inc.id)}>&#10006;</button>
                            </div>)
                            : null
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default IncomeList
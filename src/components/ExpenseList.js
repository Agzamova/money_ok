import React from 'react'

const ExpenseList = ({ expense, showExpenseEdit, deleteExpense, activeExpense }) => {
    return (
        <ul className='transactions'>
            {expense.slice(0).reverse().map((exp) => {
                return (
                    <li key={exp.id} 
                        id={exp.id} 
                        onClick={showExpenseEdit}
                        className={ activeExpense !== '' && +activeExpense === exp.id ? 'transaction edit' : 'transaction' }
                        value={exp.spent}
                        data-acc={exp.account}
                    >
                        <img className='transaction__img' alt={exp.category} src={exp.img}/>
                        <div className='transaction__property'>
                            <div className='transaction__property--sum transaction__sum'>
                                <p className='transaction__sum--cat'>{exp.account}</p>
                                <p className='transaction__sum--amount'>{exp.spent}</p>
                            </div>
                            <div className='transaction__property--time'>
                                <p>{exp.category}</p>
                                <p>{exp.date} {exp.time}</p>
                            </div>
                        </div>
                        {activeExpense !== '' && +activeExpense === exp.id
                            ? 
                            (<div className='transaction__btns'>
                                <button className='transaction__btns--del' onClick={() => deleteExpense(exp.id)}>&#10006;</button>
                            </div>)
                            : null
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default ExpenseList
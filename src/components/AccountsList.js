import React from 'react'

const AccountsList = ({ accounts, deleteAccount }) => {
    return (
        <ul className='accounts__list'>
            {accounts.map((account) => (
                <li key={account.id} id={account.id} 
                    className='accounts__item'
                    data-acc={account.name}>
                        {account.name}
                            <span>{account.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽
                                <button onClick={() => deleteAccount(account.id)}>&#10006;</button>
                            </span>
                </li>
            ))}
        </ul>
    )
}

export default AccountsList


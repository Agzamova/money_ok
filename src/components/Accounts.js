import React from 'react'
import AccountsList from './AccountsList'

const Accounts = ({ accounts, totalSum, deleteAccount, name, amount, addAccount, addAccountName, addAmount, nameError, amountError }) => {

    return (
        <div className='container'>
            <div className='header'>
                <h2>Accounts</h2>
            </div>

            <AccountsList accounts={accounts} deleteAccount={deleteAccount} />

            <div className='total-sum'>
                <p className='total'>Total </p>
                <span className='sum'>{totalSum} ₽</span>
            </div>

            <form className='form'>
                <fieldset className='form__field'>
                    <legend className='form__title'>Add a new account</legend>
                    <div className='form__inputs'>
                        <input 
                            className='form__input'
                            type='text' 
                            name='name'
                            placeholder="Account's name"
                            required='required'
                            onChange={addAccountName}
                            value={name}
                        />
                        <div style={{color: 'red'}}>{nameError}</div>
                    </div>
                    <div className='form__inputs'>
                        <input
                            className='form__input'
                            type='number'
                            name='amount'
                            placeholder='Enter amount'
                            required='required'
                            onChange={addAmount}
                            value={amount}
                        />
                        <div style={{color: 'red'}}>{amountError}</div>
                    </div>
                    
                    <button 
                        className='form__btn'
                        type='button' 
                        onClick={() => addAccount()}
                    >Add
                    </button>
                </fieldset> 
            </form>

        </div>
    )
}

export default Accounts
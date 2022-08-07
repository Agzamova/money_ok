import React from 'react'

const Calculator = ({ result, onClick }) => {
    return ( 
        <div className='calc'>
            <div className='field'>
                {result !== ''
                    ? (result.match(/[0-9]\+[0-9]/) || result.match(/[0-9]-[0-9]/) || result.match(/[0-9]\*[0-9]/) || result.match(/[0-9]\/[0-9]/)
                        ? (<div className='result'><p className='result__field'>{result}</p><button className='btn__hidden' name='=' onClick={e => onClick(e.target.name)}>=</button></div>)
                        : (<div className='result'><p className='result__field'>{result}</p><button className='btn__hidden' name='X' onClick={e => onClick(e.target.name)}>X</button></div>)
                    )
                    : <p className='result__field--empty'>Enter amount</p>
                }
            </div>
            <div className='row'>
                <button className='btn__dark' name='+' onClick={e => onClick(e.target.name)}>+</button>
                <button className='btn__light' name='1' onClick={e => onClick(e.target.name)}>1</button>
                <button className='btn__light' name='2' onClick={e => onClick(e.target.name)}>2</button>
                <button className='btn__light' name='3' onClick={e => onClick(e.target.name)}>3</button>
            </div>
            <div className='row'>
                <button className='btn__dark' name='-' onClick={e => onClick(e.target.name)}>-</button>
                <button className='btn__light' name='4' onClick={e => onClick(e.target.name)}>4</button>
                <button className='btn__light' name='5' onClick={e => onClick(e.target.name)}>5</button>
                <button className='btn__light' name='6' onClick={e => onClick(e.target.name)}>6</button>
            </div>
            <div className='row'>
                <button className='btn__dark' name='*' onClick={e => onClick(e.target.name)}>×</button>
                <button className='btn__light' name='7' onClick={e => onClick(e.target.name)}>7</button>
                <button className='btn__light' name='8' onClick={e => onClick(e.target.name)}>8</button>
                <button className='btn__light' name='9' onClick={e => onClick(e.target.name)}>9</button>
            </div>
            <div className='row'>
                <button className='btn__dark radius__left' name='/' onClick={e => onClick(e.target.name)}>÷</button>
                <button className='btn__light' name='.' onClick={e => onClick(e.target.name)}>.</button>
                <button className='btn__light' name='0' onClick={e => onClick(e.target.name)}>0</button>
                <button className='btn__light radius__right' name='⌫' onClick={e => onClick(e.target.name)}>⌫</button>
            </div>
        </div>
    )
}

export default Calculator
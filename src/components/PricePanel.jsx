import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PricePanel = (props) => {
  // console.log("랜더링횟수");
  const dispatch = useDispatch()
  const { isSelect, setIsSelect, coinsPrice } = props
  const {
    code,
    trade_price,
    change,
    change_rate,
    change_price,
    acc_trade_price_24h,
    name,
    exchange,
  } = props.coin

  const upDown = change === 'RISE' ? '+' : '-'
  const changeRate = `${upDown} ${(change_rate * 100).toFixed(2)} %`
  const panelRef = useRef()

  const clickHandler = () => {
    if (coinsPrice?.code === code) {
      setIsSelect(!isSelect)
    } else if (coinsPrice?.code !== code) {
      setIsSelect(true)
    } else {
      setIsSelect(!isSelect)
    }
    dispatch({
      type: 'SELECT_COIN',
      payload: {
        code,
        trade_price,
        change,
        changeRate,
        change_price,
        acc_trade_price_24h,
        name,
        exchange,
      },
    })
  }

  useEffect(() => {
    //panelRef.current.classList.add('animate-wiggle-once')
    upDown === '+'
      ? panelRef.current.classList.add('animate-blink-border-red')
      : panelRef.current.classList.add('animate-blink-border-blue')
  }, [trade_price])

  const anmatieEndHandler = () => {
    //panelRef.current.classList.remove('animate-wiggle-once')
    panelRef.current.classList.remove('animate-blink-border-red')
    panelRef.current.classList.remove('animate-blink-border-blue')
  }

  return (
    <div
      className="p-2 z-0 bg-white rounded-lg font-bold text-[5px] w-full cursor-pointer hover:scale-110 mb-2 border-2"
      onAnimationEnd={anmatieEndHandler}
      onClick={clickHandler}
      ref={panelRef}
    >
      <div className="pointer-events-none  z-0">{exchange}</div>
      {/* <img src={imgUrl}></img> */}
      <div className="pointer-events-none  z-0">{trade_price}</div>
      <div
        className={`${upDown === '+' ? 'text-red-300' : 'text-blue-300'} z-0`}
      >
        ({changeRate})
      </div>
    </div>
  )
}

export default React.memo(PricePanel)

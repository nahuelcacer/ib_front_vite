import React, { useEffect } from 'react'
import getMovimientoDia from '../service/service.movdia'

const MovimientoDia = () => {
    useEffect(() => {
        console.log(getMovimientoDia())
    }, [])
  return (
    <div>
      <h1 className='text-2xl font-bold'>Movimiento del día</h1>
    </div>
  )
}

export default MovimientoDia

import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import MovimientoDia from './MovimientoDia'
import MovimientoAnteriores from './MovimientoAnteriores'

const Movimientos = () => {
  return (
    <div className='flex flex-col gap-4'>
        <Tabs radius='md'>
            <Tab key="diario" title="Movimientos del dia">
                <MovimientoDia />
            </Tab>

            <Tab key="anteriores" title="Movimientos anteriores" >
                <MovimientoAnteriores />
            </Tab>
        </Tabs>
    </div>
  )
}

export default Movimientos
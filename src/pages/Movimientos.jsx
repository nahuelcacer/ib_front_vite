import { Tab, Tabs } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import MovimientoDia from './MovimientoDia'
import MovimientoAnteriores from './MovimientoAnteriores'
import { ProfileContext } from '../context/ProfileContext'
import adapterMovdia from '../adapters/adapter.movdia'
import { useDispatch } from 'react-redux'
import { request, reset } from '../features/bank/bank.slices'
import { reset as resetMovDia } from '../features/movdia/movdia.slices'
import { reset as resetMovAnterior } from '../features/movanterior/movanterior.slices'
const Movimientos = () => {
  const { accounts, institution_id, id, customer_id, client_id, token_ib } = useContext(ProfileContext)
  const [banks, setBanks] = useState(accounts.map(
    account => adapterMovdia(account)
  ))
  const dispatch = useDispatch()
  dispatch(request(banks))

  
  const handleReset = () => {
    dispatch(reset())
    dispatch(resetMovDia())
    dispatch(resetMovAnterior())
  }
  return (
    <div className='flex flex-col gap-4'>
        <Tabs radius='md' onSelectionChange={handleReset}>
            <Tab key="diario" title="Movimientos del dia">
                <MovimientoDia />
            </Tab>

            <Tab key="anteriores" title="Movimientos anteriores" >
                <MovimientoAnteriores/>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Movimientos
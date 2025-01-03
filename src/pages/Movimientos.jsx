import { Tab, Tabs } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import MovimientoDia from './MovimientoDia'
import MovimientoAnteriores from './MovimientoAnteriores'
import { ProfileContext } from '../context/ProfileContext'
import adapterMovdia from '../adapters/adapter.movdia'
import { useDispatch } from 'react-redux'
import { request } from '../features/bank/bank.slices'

const Movimientos = () => {
  const { accounts, institution_id, id, customer_id, client_id, token_ib } = useContext(ProfileContext)
  const [banks, setBanks] = useState(accounts.map(
    account => adapterMovdia(account)
  ))
  const dispatch = useDispatch()
  dispatch(request(banks))
  return (
    <div className='flex flex-col gap-4'>
        <Tabs radius='md'>
            <Tab key="diario" title="Movimientos del dia">
                <MovimientoDia user_id={id} institution_id={institution_id} />
            </Tab>

            <Tab key="anteriores" title="Movimientos anteriores" >
                <MovimientoAnteriores customer_id={customer_id} client_id={client_id} token_ib={token_ib}/>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Movimientos
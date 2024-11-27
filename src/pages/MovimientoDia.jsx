import React, { useEffect, useState } from 'react'
import getMovimientoDia from '../service/service.movdia'
import { Input, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

const MovimientoDia = () => {
  const [banks, setBanks] = useState(JSON.parse(sessionStorage.getItem('user')).accounts.map(
    account => ({
      ...account,
      value: account.account_number,
      label: account.bank_name
    })
  ))
  const [movimientos, setMovimientos] = useState([])
  useEffect(() => {

    console.log(getMovimientoDia())
  }, [])
  const handleSelectBank = async (e) => {
    const bank = banks.find(bank => bank.value === e.target.value)
    console.log(bank)
    const response = await getMovimientoDia(bank)
    setMovimientos(response.movements_detail)
    console.log(response)
  }
  return (
    <div>
      <h1 className='text-2xl font-bold'>Movimiento del día</h1>
      <div className='grid grid-cols-[1fr_3fr] gap-2'>
        <Select label='Selecciona un banco' onChange={handleSelectBank} >
          {
            banks.map((bank) => {
              return (
                <SelectItem key={bank.value} textValue={bank.label}>
                  {/* {bank.label} */}
                  <div className='flex flex-col'>
                    <span className="text-small">{bank.label}</span>
                    <span className="text-tiny text-default-400">{bank.value}</span>
                  </div>
                </SelectItem>
              )
            })
          }
        </Select>
        <Input type="text" label="Realiza una busqueda" required />

      </div>
      <div>
        <Table 
        aria-label='Tabla de movimientos del dia'
        removeWrapper
        >
          <TableHeader>
            <TableColumn>perro</TableColumn>
          </TableHeader>
          <TableBody emptyContent={<Spinner></Spinner>}>
          {movimientos?.map((mov,index) => {
            // destructurar mov 
            return (
              <TableRow key={index}>
                <TableCell>{mov.amount}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MovimientoDia

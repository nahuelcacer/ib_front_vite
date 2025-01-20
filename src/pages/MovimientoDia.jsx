import React, { useMemo, useState } from 'react'
import { Avatar, Chip, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { formatArs } from '../utils/formatter'
import { AlertCircle, ArrowDownRight, ArrowUpRight, Check, Receipt, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { select as selectBank } from '../features/bank/bank.slices'
import { fetchMovDia, setFilteredMovements } from '../features/movdia/movdia.slices'


const MovimientoDia = () => {
  const dispatch = useDispatch()
  const banks = useSelector(state => state.bank.options)
  const loading = useSelector(state => state.movdia.loading)
  const filteredMovements = useSelector(state => state.movdia.filteredMovements)
  const [page, setPage] = useState(1)

  const findBankData = (selectedBank) => {
    const bank = banks.find(bank => bank.value === selectedBank.target.value)
    return bank
  }
  const handleSelectBank = async (e) => {
    const selectedBank = findBankData(e)
    dispatch(selectBank(selectedBank))
    dispatch(fetchMovDia(selectedBank))
    setPage(1)
  }
  //PAGINATION
  const rowsPerPage = 10;
  const pages = Math.ceil(filteredMovements ? filteredMovements?.length / rowsPerPage : 1)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const data = filteredMovements ? filteredMovements?.slice(start, end) : []
    return data
  }, [page, filteredMovements])

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-[2fr_1fr_1fr] gap-2 py-2'>
        <h1 className='text-2xl font-bold text-left'>Movimientos del día</h1>
        <Select
          aria-label='Selecciona un banco'
          items={banks}
          // label='Selecciona un banco' 
          placeholder='Selecciona un banco'
          onChange={handleSelectBank}
          renderValue={(items) => {
            return items.map((item) => {
              return (
                <div className="flex gap-2 items-center">
                  <Avatar src={item.data.img} alt={item.data.label} className="w-8 h-8" />
                  <div className='flex flex-col'>
                    <span className="text-small">{item.data.label}</span>
                    <span className="text-tiny text-default-400">{item.data.value}</span>
                  </div>
                </div>
              )
            })
          }}
          size='lg'
        >
          {
            (bank) => {
              return (
                <SelectItem key={bank.value} textValue={bank.label}>
                  <div className="flex gap-2 items-center">
                    <Avatar src={bank.img} alt={bank.label} className="w-8 h-8" />
                    <div className='flex flex-col'>
                      <span className="text-small">{bank.label}</span>
                      <span className="text-tiny text-default-400">{bank.value}</span>
                    </div>
                  </div>
                </SelectItem>
              )
            }
          }
        </Select>
        <Input type="text" placeholder="Realiza una busqueda" size='lg' onChange={(e) => {
          dispatch(setFilteredMovements(e.target.value))
          setPage(1)
        }} />

      </div>
      <div>
        <Table
          aria-label='Tabla de movimientos del dia'
          removeWrapper
          bottomContent={
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              ></Pagination>
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Comprobante</TableColumn>
            <TableColumn>ID</TableColumn>
            <TableColumn>Desc (IB)</TableColumn>
            <TableColumn>Desc (Banco)</TableColumn>
            <TableColumn>Cuit Cliente</TableColumn>
            <TableColumn>Desc (depositante)</TableColumn>
            <TableColumn>Importe</TableColumn>
            <TableColumn>Fecha de procesamiento</TableColumn>
            <TableColumn>Tipo</TableColumn>

          </TableHeader>
          <TableBody emptyContent={loading ? <Spinner></Spinner> : "No se encontraron movimientos"}>
            {items?.map((mov, index) => {
              // destructurar mov 
              return (
                <TableRow className={`hover:bg-gray-100/50 active:bg-gray-200 cursor-pointer`} key={index} onClick={() => handleSelectMov(mov)}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Chip
                        variant={mov.has_receipt ? "outline" : "secondary"}
                        className={mov.has_receipt ? "bg-primary/5" : "bg-gray-200"}
                      >
                        {mov.has_receipt ? (
                          <div className='flex items-center gap-2'>
                            <Receipt className="mr-1 h-3 w-3" />
                            Comprobante
                          </div>
                        ) : (
                          <div className='flex items-center gap-2'>
                            <X className="mr-1 h-3 w-3" />
                            Sin comprobante
                          </div >
                        )}
                      </Chip>
                      {mov.has_receipt ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{mov.id}</TableCell>
                  <TableCell>{mov.code_description_ib}</TableCell>
                  <TableCell>{mov.code_description_bank}</TableCell>
                  <TableCell>{mov.customer_cuit || ""}</TableCell>
                  <TableCell>{mov.depositor_description || ""}</TableCell>
                  <TableCell>
                    {mov.debit_credit_type === "D" ?
                      <div className='flex items-center gap-2'>
                        <ArrowDownRight className='h-4 w-4 text-red-600' />
                        <p className='text-red-600 font-semibold'>
                          {formatArs.format(mov.amount)}
                        </p>
                      </div>
                      :
                      <div className='flex items-center gap-2'>
                        <ArrowUpRight className='h-4 w-4 text-green-600' />
                        <p className='text-green-600 font-semibold'>
                          {formatArs.format(mov.amount)}
                        </p>
                      </div>
                    }
                  </TableCell>
                  <TableCell>{new Date(mov.process_date).toLocaleDateString('es-AR')} {new Date(mov.process_date).toLocaleTimeString('es-AR')}</TableCell>
                  <TableCell>
                    <Chip size='sm' color='primary'>
                      {mov.debit_credit_type === "D" ? "Debito" : "Credito"}
                    </Chip>
                  </TableCell>
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

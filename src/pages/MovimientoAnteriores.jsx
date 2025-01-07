import { Avatar, Button, Chip, DatePicker, DateRangePicker, Input, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { formatDate } from '../utils/formatter'
import { AlertCircle, ArrowDownRight, ArrowUpRight, Check, Receipt, X } from 'lucide-react'
import { formatArs } from '../utils/formatter'
import { useDispatch, useSelector } from 'react-redux'
import { select as selectBank } from '../features/bank/bank.slices'
import { fetchMovAnterior, setFilteredMovements, setDate } from '../features/movanterior/movanterior.slices'
import authService from '../service/auth'

const MovimientoAnteriores = () => {
  const dispatch = useDispatch()
  const banks = useSelector(state => state.bank.options)
  const user = authService.getUser()
  const date = useSelector(state => state.movanterior.date)
  const movimientos = useSelector(state => state.movanterior.filteredMovements)
  const loading = useSelector(state => state.movanterior.loading)
  const [page, setPage] = useState(1)

  
  
  const handleSelectBank = async (e) => {
    const bank = banks.find(bank => bank.value === e.target.value)
    dispatch(selectBank(bank))
    dispatch(fetchMovAnterior({
      desde: date.start,
      hasta: date.end,
      customer_id: user.customer_id,
      client_id: user.client_id,
      token_ib: user.token_ib.access_token,
      account_number: bank.account_number,
      bank_code: bank.bank_number,
      account_type: bank.account_type
    }))

  }

  const rowsPerPage = 8;
  const pages = Math.ceil(movimientos ? movimientos.length / rowsPerPage : 1)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const data = movimientos?.slice(start, end)
    return data
  }, [page, movimientos])

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 py-2'>
        <h1 className='text-2xl font-bold text-left'>Movimientos anteriores</h1>
        <DateRangePicker
          size='lg'
          onChange={(e) => dispatch(setDate({start: e.start, end: e.end}))}
          aria-label='Selecciona un rango de fechas'
        >

        </DateRangePicker>
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
        <Input type="text" placeholder="Realiza una busqueda" size='lg' aria-label='Busqueda' onChange={(e) => dispatch(setFilteredMovements(e.target.value))} />

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
                  <TableCell><span className='line-clamp-1'>{mov.code_description_ib}</span></TableCell>
                  <TableCell><span className='line-clamp-1'>{mov.code_description_bank}</span>  </TableCell>
                  <TableCell>{mov.customer_cuit || ""}</TableCell>
                  <TableCell><span className='line-clamp-1'>{mov.depositor_description || ""}</span></TableCell>
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
      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={() => setReceiptData({ ...receiptData, description: '', user_id: '', transfer_id: '', fecha_recibo: '' })}>
          <ModalContent>
            <ModalHeader >Recibo</ModalHeader>
            <ModalBody>
              <div className='flex flex-col gap-4 pb-4'>
                <p className='text-gray-500'>Ingresa la fecha en la que se realizo el recibo</p>
                <Input label="Descripcion" onChange={(e) => { setReceiptData({ ...receiptData, description: e.target.value }) }}></Input>
                <I18nProvider locale='es-AR'>
                  <DatePicker label="Fecha del recibo" size='md' onChange={(e) => { setReceiptData({ ...receiptData, fecha_recibo: formatDate(e) }) }}></DatePicker>
                </I18nProvider>
                <div className='flex gap-2'>
                  <Button onClick={onOpenChange}>Cancelar</Button>
                  <Button color='primary' onClick={handleRegisterReceipt}>Registrar</Button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal> */}
      {/* </div> */}
    </div>
  )
}

export default MovimientoAnteriores
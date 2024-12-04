import { Avatar, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import { formatDate } from '../utils/formatter'
import { getMovimientosAnteriores } from '../service/service.movanterior'

const MovimientoAnteriores = ({ banks, user_id, institution_id, customer_id, client_id, token_ib }) => {
  const [desde, setDesde] = useState(null)
  const [hasta, setHasta] = useState(null)
  const [selectedBank, setSelectedBank] = useState(null)

  const handleSelectBank = (e) => {
    const bank = banks.find(bank => bank.value === e.target.value)
    setSelectedBank(bank)
    handleGetMovimientos()
  }
  // const { account_number**, bank_code**, customer_id**, account_type**, token_ib**, client_id**, desde**, hasta** } = req.body;

  const handleGetMovimientos = async () => {
    const response = await getMovimientosAnteriores({ 
      desde, 
      hasta, 
      customer_id, 
      client_id, 
      token_ib:token_ib.access_token,
      account_number: selectedBank.account_number,
      bank_code: selectedBank.bank_number,
      account_type: selectedBank.account_type
    })
    console.log(response)
  } 
  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 py-2'>
        <h1 className='text-2xl font-bold text-left'>Movimientos anteriores</h1>
        <DateRangePicker 
        size='lg'
          onChange={(e) => {
            setDesde(formatDate(e.start))
            setHasta(formatDate(e.end))
          }}
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
        <Input type="text" placeholder="Realiza una busqueda" size='lg' aria-label='Busqueda'/>

      </div>
      {/* <div>
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
        </Table> */}
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
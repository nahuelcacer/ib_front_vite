import React, { useMemo, useState } from 'react'
import getMovimientoDia from '../service/service.movdia'
import { Avatar, Button, Chip, DatePicker, Input, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { formatArs, formatDate } from '../utils/formatter'
import { I18nProvider } from '@react-aria/i18n'
import { registerReceipt } from '../service/service.receipt'
import { AlertCircle, ArrowDownRight, ArrowUpRight, Check, Receipt, X } from 'lucide-react'

const MovimientoDia = ({banks, user_id, institution_id}) => {

  const [movimientos, setMovimientos] = useState(null)
  const [gral, setGral] = useState(null)
  const [page, setPage] = useState(1)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [receiptData, setReceiptData] = useState({ description: '', user_id: '', transfer_id: '', fecha_recibo: '', institution_id: '' })
  const [loading, setLoading] = useState(false)

  const handleSelectMov = (v) => {
    if (!v.has_receipt) {
      onOpen();
      setReceiptData({
        ...receiptData,
        transfer_id: v.id,
        user_id: user_id,
        institution_id: institution_id
      });
      null
    }
  }


  const handleSelectBank = async (e) => {
    const bank = banks.find(bank => bank.value === e.target.value)

    const response = await getMovimientoDia(bank)
      .then((response) => {
        setLoading(true)
        setMovimientos(response.movements_detail)
        setGral(response.general_data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  //PAGINATION
  const rowsPerPage = 10;
  const pages = Math.ceil(movimientos ? gral.total_rows / rowsPerPage : 1)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const data = movimientos?.slice(start, end)
    return data
  }, [page, movimientos])


  const handleRegisterReceipt = async () => {
    const response = await registerReceipt(receiptData)
    console.log(response)
  }

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
            console.log(items)
            return items.map((item) => {
              return (
                <div className="flex gap-2 items-center" aria-label={item.data.label}>
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
                  <div className="flex gap-2 items-center" aria-label={bank.label}>
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
        <Input type="text" placeholder="Realiza una busqueda" size='lg' />

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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={() => setReceiptData({ ...receiptData, description: '', user_id: '', transfer_id: '', fecha_recibo: '' })}>
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
        </Modal>
      </div>
    </div>
  )
}

export default MovimientoDia

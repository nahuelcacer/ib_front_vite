import React, { useMemo, useState } from 'react'
import getMovimientoDia from '../service/service.movdia'
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { formatArs, formatDate } from '../utils/formatter'
import { I18nProvider } from '@react-aria/i18n'
import { registerReceipt } from '../service/service.receipt'

const MovimientoDia = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [banks, setBanks] = useState(JSON.parse(sessionStorage.getItem('user')).accounts.map(
    account => ({
      ...account,
      value: account.account_number,
      label: account.bank_name
    })
  ))
  const [movimientos, setMovimientos] = useState(null)
  const [gral, setGral] = useState(null)
  const [page, setPage] = useState(1)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMov, setSelectedMov] = useState(null)
  const [receiptData, setReceiptData] = useState({ description: '', user_id: '', transfer_id: '', fecha_recibo: '', institution_id: '' })


  const handleSelectMov = (v) => {
    !v.has_receipt ? onOpen() : setReceiptData({ ...receiptData, transfer_id: v.id, user_id: user.id, institution_id: parseInt(user.institution_id) })

  }


  const handleSelectBank = async (e) => {
    const bank = banks.find(bank => bank.value === e.target.value)

    const response = await getMovimientoDia(bank)
    setMovimientos(response.movements_detail)
    setGral(response.general_data)

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
            <TableColumn>ID</TableColumn>
            <TableColumn>Desc (IB)</TableColumn>
            <TableColumn>Desc (Banco)</TableColumn>
            <TableColumn>Cuit Cliente</TableColumn>
            <TableColumn>Desc (depositante)</TableColumn>
            <TableColumn>Importe</TableColumn>
            <TableColumn>Fecha de procesamiento</TableColumn>
            <TableColumn>Tipo</TableColumn>

          </TableHeader>
          <TableBody emptyContent={<Spinner></Spinner>}>
            {items?.map((mov, index) => {
              // destructurar mov 
              return (
                <TableRow className={`hover:bg-gray-100/50 active:bg-gray-200 cursor-pointer ${mov.has_receipt ? 'bg-green-300/50' : ''}`} key={index} onClick={() => handleSelectMov(mov)}>
                  <TableCell>{mov.id}</TableCell>
                  <TableCell>{mov.code_description_ib}</TableCell>
                  <TableCell>{mov.code_description_bank}</TableCell>
                  <TableCell>{mov.customer_cuit || ""}</TableCell>
                  <TableCell>{mov.depositor_description || ""}</TableCell>
                  <TableCell>
                    {mov.debit_credit_type === "D" ?
                      <p className='text-red-600 font-semibold'>
                        {formatArs.format(mov.amount)}
                      </p>
                      :
                      <p className='text-green-600 font-semibold'>
                        {formatArs.format(mov.amount)}
                      </p>
                    }
                  </TableCell>
                  <TableCell>{mov.process_date}</TableCell>
                  <TableCell>{mov.debit_credit_type}</TableCell>
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

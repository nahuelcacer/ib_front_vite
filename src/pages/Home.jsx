import React, { useContext, useEffect, useState } from "react";
import { getSaldos } from "../service/service.saldos";
import { formatArs } from "../utils/formatter";
import { Avatar, Button, DatePicker, Input, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { ProfileContext } from "../context/ProfileContext";
import adapterMovdia from "../adapters/adapter.movdia";
import { createMovement, deleteMovement, getMovementByDate } from "../service/service.movements";
import { getLocalTimeZone, now } from "@internationalized/date";
import { ChartNoAxesCombined, Trash2Icon } from "lucide-react";


const movement_type = [{ label: "Egreso" }, { label: "Ingreso" }]
const CardBancos = ({ cuenta, proyeccionSaldo, index }) => {
  return (
    <div className="flex w-full border rounded-lg p-4 justify-between">
      <div className="flex items-center gap-2">

        <div className="">
          <Avatar
            alt="Logo del banco"
            name="tota"
            src={cuenta.bank_number === "001" ? "" : `https://sib1.interbanking.com.ar/skins/bancos/branding/v2/logo${cuenta.bank_number}.png`}
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-lg font-semibold">{cuenta.account_label}</p>
          <p className="text-sm text-default-500">{cuenta.account_number}</p>
        </div>
      </div>
      <div className="place-items-center text-center flex flex-col">
        <span className="text-lg font-bold text-primary">
          {formatArs.format(cuenta.balances.current_operating_balance)}
          {/* {searchedMovement[cuenta.account_number]} */}
        </span>

        {proyeccionSaldo ?
          proyeccionSaldo > 0 ?
            <div className="flex items-center gap-2">
              <ChartNoAxesCombined className="text-default-500" size={16} />
              <span className="text-sm text-default-500 font-semibold">
                {formatArs.format(proyeccionSaldo)}
              </span>
            </div>
            :
            <div className="flex items-center gap-2">
              <ChartNoAxesCombined className="text-red-500" size={16} />
              <span className="text-sm text-red-500 font-semibold">
                {formatArs.format(proyeccionSaldo)}
              </span>
            </div>
          : ""}

      </div>
    </div>
  )
}
const Home = () => {
  const [saldos, setSaldos] = useState(null);
  const { accounts, institution_id } = useContext(ProfileContext)
  const [banks, setBanks] = useState(accounts.map(
    account => adapterMovdia(account)
  ))
  const [movement, setMovement] = useState({ institution_id, fecha_movimiento: new Date().toISOString().split('T')[0] })
  const [fechaMovimientos, setFechaMovimientos] = useState(new Date().toISOString().split("T")[0])
  const [searchedMovement, setSearchedMovement] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const response = await createMovement(data)
      .then(() => {
        getMovementByDate(fechaMovimientos, institution_id, setSearchedMovement)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDeleteMovement = async (id) => {
    setIsLoadingDelete(true)
    const response = await deleteMovement(id)
      .then(() => {
        getMovementByDate(fechaMovimientos, institution_id, setSearchedMovement)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoadingDelete(false)
      })
  }
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    getSaldos(formattedDate, formattedDate, setSaldos);
    setFechaMovimientos(formattedDate)
  }, []);
  useEffect(() => {
    getMovementByDate(fechaMovimientos, institution_id, setSearchedMovement)
  }, [fechaMovimientos])
  return (
    <div>
      <div className="text-left py-2">
        <h1 className="text-2xl font-bold">Saldos</h1>
        <span className="text-sm text-default-500">Saldos disponibles del dia</span>
      </div>
      <div className="gap-2">
        <div className="flex flex-col gap-2">
          {!saldos ? (
            <>
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </>
          ) : (
            saldos.map((cuenta, index) => {
              const movement = searchedMovement ? searchedMovement[cuenta.account_number] : null
              const proyeccionSaldo = cuenta.balances.current_operating_balance + movement
              return (
                <div key={index}>
                  <CardBancos cuenta={cuenta} proyeccionSaldo={proyeccionSaldo} />
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-left py-2">
          <h1 className="text-2xl font-bold">Movimientos</h1>
          <span className="text-sm text-default-500">Movimientos del dia</span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="rounded-lg border flex-grow-[4]">
            <div className="w-60 m-2">
              <DatePicker onChange={(e) => { setFechaMovimientos(e) }}></DatePicker>

            </div>

            <div>
              <Table shadow="none">
                <TableHeader>
                  <TableColumn>Banco</TableColumn>
                  <TableColumn>Descripción </TableColumn>
                  <TableColumn>Monto</TableColumn>
                  <TableColumn>*</TableColumn>
                </TableHeader>
                <TableBody>
                  {searchedMovement?.movements?.map((mov, index) => {
                    const bank = banks.find(bank => bank.account_number === mov.bank_id)
                    console.log(bank)
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex gap-2 items-center">
                            <Avatar src={bank.img} alt={bank.bank_name} className="w-8 h-8" />
                            <div className="flex flex-col">
                              <span className="text-small">{bank.bank_name}</span>
                              <span className="text-tiny text-default-400">{bank.account_number}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{mov.description}</TableCell>
                        <TableCell>
                          {
                            mov.amount > 0 ?
                              <span className="bg-green-500/70 text-white font-semibold rounded-md p-1 px-2">{formatArs.format(mov.amount)}</span>
                              : <span className="bg-red-500/80 text-white font-semibold rounded-md p-1 px-2">{formatArs.format(mov.amount)}</span>
                          }
                        </TableCell>
                        <TableCell>
                          <Button isLoading={isLoadingDelete} onClick={() => { handleDeleteMovement(mov.id) }} color="primary" type="submit" size="sm" startContent={<Trash2Icon size={16} />} >Eliminar</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="rounded-lg border flex-grow-[1]">
            <div className="flex flex-col gap-2 p-2">
              <h1 className="text-2xl font-bold">Crear movimiento</h1>
              <span className="text-sm text-default-500">Crea un nuevo movimiento</span>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col gap-2">
                  <Select
                    aria-label='Selecciona un banco'
                    items={banks}
                    name="bank_id"
                    // label='Selecciona un banco' 
                    placeholder='Selecciona un banco'
                    // onChange={handleChange}
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
                  <Input placeholder="Descripción" name="description" />
                  <Select name="movement_type" placeholder="Tipo de movimiento">
                    {movement_type.map((type) => {
                      return (
                        <SelectItem key={type.label} value={type.label}>{type.label}</SelectItem>
                      )
                    })}
                  </Select>
                  <Input placeholder="Monto" name="amount" />
                  <input type="hidden" name="institution_id" value={institution_id} />
                  <input type="hidden" name="fecha_movimiento" value={fechaMovimientos} />
                  <Button color="primary" type="submit" isLoading={isLoading}>Crear</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default Home;

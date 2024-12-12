import React, { useContext, useEffect, useState } from "react";
import { getSaldos } from "../service/service.saldos";
import { formatArs } from "../utils/formatter";
import { Avatar, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { ProfileContext } from "../context/ProfileContext";
import adapterMovdia from "../adapters/adapter.movdia";

const CardBancos = ({ cuenta }) => {
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
      <div className="place-items-center text-center">
        <span className="text-lg font-bold text-primary">
          {formatArs.format(cuenta.balances.current_operating_balance)}
        </span>
      </div>
    </div>
  )
}
const Home = () => {
  const [saldos, setSaldos] = useState(null);
  const { accounts } = useContext(ProfileContext)
  const [banks, setBanks] = useState(accounts.map(
    account => adapterMovdia(account)
  ))
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    getSaldos(formattedDate, formattedDate, setSaldos);
  }, []);
  return (
    <div>
      <div className="text-left py-2">
        <h1 className="text-2xl font-bold">Saldos</h1>
        <span className="text-sm text-default-500">Saldos disponibles del dia</span>
      </div>
      <div className="gap-2">
        <div className="flex flex-col gap-2">
          {saldos?.map((cuenta) => (
            <CardBancos cuenta={cuenta} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-left py-2">
          <h1 className="text-2xl font-bold">Movimientos</h1>
          <span className="text-sm text-default-500">Movimientos del dia</span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="rounded-lg border flex-grow-[4]">s</div>
          <div className="rounded-lg border flex-grow-[1]">
            <div className="flex flex-col gap-2 p-2">
              <h1 className="text-2xl font-bold">Crear movimiento</h1>
              <span className="text-sm text-default-500">Crea un nuevo movimiento</span>
              <Select
                
                items={banks}
                renderValue={(items) => {
                  return items.map((item) => {
                    return <div className="flex gap-2 items-center" aria-label={item.label}>
                      <Avatar src={item.img} alt={item.label} className="w-8 h-8" />
                      <div className='flex flex-col'>
                        <span className="text-small">{item.label}</span>
                        <span className="text-tiny text-default-400">{item.value}</span>
                      </div>
                    </div>
                  })
                }}
              >
                {banks.map((bank) => (
                  <SelectItem >
                    <div className="flex gap-2 items-center" aria-label={bank.label}>
                      <Avatar src={bank.img} alt={bank.label} className="w-8 h-8" />
                      <div className='flex flex-col'>
                        <span className="text-small">{bank.label}</span>
                        <span className="text-tiny text-default-400">{bank.value}</span>
                      </div>
                    </div></SelectItem>
                ))}
              </Select>
              <Input placeholder="Descripción" />
              <Input placeholder="Monto" />
              <Button>Crear</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  {/*
      <div>
       {saldos?.map((cuenta) => (
        <Card
          key={cuenta.id}
          className="w-[350px] hover:shadow-lg transition-shadow"
          shadow="sm"
        >
          <CardHeader className="flex gap-4 items-center">
            <Avatar
              alt="Logo del banco"
              name="tota"
              src={cuenta.bank_number === "001" ? "" : `https://sib1.interbanking.com.ar/skins/bancos/branding/v2/logo${cuenta.bank_number}.png`}
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{cuenta.account_label}</p>
              <p className="text-sm text-default-500">{cuenta.account_number}</p>
            </div>
          </CardHeader>

          <CardBody className="py-5">
            <div className="space-y-3">
              <p className="text-sm text-default-500">Saldo Disponible</p>
              <p className="text-3xl font-bold text-primary">
                {formatArs.format(cuenta.balances.current_operating_balance)}
              </p>
            </div>
          </CardBody>

          <CardFooter className="flex justify-between items-center">

          </CardFooter>
        </Card>
      ))} 
    </div>*/}
  // );
};

export default Home;

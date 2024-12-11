import React, { useEffect, useState } from "react";
import { getSaldos } from "../service/service.saldos";
import { formatArs } from "../utils/formatter";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Home = () => {
  const [saldos, setSaldos] = useState(null);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    getSaldos(formattedDate, formattedDate, setSaldos);
  }, []);
  return (
    <div>
      {/* <h1 className="text-2xl font-semibold text-left">Inicio</h1> */}
      <div className="flex gap-4 flex-wrap w-[80%]">
        <div className="flex flex-col w-full rounded-lg p-4 shadow-lg text-left">
      <div className="text-left">

        <h1 className="text-2xl font-semibold">Saldos</h1>
        <p className="text-sm text-default-500 pb-">Saldo disponible al dia</p>
      </div>

          {saldos?.map((cuenta, index) => (
            <div key={index} className="p-2">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt="Logo del banco"
                    name="tota"
                    src={cuenta.bank_number === "001" ? "" : `https://sib1.interbanking.com.ar/skins/bancos/branding/v2/logo${cuenta.bank_number}.png`}
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{cuenta.account_label}</p>
                    <p className="text-sm text-default-500">{cuenta.account_number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{formatArs.format(cuenta.balances.current_operating_balance)}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
        <div className="flex flex-col w-full rounded-lg p-4 shadow-lg text-left">
          <h1 className="text-2xl font-semibold text-left">Movimientos</h1>
          <p className="text-sm text-default-500 pb-">Movimientos de las cuentas</p>
        </div>
      </div>
      {/* {saldos?.map((cuenta) => (
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
      ))} */}
    </div>
  );
};

export default Home;

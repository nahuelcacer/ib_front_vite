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
    <div className="flex gap-4 flex-wrap">
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
    </div>
  );
};

export default Home;

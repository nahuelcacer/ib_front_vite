import React, { useEffect, useState } from "react";
import { getSaldos } from "../service/service.saldos";
import { formatArs } from "../utils/formatter";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Home = () => {
  const [saldos, setSaldos] = useState(null);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    getSaldos(formattedDate, formattedDate, setSaldos);
  }, []);
  return (
    <div className="text-2xl font-bold flex gap-10">
      {saldos?.accounts.map((cuenta) => {
        return (
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://sib1.interbanking.com.ar/skins/bancos/branding/v2/logo011.png"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">NextUI</p>
                <p className="text-small text-default-500">nextui.org</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.  
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;

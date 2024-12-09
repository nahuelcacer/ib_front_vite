import { Checkbox, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

const estadosPersonal = [{
    label:"Activo", value:true
}, {
    label:"Inactivo", value:false
}]
const sexoPersonal = [
    {label:"Hombre" ,value:"masculino"},
    {label:"Mujer" ,value:"femenino"},
]
const CrearSueldo = () => {
  return (
    <div className="grid gap-2 w-[400px]">
      <Input label="Nombre" name="nombre"></Input>
      <Input label="Dni" name="dni"></Input>
      <div className="flex gap-4">
        <DatePicker label="Fecha de ingreso"></DatePicker>
        <Select label="Selecciona un estado">
            {estadosPersonal.map((estado, index) => {
                return (
                    <SelectItem key={index} value={estado.value}>{estado.label}</SelectItem>
                )
            })}
        </Select>
      </div>
            <Divider></Divider>
                <h4 className="text-medium font-medium">Datos de contacto</h4>
                <Input label="Telefono"></Input>
                <Input label="Email"></Input>
                <Input label="Direccion"></Input>
            <Divider></Divider>
                <h4 className="text-medium font-medium">Datos personales</h4>
                <div className="flex gap-4">


                <DatePicker label="Fecha de nacimiento"></DatePicker>
                <Select label="Selecciona sexo">
                {sexoPersonal.map((sexo, index) => {
                    return (
                        <SelectItem key={index} value={sexo.value}>{sexo.label}</SelectItem>
                    )
                })}
                </Select>
                </div>
            
    </div>
  );
};

export default CrearSueldo;

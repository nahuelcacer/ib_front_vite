import { Button, Checkbox, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { registerPersonal } from "../../service/service.personal";
import { getBancos } from "../../service/service.bancos";
import { ProfileContext } from "../../context/ProfileContext";

const estadosPersonal = [{
    label: "Activo", value: true
}, {
    label: "Inactivo", value: false
}]
const sexoPersonal = [
    { label: "Hombre", value: "masculino" },
    { label: "Mujer", value: "femenino" },
]
const tipoCuenta = [
    { label: "Cuenta corriente", value: "CC" },
    { label: "Cuenta de ahorro", value: "CA" },
]

const CrearSueldo = () => {
    const [errors, setErrors] = useState(null)
    const [bancos, setBancos] = useState([])
    const { institution_id } = useContext(ProfileContext)

    useEffect(() => {
        const fetchBancos = async () => {
            const response = await getBancos()
            setBancos(response)
        }
        fetchBancos()
    }, [])
    const validate = (data) => {
        const errors = {};
        if (!data.nombre || data.nombre.trim() === "") {
            errors.nombre = {
                message: "El nombre es obligatorio.",
                isInvalid: true
            }
        }

        if (!data.dni || isNaN(data.dni)) {
            errors.dni = {
                message: "El DNI debe ser un número válido.",
                isInvalid: true
            }
        }

        if (!data.ingreso) {
            errors.ingreso = {
                message: "La fecha de ingreso es obligatoria.",
                isInvalid: true
            }
        }
        if (!data.activo) {
            errors.activo = {
                message: "El estado es obligatorio.",
                isInvalid: true
            }
        }

        if (!data.telefono || isNaN(data.telefono)) {
            errors.telefono = {
                message: "El teléfono debe ser un número válido.",
                isInvalid: true
            }
        }

        if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = {
                message: "El correo electrónico no es válido.",
                isInvalid: true
            }
        }

        if (!data.direccion || data.direccion.trim() === "") {
            errors.direccion = {
                message: "La dirección es obligatoria.",
                isInvalid: true
            }
        }

        if (!data.fecha_nacimiento) {
            errors.fecha_nacimiento = {
                message: "La fecha de nacimiento es obligatoria.",
                isInvalid: true
            }
        }

        if (!data.sexo) {
            errors.sexo = {
                message: "El sexo es obligatorio.",
                isInvalid: true
            }
        }

        if (!data.numero_cuenta || isNaN(data.numero_cuenta)) {
            errors.numero_cuenta = {
                message: "El número de cuenta debe ser un número válido.",
                isInvalid: true
            }
        }

        if (!data.tipo_cuenta) {
            errors.tipo_cuenta = {
                message: "El banco es obligatorio.",
                isInvalid: true
            }
        }

        return errors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const validationErrors = validate(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const response = await registerPersonal(data);
        console.log(response);
    };

    return (
        <div className="w-[400px]">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
                <input label="Institucion" name="institution_id" value={parseInt(institution_id)} hidden></input>
                <Input label="Nombre" name="nombre" errorMessage={errors?.nombre?.message} isInvalid={errors?.nombre?.isInvalid} onChange={(e) => setErrors({ ...errors, nombre: null })}></Input>
                <Input label="Dni" name="dni" errorMessage={errors?.dni?.message} isInvalid={errors?.dni?.isInvalid} onChange={(e) => setErrors({ ...errors, dni: null })}></Input>
                <div className="flex gap-4">
                    <DatePicker label="Fecha de ingreso" name="ingreso" errorMessage={errors?.ingreso?.message} isInvalid={errors?.ingreso?.isInvalid} onChange={(e) => setErrors({ ...errors, ingreso: null })} ></DatePicker>
                    <Select label="Selecciona un estado" name="activo" errorMessage={errors?.activo?.message} isInvalid={errors?.activo?.isInvalid} onChange={(e) => setErrors({ ...errors, activo: null })} >
                        {estadosPersonal.map((estado, index) => {
                            return (
                                <SelectItem key={estado.value} value={estado.value}>{estado.label}</SelectItem>
                            )
                        })}
                    </Select>
                </div>
                {/* <Divider></Divider>
                <h4 className="text-medium font-medium">Datos de contacto</h4> */}
                <Input label="Telefono" name="telefono" errorMessage={errors?.telefono?.message} isInvalid={errors?.telefono?.isInvalid} onChange={(e) => setErrors({ ...errors, telefono: null })}></Input>
                <Input label="Email" name="email" errorMessage={errors?.email?.message} isInvalid={errors?.email?.isInvalid} onChange={(e) => setErrors({ ...errors, email: null })}    ></Input>
                <Input label="Direccion" name="direccion" errorMessage={errors?.direccion?.message} isInvalid={errors?.direccion?.isInvalid} onChange={(e) => setErrors({ ...errors, direccion: null })}></Input>
                {/* <Divider></Divider> */}
                {/* {/* <h4 className="text-medium font-medium">Datos personales</h4> */}
                <div className="flex gap-4">


                    <DatePicker label="Fecha de nacimiento" name="fecha_nacimiento" errorMessage={errors?.fecha_nacimiento?.message} isInvalid={errors?.fecha_nacimiento?.isInvalid} onChange={(e) => setErrors({ ...errors, fecha_nacimiento: null })} ></DatePicker>
                    <Select label="Selecciona sexo" name="sexo" errorMessage={errors?.sexo?.message} isInvalid={errors?.sexo?.isInvalid} onChange={(e) => setErrors({ ...errors, sexo: null })} >
                        {sexoPersonal.map((sexo, index) => {
                            return (
                                <SelectItem key={sexo.value} value={sexo.value}>{sexo.label}</SelectItem>
                            )
                        })}
                    </Select>
                </div>
                {/* <Divider></Divider> */}
                {/* <h4 className="text-medium font-medium">Datos bancarios</h4> */}
                <Select label="Selecciona banco" name="banco_id" errorMessage={errors?.banco?.message} isInvalid={errors?.banco?.isInvalid} onChange={(e) => setErrors({ ...errors, banco: null })} >
                    {bancos.map((banco) => {
                        return (
                            <SelectItem key={parseInt(banco.id)} value={parseInt(banco.id)}>{banco.nombre}</SelectItem>
                        )
                    })}     
                </Select>
                <div className="flex gap-4">
                    <Select label="Selecciona banco" name="tipo_cuenta" errorMessage={errors?.tipo_cuenta?.message} isInvalid={errors?.tipo_cuenta?.isInvalid} onChange={(e) => setErrors({ ...errors, tipo_cuenta: null })} >
                        {tipoCuenta.map((tipoCuenta, index) => {
                            return (
                                <SelectItem key={tipoCuenta.value} value={tipoCuenta.value}>{tipoCuenta.label}</SelectItem>
                            )
                        })}
                    </Select>
                </div>
                <Input label="Numero de cuenta" name="numero_cuenta" errorMessage={errors?.numero_cuenta?.message} isInvalid={errors?.numero_cuenta?.isInvalid} onChange={(e) => setErrors({ ...errors, numero_cuenta: null })}></Input>
                <Button type="submit">Guardar</Button>
            </form>
        </div>
    );
};

export default CrearSueldo;

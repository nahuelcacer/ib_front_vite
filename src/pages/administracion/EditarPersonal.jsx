import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPersonalById, updatePersonal } from '../../service/service.personal'
import { Button, Checkbox, DatePicker, Input, Select, SelectItem } from '@nextui-org/react'
import { estadosPersonal } from '../sueldos/CrearPersonal'
import { getBancos } from '../../service/service.bancos'


const EditarPersonal = () => {
    const { id } = useParams()
    const [personal, setPersonal] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [bancos, setBancos] = useState([])
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

        setErrors(errors)
        return errors
    }

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            const data = Object.fromEntries(new FormData(e.currentTarget))

            const validationErrors = validate(data)
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            const dataf = { ...data, activo: personal?.activo }
            const response = await updatePersonal(id, dataf)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors({ ...errors, [name]: null })
        setPersonal({ ...personal, [name]: value })
    }
    const handleCheckboxChange = (e) => {
        setPersonal({ ...personal, activo: e.target.checked })
        // setErrors({ ...errors, activo: null })
    }
    useEffect(() => {
        getPersonalById(id, setPersonal)
        getBancos()
        .then(res => {
            setBancos(res)
        })

    }, [id])
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col gap-2 shadow-md p-4 rounded-xl w-1/3 mx-auto'>
                    <h1 className='text-2xl font-semibold'>Informacion Personal</h1>
                    <div className='flex flex-col gap-2'>
                        <Input label='Nombre' name='nombre' value={personal?.nombre} errorMessage={errors?.nombre?.message} isInvalid={errors?.nombre?.isInvalid} onChange={(e) => handleChange(e)} />
                        <Input label='DNI' name='dni' value={personal?.dni} errorMessage={errors?.dni?.message} isInvalid={errors?.dni?.isInvalid} onChange={(e) => handleChange(e)} />
                        {/* <DatePicker label='Fecha de ingreso' name='ingreso' value={personal?.ingreso} /> */}

                        <Checkbox
                            label='Estado'
                            name='activo'
                            value={personal?.activo}
                            isSelected={personal?.activo}
                            onChange={(e) => handleCheckboxChange(e)}
                        >
                            Estado {personal?.activo ? 'activo' : 'inactivo'}
                        </Checkbox>

                    </div>
                    <h1 className='text-2xl font-semibold'>Contacto</h1>
                    <div className='flex flex-col gap-2'>
                        <Input label='Telefono' name='telefono' value={personal?.DatosContacto.telefono} errorMessage={errors?.telefono?.message} isInvalid={errors?.telefono?.isInvalid} onChange={(e) => handleChange(e)} />
                        <Input label='Email' name='email' value={personal?.DatosContacto.email} errorMessage={errors?.email?.message} isInvalid={errors?.email?.isInvalid} onChange={(e) => handleChange(e)} />
                        <Input label='Direccion' name='direccion' value={personal?.DatosContacto.direccion} errorMessage={errors?.direccion?.message} isInvalid={errors?.direccion?.isInvalid} onChange={(e) => handleChange(e)} />
                    </div>
                    <h1 className='text-2xl font-semibold'>Bancarios</h1>
                    <div className='flex flex-col gap-2'>
                        <Select items={bancos} label="Banco" name="banco">
                            {(banco) => (
                                <SelectItem key={banco.id} value={banco.nombre}>{banco.nombre}</SelectItem>
                            )}
                        </Select>
                        {/* <Input label="Banco" name='banco' value={personal?.DatosBancarios.banco} errorMessage={errors?.banco?.message} isInvalid={errors?.banco?.isInvalid} onChange={(e) => handleChange(e)} /> */}
                        <Input label="Cuenta" name='cuenta' value={personal?.DatosBancario.numero_cuenta} errorMessage={errors?.cuenta?.message} isInvalid={errors?.cuenta?.isInvalid} onChange={(e) => handleChange(e)} />
                        <Input label="CBU" name='cbu' value={personal?.DatosBancario.tipo_cuenta} errorMessage={errors?.cbu?.message} isInvalid={errors?.cbu?.isInvalid} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='flex justify-end'>
                        <Button type='submit' color='primary' className='mt-4' isLoading={loading}>Guardar</Button>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default EditarPersonal

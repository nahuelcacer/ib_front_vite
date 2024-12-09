import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { createBanco, getBancos } from '../../service/service.bancos'

const Administracion = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [bancos, setBancos] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setIsOpen(false)
        const response = await createBanco(data)
        setBancos([...bancos, response])
    }
    useEffect(() => {
        const fetchBancos = async () => {
            const response = await getBancos()
            setBancos(response)
        }
        fetchBancos()
    }, [bancos])
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Administracion</h1>
            <div className="flex flex-col gap-4 w-[50%]">
                <div>
                    <h1>Bancos</h1>
                    <Table >
                        <TableHeader>
                            <TableColumn>Nombre</TableColumn>
                            <TableColumn>Codigo</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {bancos.map((banco) => (
                                <TableRow key={banco.id}>
                                    <TableCell>{banco.nombre}</TableCell>
                                    <TableCell>{banco.codigo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsOpen(true)} color='primary'>Agregar banco</Button>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    <ModalHeader>
                        <h1>Agregar banco</h1>
                    </ModalHeader>
                    <ModalBody>
                        <form className='flex flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
                            <Input name="nombre" label='Nombre' placeholder='Nombre del banco' />
                            <Input name="codigo" label='Codigo' placeholder='Codigo del banco' />
                            <Button color='primary' type='submit'>Agregar</Button>
                        </form>
                    </ModalBody>
                   
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Administracion
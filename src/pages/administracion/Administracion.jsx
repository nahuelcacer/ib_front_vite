import { Button, Tab, Tabs } from '@nextui-org/react'
import Bancos from './Bancos'
import Personal from './Personal'
import { Link } from 'react-router-dom'



const Administracion = () => {
    return (
        <div className='flex flex-col gap-4'>
            
            <Tabs radius='md'>
                <Tab key="personal" title="Personal" >
                    <Personal />
                </Tab>
                <Tab key="bancos" title="Bancos">
                    <Bancos />
                </Tab>
                <Tab key="usuarios" title="Instituciones">
                </Tab>

            </Tabs>
            
        </div>
    )
}

const Administracions = () => {
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
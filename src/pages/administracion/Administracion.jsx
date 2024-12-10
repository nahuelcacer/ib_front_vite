import { Button, Tab, Tabs } from '@nextui-org/react'
import Bancos from './Bancos'
import Personal from './Personal'
import { useContext } from 'react'
import { ProfileContext } from '../../context/ProfileContext'


const Administracion = () => {
    const { institution_id } = useContext(ProfileContext)
    return (
        <div className='flex flex-col gap-4'>
            
            <Tabs radius='md'>
                <Tab key="personal" title="Personal" >
                    <Personal institution_id={institution_id} />
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


export default Administracion
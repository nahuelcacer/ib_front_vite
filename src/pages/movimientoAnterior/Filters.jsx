import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
const estados = [
    {
        label: "Todas las transacciones",
        value: null
    },
    {
        label: "Con comprobante",
        value: true
    },
    {
        label: "Sin comprobante",
        value: false
    }
]
const Filters = () => {
    const [filterStatus, setFilterStatus] = useState(null)
    const handleFilterStatus = (e) => {
        // console.log(selectedKeys.values())
        setFilterStatus(e.target.value)
        console.log(e.target.value)
    }
    
    return (

        <div className='flex justify-end'>
            <Select placeholder='Filtrar por estado' onChange={handleFilterStatus}>
                {estados.map(estado => (
                    <SelectItem key={estado.value}>{estado.label}</SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default Filters
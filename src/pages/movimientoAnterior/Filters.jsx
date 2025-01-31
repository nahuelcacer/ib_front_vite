import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import React from 'react'
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
    return (

        <div className='flex justify-end'>
            <Dropdown>
                <DropdownTrigger>
                    <Button>
                        {/* <ChevronDown className='h-4 w-4' /> {estados.find(estado => estado.value === filterStatus).label} */}
                        <ChevronDown className='h-4 w-4' /> 
                    </Button>
                </DropdownTrigger>
                {/* <DropdownMenu selectedKeys={new Set([filterStatus])} selectionMode="single" onSelectionChange={handleFilterStatus}> */}

                <DropdownMenu>
                    {
                        estados.map((estado) => {
                            return (
                                <DropdownItem key={estado.value} >
                                    {estado.label}
                                </DropdownItem>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Filters
import React, { useEffect, useState } from 'react'
import { getPersonal } from '../../service/service.personal'
import { Avatar, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react'
import { Link } from 'react-router-dom'

const Personal = ({ institution_id }) => {
  const [personal, setPersonal] = useState([])
  useEffect(() => {
    getPersonal(institution_id, setPersonal)
  }, [])
  return (
    <div>

      <Table topContent={
        <div className='flex justify-start'>
          <Link to="/personal/crear">
            <Button color='primary' className='mb-4'>Agregar personal</Button>
          </Link>
        </div>
      }
        shadow='sm'>
        <TableHeader>
          <TableColumn>Personal</TableColumn>
          <TableColumn>Fecha de Nacimiento</TableColumn>
          <TableColumn>Fecha de Ingreso</TableColumn>
        </TableHeader>
        <TableBody>
          {personal?.map((item) => {
            const fechaNacimiento = item.DatosPersonale.fecha_nacimiento.split('T')[0]
            const fechaNacimientoFormateada = fechaNacimiento.split('-').reverse().join('/')
            const fechaIngreso = item.ingreso.split('T')[0].split('-').reverse().join('/')

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar isBordered radius='lg' name={item.DatosPersonale.sexo[0].toUpperCase() || ''} />
                    <div>
                      <p className='font-semibold'>{item.nombre}</p>
                      <p className='text-sm text-gray-500'>{item.dni}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>{fechaNacimientoFormateada}</p>
                    <p className='text-sm text-gray-500'>{item.edad || ''} años</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>{fechaIngreso}</p>
                    <p className='text-sm text-gray-500'>{item.antiguedad || ''} años</p>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Personal

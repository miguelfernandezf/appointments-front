'use client'

import { useState } from 'react'
import Calendar20 from '@/components/calendar-20'
import ListaDoctores from '@/components/select-doctor'
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { TbDental } from "react-icons/tb"

export default function CitasView() {
    const [doctorSelected, setDoctorSelected] = useState()
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg sm:text-xl">Agenda tu cita</CardTitle>
          <CardAction>
            <TbDental className="text-2xl sm:text-3xl"/>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-6 px-4 lg:px-6">
          <div className="flex-1 space-y-4">
            <label className="block text-sm sm:text-base">Para generar tu cita, selecciona tu medico de cabecera junto con la fecha y hora.</label>
            <div className='p-4'>
              <ListaDoctores />
            </div>
          </div>
          <div className="flex-1">
            <Calendar20 />
          </div>
        </CardContent>
        <CardFooter className="text-sm sm:text-base">
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
    )
}
'use client'
import { getDoctors } from '@/lib/api'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from 'react'

type ListaDoctoresTypes = {
    setDoctorSelected: React.Dispatch<React.SetStateAction<number>>
}

type Doctor = {
  id: string
  nombre: string
}

export default function ListaDoctores() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const listaDoctores = await getDoctors();
                setDoctors( listaDoctores.data)
            } catch (error) {
                console.log("🚀 ~ fetchDoctors ~ error:", error)
            }
        }
        fetchDoctors()
    },[])

    useEffect(() => {
        console.log(doctors)
    }, [doctors])

    return (
        <>
            { doctors.length > 0 ?
                (<Select>
                    <SelectTrigger className="w-auto">
                        <SelectValue placeholder="Selecciona tu Medico" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Selecciona tu Medico</SelectLabel>
                            {
                                doctors.map(d => {
                                    return (
                                        <SelectItem key={d.id} value={d.id}>{d.nombre}</SelectItem>
                                    )
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>)
                : <p>Cargando doctores...</p>    
            }
        </>
    )
}

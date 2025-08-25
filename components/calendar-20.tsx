'use client'

import { Button } from "@/components/ui/button"
import { startOfToday } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from 'react'

export default function Calendar20() {
  const [date, setDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>()
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const totalMinutes = i * 30
    const hour = Math.floor(totalMinutes / 60) + 9
    const minute = totalMinutes % 60
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  const bookedDates = Array.from(
    { length: 3 },
    (_, i) => new Date(2025, 8, 27 + i)
  )

  return (
    <Card className="gap-0 p-0">
      <CardContent className="relative p-0 md:pr-48">
        <div className="p-6">
          <Calendar
            mode="single"
            locale={es}
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            //disabled={bookedDates}
            disabled={[{ before: startOfToday() }, (date) => [0].includes(date.getDay())]}
            showOutsideDays={false}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: "[&>button]:line-through opacity-100",
            }}
            className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
            formatters={{
              formatWeekdayName: (date) => {
                return date.toLocaleString("es-MX", { weekday: "short" })
              },
            }}
          />
        </div>
        <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
          <div className="grid gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="w-full shadow-none"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
        <div className="text-sm">
          {date && selectedTime ? (
            <>
              Su cita fue agendada para el día{" "}
              <span className="font-medium">
                {" "}
                {date?.toLocaleDateString("es-MX", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
              </span>
              a las <span className="font-medium">{selectedTime}</span>.
            </>
          ) : (
            <>Selecciona una fecha y hora para agendar tu cita.</>
          )}
        </div>
        <Button
          disabled={!date || !selectedTime}
          className="w-full md:ml-auto md:w-auto"
          variant="outline"
        >
          Agendar
        </Button>
      </CardFooter>
    </Card>
  )
}

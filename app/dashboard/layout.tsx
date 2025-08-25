'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./(overview)/data.json"
import { useState } from "react"

export default function Layout({children}: {children: React.ReactNode}) {
    const [titleSelected, setTitleSelected] = useState("Dashboard");
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" setTitleSelected={setTitleSelected}/>
      <SidebarInset>
        <SiteHeader title={titleSelected}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
           {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

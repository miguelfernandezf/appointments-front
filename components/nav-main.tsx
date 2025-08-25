"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import {
  IconDashboard,
  IconUsers,
  IconFile, 
} from "@tabler/icons-react"
import { CogIcon, UserCog } from 'lucide-react'

interface SidebarProps {
  items: {
    Id: number
    Titulo: string,
    Url: string,
    // Icono: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
    Icon: string
  }[],
  setTitleSelected: React.Dispatch<React.SetStateAction<string>>;
}

type IconComponentType = React.ComponentType<{ className?: string }>;

export function NavMain({items, setTitleSelected}: SidebarProps) {
  const router = useRouter();
  const handleClick = (url:string) => {
    const title = url.split('/')
    setTitleSelected(title[title.length-1]);
    router.push(`${url}`)
  }

  const handleIcon: Record<string, IconComponentType> = {
    "IconDashboard": IconDashboard,
    "IconUsers": IconUsers,
    "IconFile": IconFile,
    "CogIcon": CogIcon,
    "UserCog": UserCog
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem> */}
        </SidebarMenu>
        <SidebarMenu>
          {items?.map((item) => {
            const Icono = item.Icon ? handleIcon[item.Icon] : IconFile;
            return(
              <SidebarMenuItem key={item.Id}>
                <SidebarMenuButton tooltip={item.Titulo} onClick={() => handleClick(item.Url)}>
                  {<Icono />}
                  <span>{item.Titulo}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

'use client'
import {
    AlertDialog,
    AlertDialogAction,
    // AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { boolean } from "zod";
// import { AlertCircleIcon } from "lucide-react"

type CustomAlertDialogTypes = {
    open: boolean,
    title: string,
    variant: string,
    description: string,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    onErrorChange: React.Dispatch<React.SetStateAction<string>>
}

export default function CustomAlertDialog({ open, title, variant, description, onOpenChange, onErrorChange }: CustomAlertDialogTypes) {
    return (
        <AlertDialog open={open}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {/* <Alert variant={variant == "default" ? "default" : "destructive"}>
                            <AlertCircleIcon />
                            <AlertTitle>{title}</AlertTitle>
                            <AlertDescription>
                                {description}
                            </AlertDescription>
                        </Alert> */}
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                    <AlertDialogAction onClick={() => {
                        onOpenChange(false)
                        onErrorChange("")
                    }}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

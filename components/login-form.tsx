'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/api'
import { useState, useRef, useEffect } from 'react'
import type { CredentialResponse } from '@react-oauth/google'
import CustomAlertDialog from "./alert-dialog"
import { FaGoogle } from 'react-icons/fa'


const formSchema = z.object({
  correo: z.email({ error: "No es un correo valido" }),
  password: z.string().min(3, { error: "El campo es requerido" })
})

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: unknown) => void;
          renderButton: (element: HTMLElement, options: unknown) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const router = useRouter()
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      password: ""
    }
  })
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await loginUser(values)
      // Redirige al dashboard si el login fue exitoso
      if (res.status) {
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
      }else{
        setError(res.mensaje)
      }
    } catch (err) {
      setError('Credenciales inválidas' + err)
    }
      
  }

   
  const loginGooglev2 = () => {
    const redirectUri = encodeURIComponent('https://localhost:3000/auth/callback');
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=select_account`;

    window.location.href = url;
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const googleDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🧪 useEffect ejecutado');
    console.log('🔐 clientId:', clientId);

    if (!clientId) {
      console.error('❌ clientId está vacío. Verifica tu .env.local y reinicia el servidor.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('✅ Script de Google cargado');

      if (window.google && googleDivRef.current) {
        console.log('🚀 Inicializando Google ID');
        window.google?.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: CredentialResponse) => {
            console.log('🎯 Callback ejecutado');
            const idToken = response.credential;

            const res = await fetch("https://localhost:7016/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
                credentials: 'include'
              });
              const data = await res.json();
              console.log("🚀 ~ callback: ~ data:", data);
              if (res.status == 200) {
                setTimeout(() => {
                  router.push('/dashboard')
                }, 500)
              }
          },
        });

        window.google.accounts.id.renderButton(googleDivRef.current, {
          theme: 'outline',
          size: 'large',
          type: "icon",
          shape: "pill"
        });

        // Optional: auto prompt
        // window.google.accounts.id.prompt();
      } else {
        console.warn('⚠️ Google no está disponible o falta el ref');
      }
    };

    script.onerror = () => {
      console.error('❌ Error al cargar el script de Google');
    };

    document.body.appendChild(script);
  }, [clientId, router]);

  useEffect(() => {
    console.log("ERROR", error)
    if (error){
      setShowAlert(true)
    }
  },[error])
  /************************************** */
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="correo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>correo</FormLabel>
                        <FormControl>
                          <Input placeholder="correo@correo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
            {/* <div ref={googleDivRef}></div> */}
            <Button variant="outline" className="w-10 mt-4" onClick={() => loginGooglev2()}>
                {/* Login with Google */}
                <FaGoogle />
            </Button>
          </Form>
        </CardContent>
      </Card>
      <CustomAlertDialog open={showAlert} title="Error" variant="destructive" description={error} onOpenChange={setShowAlert} onErrorChange={setError}/>
    </div>
  )
}

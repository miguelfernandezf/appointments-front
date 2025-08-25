'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GoogleCallbackPage() {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const processLogin = async () => {
      if (code) {
        const res = await fetch(`${API_BASE}/auth/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // para cookie HttpOnly
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        console.log("🚀 ~ processLogin ~ data:", data)
        if (data.status) {
          router.push('/dashboard');
        } else {
          console.error('Error al autenticar:', data.message);
        }
      }
    }
    processLogin();
  });

  return <p>Procesando inicio de sesión con Google...</p>;
}

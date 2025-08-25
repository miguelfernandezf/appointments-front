
const API_BASE = process.env.NEXT_PUBLIC_API_URL

export async function loginUser(payload: { correo: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // si usas cookies HttpOnly
  })

  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function logoutUser() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

/** USER */

export async function getDoctors() {
  const res = await fetch(`${API_BASE}/user/get-doctores`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

/** DOCTOR */

export async function getDisponibilidad(idDoctor: number) {
  const res = await fetch(`${API_BASE}/doctor/get-disponibilidades`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({ idDoctor })
  });
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}
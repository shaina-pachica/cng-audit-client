export default async function loginUser(username: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    }),
    credentials: "include",
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error)
  }

  return await res.json()
}

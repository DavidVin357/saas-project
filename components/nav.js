import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../context/user'

const Nav = () => {
  const { user } = useUser()
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    setIsUser(!!user)
  }, [user])

  return (
    <nav className="flex border-b border-gray-200 py-4 px-6">
      <Link href="/">
        <a>Home</a>
      </Link>
      {!!isUser && (
        <Link href="/dashboard">
          <a className="ml-2">Dashboard</a>
        </Link>
      )}
      <Link href="/pricing">
        <a className="ml-2">Pricing</a>
      </Link>
      <div className="ml-auto">
        <Link href={isUser ? '/logout' : '/login'}>
          <a>{isUser ? 'Logout' : 'Login'}</a>
        </Link>
      </div>
    </nav>
  )
}

export default Nav

import axios from 'axios'
import { User } from '../types/User'
import { useState, useEffect } from 'react'
export default function useUpdateUser(address: string, updatedUser: any) {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const url = `https://minefm-server.herokuapp.com/user`

  useEffect(() => {
    const updateRequest = async () => {
      let req = await axios
        .put(url, updatedUser)
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    updateRequest()
  }, [address, updatedUser])
  return { user, error, isLoading }
}

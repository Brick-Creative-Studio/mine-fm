import axios from 'axios'
import { User } from '../../types/User'
import React, { useState, useEffect } from 'react'

export default function createUser(address: string, newUser: User) {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const url = `https://minefm-server.herokuapp.com/user/create`

  useEffect(() => {
    const create = async () => {
      try {
        await axios.post(url, newUser).then((res) => {
          console.log(res.data)
          return res.data
          })
          .then((res) => {
            setUser(res.data);
          }).catch((err) => {
            setError(err);
            return err
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.log('fetch user error:', error)
        setError(error as string)
      }
    }
    create()
  }, [address]);
  return { user, error, isLoading }
}

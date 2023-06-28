import axios from 'axios'
import { User } from '../../types/User'
import { useState, useEffect } from 'react'
import * as process from 'process'

export default async function fetchUser(address: string) {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const url = process.env.SERVER_BASE_URL + '/user/user'

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .post(url, {
            walletAddress: address,
          })
          .then((res) => {
            setUser(res.data);
          }).catch((err) => {
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.log('fetch user error:', error)
        setError(error as string)
      }
    }
  }, [address]);
  return { user, error, isLoading }
}

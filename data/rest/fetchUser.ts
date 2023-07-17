import axios from 'axios'
import { User } from '../../types/User'
import { useState, useEffect } from 'react'

export default function fetchUser(address: string) {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const url = 'https://minefm-server.herokuapp.com/user/user'

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
    fetch()
  }, [address]);
  return { user, error, isLoading }
}

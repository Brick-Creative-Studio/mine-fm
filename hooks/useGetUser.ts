import axios from 'axios'
import { User } from '../types/User'
import { useState, useEffect } from 'react'
import process from "process";

export default function useGetUser(address: string) {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const endpoint = 'user/user'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  console.log('addy', address)
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
        console.log('fetch user errosr:', error)
        setError(error as string)
      }
    }
    if(address){
      fetch()
    }
  }, [address]);
  return { user, error, isLoading }
}

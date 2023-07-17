import axios from 'axios'
import { User } from '../../types/User'
import React, { useState, useEffect } from 'react'
import { create } from "zustand";

export default async function createEvent(address: string, newUser: any) {
  const url = `https://minefm-server.herokuapp.com/user/create`
  try {
    await axios.post(url, newUser).then((res) => {
      console.log(res.data)
      return res.data
    })
  } catch (error) {
    console.log('fetch user error:', error)
    return error
  }

}

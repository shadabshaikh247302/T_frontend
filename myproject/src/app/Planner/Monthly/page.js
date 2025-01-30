"use client"
import dynamic from 'next/dynamic'
import React from 'react'

// import { Main } from '@/app/component/Monthly/Main'
const NOSSR=dynamic(()=>import('@/app/component/Monthly/Main'),{ssr:false})
const page = () => {
  return (
    <div >
        <NOSSR/>
    </div>
  )
}

export default page
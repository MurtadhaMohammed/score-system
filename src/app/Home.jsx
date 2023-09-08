"use client"
import { Head, PureForm, PureTable } from '@/components/home'
import React from 'react'

export const HomeCom = ({students}) => {
  return (
    <main className="min-h-screen">
      <PureTable data={students} head={<Head />} />
      <PureForm/>
    </main>
  )
}

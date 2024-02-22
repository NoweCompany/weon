import React from 'react';

interface DadosLayoutProps {
  children: React.ReactNode
}

export default function DadosLayout({ children }: DadosLayoutProps ){
  return (
    <>
      <h1>AAAAAAAA</h1>
      { children }
    </>
  )
}
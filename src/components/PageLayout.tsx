import React from 'react'
import { Container } from 'react-bootstrap'

export const PageLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Container className='my-4'>{children}</Container>
  )
}

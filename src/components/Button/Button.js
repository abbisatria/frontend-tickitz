import React from 'react'
import './Button.scss'

export default function Button (props) {
  const { className, type, onClick, children } = props
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

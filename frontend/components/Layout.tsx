import React from 'react'
import { CurrencySelector } from './CurrencySelector'

import styles from './Layout.module.scss'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Easy crypto currency price checker</h1>
      </header>
      <main>{children}</main>
      <div className={styles.selectWrapper}>
        <CurrencySelector />
      </div>
    </div>
  )
}

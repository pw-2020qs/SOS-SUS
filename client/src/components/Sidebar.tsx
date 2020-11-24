import React, { ReactNode, useState } from 'react';

import '../styles/components/Sidebar.css'

interface sideBarInterface {
  children: ReactNode,
  toggle?: string
}

const Sidebar: React.FC<sideBarInterface> = (props: sideBarInterface) => {
  const { children, toggle = 'open' } = props

  return (
    <aside className={"app-sidebar " + toggle}>
      {children}
    </aside>
  )
}

export default Sidebar;
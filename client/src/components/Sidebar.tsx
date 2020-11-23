import React from 'react';

import '../styles/components/Sidebar.css'

const Sidebar: React.FC = ({
  children,
}) => {
  return (
    <aside className="app-sidebar">
      {children}
    </aside>
  )
}

export default Sidebar;
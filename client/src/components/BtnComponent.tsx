import React, { ReactNode } from 'react';

import '../styles/components/BtnComponent.css'

interface btnInterface {
  children?: ReactNode,
  onClick?: any
}

const BtnComponent: React.FC<btnInterface> = (props: btnInterface) => {
  return (
    <button onClick={props.onClick}>{props.children}</button>
  );
}

export default BtnComponent;
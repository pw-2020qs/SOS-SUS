import React, { ReactNode } from 'react';

import '../styles/components/BtnComponent.css'

interface btnInterface {
  children?: ReactNode,
}

const BtnComponent: React.FC<btnInterface> = (props: btnInterface) => {
  return (
    <button>{props.children}</button>
  );
}

export default BtnComponent;
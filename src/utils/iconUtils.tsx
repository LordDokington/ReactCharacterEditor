import * as React from 'react';

export const buttonIcon = (faName: string) => (
  <i 
    className={"icon-margin fa " + faName} 
    aria-hidden="true"
  />
);
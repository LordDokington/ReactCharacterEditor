import * as React from 'react';

export const buttonIcon = (faName: string, additionalClasses: string = '') => (
  <i 
    className={additionalClasses + " icon-margin fa " + faName} 
    aria-hidden="true"
  />
);
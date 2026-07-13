'use client';

import React, { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface HeaderFields {
  Title?: TextField;
  Subtitle?: TextField;
}

interface HeaderProps extends ComponentProps {
  fields: HeaderFields;
}

export const Default = ({ params, fields }: HeaderProps): JSX.Element => {

  if (!fields) {
    return <p>Header data source is missing.</p>;
  }

  // Cast fields to the defined interface
  const fields1 = fields as HeaderFields;



  const { styles = '', RenderingIdentifier: id } = params;

  
  return (
    <header className={`component header ${styles}`.trim()} id={id}>
        {fields ? (
      <div className="component-content">
          <Text tag="h1" field={fields1.Title} />
          <Text tag="p" field={fields1.Subtitle} />
      </div>
        ) : (
      <div className="component-content">
          <h1>NO DATASOURCE</h1>
      </div>
        )}
    </header>
  );
};

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
  const { styles = '', RenderingIdentifier: id } = params;

  return (
    <header className={`component header ${styles}`.trim()} id={id}>
      <div className="component-content">
        {fields?.Title ? (
          <Text tag="h1" field={fields.Title} />
        ) : (
          <h1>Header</h1>
        )}
        {fields?.Subtitle ? (
          <Text tag="p" field={fields.Subtitle} />
        ) : (
          <p>Page header content goes here.</p>
        )}
      </div>
    </header>
  );
};

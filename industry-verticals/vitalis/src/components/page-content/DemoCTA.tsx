import React, { JSX } from 'react';
import {
  Text,
  Field,
  LinkField,
  Link
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type DemoCTAProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    CTA: LinkField;
    Content: Field<string>;
    Category: {
      fields: {
        Name: Field<string>;
      }
    }
  };
};

const DemoCTA = (props: DemoCTAProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <>
      <div className={`p-8 rounded-lg border border-border bg-secondary mt-12 ${sxaStyles}`}>
        <h3 className="text-xl font-bold mb-2"><Text field={props.fields.Title} /></h3>
        <p className="text-muted-foreground mb-6">
          <Text field={props.fields.Subtitle} />
        </p>
        <Link field={props.fields.CTA} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium" />
      </div>
    </>
  );
};

export const Default = DemoCTA;

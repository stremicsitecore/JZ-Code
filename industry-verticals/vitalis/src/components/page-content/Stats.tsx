import React, { JSX } from 'react'
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck, Field, Text } from '@sitecore-content-sdk/nextjs';
import { BriefcaseMedical, ClipboardCheck, FilePlus, GraduationCap, Hospital, Microscope, MonitorCheck, Users } from 'lucide-react'

export type StatsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
  }
}

const Stats = (props: StatsProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`px-4 py-16 md:py-24 bg-secondary relative ${sxaStyles}`}>
      <div className="absolute inset-0 -z-10 opacity-3">
        <img src="/abstract-medical-grid-pattern-geometric.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"><Text field={props.fields.Title} /></h2>
          <p className="text-muted-foreground text-lg"><Text field={props.fields.Subtitle} /></p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MonitorCheck, title: "25 of the top 25", desc: "U.S. Provider Systems" },
            { icon: ClipboardCheck, title: "15 of the top 15", desc: "U.S. Health Plans" },
            { icon: Microscope, title: "13 of the top 15", desc: "Global Phramaceutical Companies" },
            { icon: FilePlus, title: "3 of the top 10", desc: "U.S. Specialty Pharmacies" },
            { icon: Users, title: "416M+", desc: "Unique Lives" },
            { icon: BriefcaseMedical, title: "93B+", desc: "Medical Events" },
            { icon: GraduationCap, title: "1.1M+", desc: "Physicians" },
            { icon: Hospital, title: "706K+", desc: "Clinical Settings" },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-lg border border-border hover:border-accent transition text-center bg-card">
              <feature.icon className="w-10 h-10 text-accent mb-3" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const Default = withDatasourceCheck()<StatsProps>(Stats);

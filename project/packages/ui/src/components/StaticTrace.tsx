import { cn } from 'cn';
import React from 'react';

export interface TraceItem {
  title: string;
  element: React.ReactNode | string;
}

export function StaticTrace({
  trace,
  className,
  ...el
}: React.HTMLProps<HTMLDivElement> & {
  trace: TraceItem[];
}) {
  return (
    <section className={cn('flex flex-col w-200 h-max', className)} {...el}>
      {trace.map((tr, i) => (
        <div key={i} className="flex flex-col w-full h-max">
          <div className="p-2 flex flex-row items-center gap-2">
            <div className="rounded-full flex items-center justify-center h-8 w-8 border-white border-2 text-xs font-black">
              {i + 1}
            </div>
            <h3 className="text-lg font-medium uppercase font-mono">
              {tr.title}
            </h3>
          </div>
          <div className="ml-2 p-2 border-l-2 border-white/50 min-h-20 w-full">
            {typeof tr.element === 'string' ? (
              <p className="w-full break-words">{tr.element}</p>
            ) : (
              tr.element
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

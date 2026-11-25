import type { SVGProps } from 'react';
import type { SimpleIcon as SimpleIconData } from 'simple-icons';

type SimpleIconProps = SVGProps<SVGSVGElement> & {
  icon: SimpleIconData;
};

export function SimpleIcon({ icon, viewBox, ...props }: SimpleIconProps) {
  return (
    <svg {...props} viewBox={viewBox ?? '0 0 24 24'} className="fill-white">
      <path d={icon.path} />
    </svg>
  );
}

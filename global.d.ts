declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.scss';

declare module '*.png'  { const src: string; export default src; }
declare module '*.jpg'  { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.gif'  { const src: string; export default src; }
declare module '*.webp' { const src: string; export default src; }
declare module '*.avif' { const src: string; export default src; }

declare module '*.svg' {
    import * as React from 'react';
    const Cmp: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default Cmp;
}

declare module '*.svg?url' {
    const src: string;
    export default src;
}

declare const __isDev__: boolean;
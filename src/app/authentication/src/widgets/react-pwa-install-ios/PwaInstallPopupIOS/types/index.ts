export interface IProps {
    lang?: string;
    appIcon?: string;
    appName?: string;
    styles?: React.CSSProperties;
    delay?: number;
    force?: boolean;
    children?: React.ReactNode;
}
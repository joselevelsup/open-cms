/// <reference types="react" />
declare type GateProps = {
    locked: boolean;
    component: any;
    customLoginPane?: any;
    creds?: {
        username: string;
        password: string;
    };
};
declare const Gate: ({ locked, creds, component, customLoginPane }: GateProps) => JSX.Element;
export default Gate;

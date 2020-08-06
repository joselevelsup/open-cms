import * as React from "react";
import { UserCmsProps, UserCmsState } from "../types";
export default class UserCms extends React.Component<UserCmsProps, UserCmsState> {
    state: {
        deleteModal: boolean;
        editModal: boolean;
        users: any[];
        errorMessage: any;
        successMessage: any;
    };
    static defaultProps: {
        userRoute: string;
        userConfig: {
            name: string;
            key: string;
        }[];
    };
    retreiveUsers: () => void;
    componentDidMount(): void;
    toggleDeleteUserModal: () => void;
    deleteUser: (id: string | number) => void;
    sendResetPassword: (id: string | number) => void;
    render(): JSX.Element;
}

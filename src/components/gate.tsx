import * as React from "react";
import { useFormik } from "formik";
import { CmsInput } from "./styled/input";
import { randomId } from "../util";

type GateProps = {
	locked: boolean,
	component: any,
	customLoginPane?: any,
	creds?: { username: string, password: string }
}

interface LoginFormValues {
	username: string;
	password: string;
}

interface LoginPaneProps {
	onLogin: (values: LoginFormValues) => void
}


const LoginPane = ({ onLogin }: LoginPaneProps) => {
	const { values, handleChange, handleBlur, handleSubmit } = useFormik({
		initialValues: {
			username: "",
			password: ""
		} as LoginFormValues,
		onSubmit: onLogin,
	});

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<CmsInput className="component-input" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
				</div>
				<div>
					<CmsInput className="component-input" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
				</div>
			</form>
		</div>
	);
}

const Gate = ({ locked, creds, component, customLoginPane }: GateProps) => {

	const checkSession = (): boolean => {
		if(typeof localStorage == "undefined"){
			return false;
		} else {
			const sessionId = localStorage.getItem("sessionId");
			const sessionTime = localStorage.getItem("sessionTime"); //should come back as unix timestamp

			let d = new Date(sessionTime);
			let today = new Date();
			if(sessionId){
				if(d.getDay() - today.getDay() == 2 || d.getDay() - today.getDay() == -2) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		}
	}

	const loginUser = (values: LoginFormValues) => {
		if(creds){
			if(creds.username == values.username && creds.password == values.password){
				if(typeof localStorage != "undefined"){
					localStorage.setItem("sessionTime", Date.now().toString());
					localStorage.setItem("sessionId", randomId(6));
				}
			} else {
				alert("Wrong username and/or password");
			}
		}
	}

	const RenderComponent = component;
	const RenderLoginComponent = customLoginPane;

	if(locked){
		if(checkSession()){
			return <RenderComponent />;
		} else {
			if(customLoginPane){
				return <RenderLoginComponent onLogin={loginUser} />;
			} else {
				return <LoginPane onLogin={loginUser}/>
			}
		}
	} else {
		return <RenderComponent />;
	}
}

export default Gate;
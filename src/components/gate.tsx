import * as React from "react";

type GateProps = {
	locked: boolean,
	component: React.ReactNode
}

type LoginPaneProps = {

}

const LoginPane: React.FC = ({}: LoginPaneProps) => {
	return (
		<div></div>
	);
}

const Gate: React.FC = ({ locked, component }: GateProps) => {

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

	if(locked){
		if(checkSession()){
			return component;
		} else {
			return <div>Need Login</div>
		}
	} else {
		return component;
	}
}

export default Gate;

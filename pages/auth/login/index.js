import styles from "./login.module.css";
export default function Login() {
	useEffect(() => {
		login();
	}, []);
	function login() {}
	return <div className={styles.title}>login</div>;
}

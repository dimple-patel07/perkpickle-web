import { useEffect } from "react";
import { useRouter } from "next/router";
import { store, useAppDispatch } from "../redux/store";
import Header from "../component/header";
import Footer from "../component/footer";
import { tokenExpired } from "../services/token";
import { getLocalStorage, setLocalStorage } from "./config";

const withAuth = (WrappedComponent, requireAuth = true) => {
	const AuthComponent = (props) => {
		const dispatch = useAppDispatch();
		const token = store.getState();
		const router = useRouter();
		useEffect(() => {
			if (requireAuth && token && typeof window !== "undefined") {
				window.addEventListener("visibilitychange", () => {
					if (document.hidden) {
						setLocalStorage("loggedTime", Date.now()); // set time to check idle time
					} else {
						let minutes = 0;
						const IDLE_SESSION_TIME = 15; // MINUTES
						if (getLocalStorage("loggedTime")) {
							const diff = Date.now() - getLocalStorage("loggedTime");
							minutes = Math.floor(diff / 1000 / 60) % 60;

							if (minutes > IDLE_SESSION_TIME) {
								tokenExpired(dispatch, router);
							} else {
								setLocalStorage("loggedTime", Date.now()); // set time to check idle time
							}
						}
					}
				});
			}
		}, []);
		useEffect(() => {
			if ((requireAuth && !token?.EmailStore?.token) || (!requireAuth && token?.EmailStore?.token)) {
				router.replace(requireAuth ? "/" : "/dashboard");
			}
		}, [token, router, requireAuth]);

		return requireAuth === !!token?.EmailStore?.token ? (
			<>
				<Header />
				<WrappedComponent {...props} />
				<Footer />
			</>
		) : null;
	};

	return AuthComponent;
};

export default withAuth;

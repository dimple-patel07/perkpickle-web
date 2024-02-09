import { useEffect } from "react";
import { useRouter } from "next/router";
import { store } from "../redux/store";
import Header from "../component/header";
import Footer from "../component/footer";

const withAuth = (WrappedComponent, requireAuth = true) => {
  const AuthComponent = (props) => {
    const token = store.getState();
    const router = useRouter();
    useEffect(() => {
      if (
        (requireAuth && !token?.EmailStore?.token) ||
        (!requireAuth && token?.EmailStore?.token)
      ) {
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

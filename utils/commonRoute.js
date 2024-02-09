import Header from "../component/header";
import Footer from "../component/footer";

const commonRoute = (WrappedComponent) => {
  const CommonComponent = (props) => {
    return (
      <>
        <Header />
        <WrappedComponent {...props} />
        <Footer />
      </>
    );
  };

  return CommonComponent;
};

export default commonRoute;

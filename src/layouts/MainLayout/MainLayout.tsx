import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import css from "./MainLayout.module.css";

function MainLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <div className={isHomePage ? css.homeLayout : css.innerLayout}>
      <Header isHomePage={isHomePage} />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

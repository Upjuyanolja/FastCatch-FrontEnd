import "./header.scss";

import { useLocation, useNavigate } from "react-router-dom";

import MyInfo from "./myInfo/MyInfo";
import SearchFilter from "./searchFilter/SearchFilter";
import CategoryFilter from "./categoryFilter/CategoryFilter";

import LogoutButton from "./logoutButton/LogoutButton";
import { Button } from "..";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const moveToLoginHandler = () => {
    navigate("/login");
  };

  const clickLogoHandler = () => {
    navigate("/");
  };

  return (
    <>
      <header className="header-container">
        <div className="header-container__inner">
          <section className="header-container__left">
            <div className="header-container__logo" onClick={clickLogoHandler}>
              빨리잡아!
            </div>
          </section>
          <section className="header-container__center">
            <SearchFilter />
          </section>
          <section className="header-container__right">
            {localStorage.getItem("accessToken") ? ( //
              <>
                <LogoutButton />
                <MyInfo />
              </>
            ) : (
              <Button
                text="로그인"
                buttonSize="small"
                shape="fill"
                colorName="coral500"
                onClick={moveToLoginHandler}
              />
            )}
          </section>
        </div>
      </header>
      {location.pathname === "/" && <CategoryFilter />}
    </>
  );
};

export default Header;

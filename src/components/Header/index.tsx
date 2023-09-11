import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchPosts, setKeyword, setToggle } from "../../features/ItemSlice";
import { FiSearch } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { HeaderStateProps, HeaderProps } from "../../types";
import styles from "./Header.module.css";

export const Header: React.FC<HeaderProps> = ({ search }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { keyword, category_id, toggle } = useSelector(
    (state: HeaderStateProps) => state,
  );
  const myRef = useRef(null);

  const handleToggle = () => {
    dispatch(setToggle(!toggle));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
    dispatch(fetchPosts(category_id));
  };

  const handleClickOutside = (event) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      dispatch(setToggle(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Link to={`/`}>Merpay</Link>
      </div>
      {search && (
        <>
          <div className={styles.search}>
            <div className={styles.inputContainer}>
              <input
                placeholder="Search..."
                onChange={handleSearch}
                value={keyword}
              />
              <FiSearch size={18} />
            </div>
          </div>
          <div className={styles.menuButton} onClick={handleToggle} ref={myRef}>
            <FiMenu size={22} />
          </div>
        </>
      )}
    </div>
  );
};

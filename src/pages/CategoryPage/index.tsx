import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchPosts, setCategoryId } from "../../features/ItemSlice";
import { FiChevronRight } from "react-icons/fi";
import { fetchCategories } from "../../features/ItemSlice";
import { CategoryProps } from "../../types";
import styles from "./CategoryPage.module.css";

export const CategoryPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { categories, category_id, toggle } = useSelector(
    (state: CategoryProps) => state,
  );
  const [initialCatgoryId] = useState("-1");

  const handleClick = (id: number) => {
    dispatch(fetchPosts(id.toString()));
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ul className={`${styles.category} ${toggle ? styles.toggle : ""}`}>
        {categories.data?.length > 0 && (
          <>
            <li
              onClick={() => handleClick(Number(initialCatgoryId))}
              className={
                category_id.toString() === initialCatgoryId ? styles.active : ""
              }
            >
              <span>すべて</span>
              <FiChevronRight size={16} />
            </li>
            {categories.data.map((category) => (
              <li
                key={category.id}
                onClick={() => handleClick(category.id)}
                className={category_id === category.id ? styles.active : ""}
              >
                <span>{category.name}</span>
                <FiChevronRight size={16} />
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

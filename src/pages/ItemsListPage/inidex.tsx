import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Item } from "../../components/Item";
import { fetchPosts } from "../../features/ItemSlice";
import { ItemListProps } from "../../types";
import styles from "./ItemsListPage.module.css";

export const ItmesListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { items, category_id } = useSelector((state: ItemListProps) => state);

  useEffect(() => {
    dispatch(fetchPosts(category_id));
  }, [category_id, dispatch]);
  return items.data?.length > 0 ? (
    <div className={styles.container}>
      {items.data.map((item, index) => (
        <Item key={index} id={item.id} isLink={true} item={item} />
      ))}
    </div>
  ) : (
    <div className={styles.noData}>No result</div>
  );
};

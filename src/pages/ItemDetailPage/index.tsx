import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Header } from "../../components/Header";
import { SocialButtons } from "../../components/SocialButtons";
import { fetchItemById } from "../../features/ItemSlice";
import { FiFlag } from "react-icons/fi";
import { FaYenSign } from "react-icons/fa";
import { ItemProps } from "../../types";
import styles from "./ItemDetailPage.module.css";

const Description = ({ description }) => (
  <div
    className={styles.description}
    dangerouslySetInnerHTML={{ __html: description || "" }}
  />
);

const Price = ({ price, shipping_fee }) => (
  <div className={styles.price}>
    <div>
      <FaYenSign size={16} />
      {price.toLocaleString()}
    </div>
    <div className={styles.fee}>{shipping_fee}</div>
  </div>
);

export const ItemDetailPage = () => {
  let { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const item = useSelector((state: ItemProps) => state.item);
  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Header search={false} />
      <div className={styles.main}>
        {item && (
          <div className={styles.container}>
            <img src={item?.image} alt="img" />
            <div className={styles.name}>{item.name}</div>
            <div className={styles.setting}>
              <SocialButtons
                like_count={item.like_count}
                comment_count={item.comment_count}
              />
              <div className={styles.flag}>
                <FiFlag size={16} />
              </div>
            </div>
            <div className={styles.descriptionTitle}>Description</div>
            <Description description={item.description} />
            <div className={styles.priceContainer}>
              <Price price={item.price} shipping_fee={item.shipping_fee} />
              <div className={styles.button}>Button</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

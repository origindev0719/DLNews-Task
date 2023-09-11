import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaYenSign } from "react-icons/fa";
import styles from "./Item.module.css";

export const Item = ({ id, isLink = false, item }) => {
  const content = (
    <div className={styles.container}>
      <div>
        <img src={item.image} alt="img" />
        <div className={styles.description}>
          <div className={styles.top}>{item.name}</div>
          <div className={styles.bottom}>
            <span>
              <FaYenSign />
              {item.price.toLocaleString()}
            </span>
            {item.like_count > 0 && (
              <span className={styles.like}>
                <FiHeart />
                {item.like_count}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return isLink ? <Link to={`/item/${id}`}>{content}</Link> : content;
};

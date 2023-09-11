import { FiHeart, FiMessageSquare } from "react-icons/fi";
import styles from "./Socialbuttons.module.css";

export const SocialButtons = ({ like_count, comment_count }) => (
  <div>
    <div className={styles.like}>
      <span>
        <FiHeart size={16} />
        <span>Like</span>
      </span>
      <div>{like_count}</div>
    </div>
    <div className={styles.commentContainer}>
      <span className={styles.comments}>
        <FiMessageSquare size={16} />
        <span>Comment</span>
      </span>
      <div>{comment_count}</div>
    </div>
  </div>
);

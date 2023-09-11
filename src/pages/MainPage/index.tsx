import { Header } from "../../components/Header";
import { CategoryPage } from "../CategoryPage";
import { ItmesListPage } from "../ItemsListPage/inidex";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <Header search={true} />
      <div className={styles.main}>
        <CategoryPage />
        <ItmesListPage />
      </div>
    </div>
  );
};

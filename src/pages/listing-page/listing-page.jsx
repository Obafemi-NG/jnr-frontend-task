import CartOverlay from "../../components/cart-overlay/cart-overlay";
import styles from "./listing-page.module.css";

const ListingPage = () => {
  return (
    <div className={styles.overview}>
      <CartOverlay />
      <div className={styles.title}> Category Name</div>
    </div>
  );
};

export default ListingPage;

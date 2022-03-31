import CartOverlay from "../../components/cart-overlay/cart-overlay";

import { connect } from "react-redux";

// import { toggleCart } from "../../redux/cart/cart.action";

import styles from "./listing-page.module.css";

const ListingPage = ({ hidden }) => {
  return (
    <div className={styles.overview}>
      {hidden ? null : <CartOverlay />}
      <div className={styles.title}> Category Name</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
});

export default connect(mapStateToProps)(ListingPage);

import React from "react";
import styles from "./attribute-box.module.css";

class AttributeBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleAttribute = this.handleAttribute.bind(this);
  }

  handleAttribute = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <button
        className={styles["attribute-button"]}
        onClick={this.handleAttribute}
      >
        512GB
      </button>
    );
  }
}

export default AttributeBox;

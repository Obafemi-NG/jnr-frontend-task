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
    const { children } = this.props;
    return (
      <button
        className={styles["attribute-button"]}
        onClick={this.handleAttribute}
      >
        {children}
      </button>
    );
  }
}

export default AttributeBox;

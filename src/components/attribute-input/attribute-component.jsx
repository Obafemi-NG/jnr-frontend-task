import { PureComponent } from "react";
import { connect } from "react-redux";
import { addAttribute } from "../../redux/attribute/attribute.action";
import styles from "./attribute-component.module.css";
import AttributeInput from "./attribute-input";

class Attribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {},
    };
  }
  changeHandler = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  render() {
    const { attribute, addItemAttr } = this.props;
    return (
      <span key={attribute.id}>
        <h4 className={styles["attribute-title"]}>
          {" "}
          {`${attribute.name.toUpperCase()} :`}{" "}
        </h4>
        <div className={styles.attributes}>
          {attribute.items.map((item) => {
            return (
              <span key={item.id}>
                <div
                  onClick={() => addItemAttr({ [attribute.name]: item.value })}
                  className={styles["attribute-box"]}
                >
                  <AttributeInput
                    key={item.id}
                    onSelect={this.changeHandler}
                    itemValue={item.value}
                    selectedId={this.state.selectedId}
                    itemId={item.id}
                    attributeType={attribute.type}
                  />
                </div>
              </span>
            );
          })}
        </div>
      </span>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItemAttr: (attribute) => dispatch(addAttribute(attribute)),
});

export default connect(null, mapDispatchToProps)(Attribute);

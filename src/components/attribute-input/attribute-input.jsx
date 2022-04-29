import { PureComponent } from "react";

class AttributeInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
    };
  }
  changeHandler = (value, id) => {
    if (value) {
      this.props.onSelect(id);
    } else {
      // option de-select.
    }
  };
  render() {
    const { itemId, selectedId, itemValue, attributeType, checked } =
      this.props;
    const isChecked = itemId === selectedId;
    return (
      <div>
        <input
          type="checkbox"
          onChange={(e) => this.changeHandler(e.target.checked, itemId)}
          name="attribute"
          id={itemId}
          checked={isChecked}
        />
        <label
          style={{
            backgroundColor: itemValue,
            minWidth: "30px",
          }}
          htmlFor={itemValue}
        >
          {attributeType === "swatch" ? " " : itemValue}{" "}
        </label>
      </div>
    );
  }
}

export default AttributeInput;

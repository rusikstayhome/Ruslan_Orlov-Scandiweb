import React from 'react';

import './Attributes.css';

class Attributes extends React.Component {
  constructor() {
    super();
    this.state = {
      attributes: {
        activeAttribute: {},
        color: null,
      },
    };
  }

  setcolor = (value) => {
    this.setState((prevState) => ({
      attributes: {
        color: value,
        activeAttribute: prevState.attributes.activeAttribute,
      },
    }));
  };

  setActiveAttribute = (key, value) => {
    this.setState((prevState) => ({
      attributes: {
        color: prevState.attributes.color,
        activeAttribute: {
          ...prevState.attributes.activeAttribute,
          [key]: value,
        },
      },
    }));
  };

  render() {
    const attributes = this.props.obj;

    return (
      <div>
        {attributes.map((obj) => (
          <div key={obj.name}>
            <h3>{obj.name}:</h3>
            {obj.name === 'Color'
              ? obj.items.map((item) => (
                  <span
                    key={item.displayValue}
                    className={`product-attributes__color ${
                      this.state.attributes.color === item.displayValue
                        ? 'product-attributes__color-active'
                        : ''
                    }`}
                    style={{ backgroundColor: item.displayValue }}
                    onClick={() => this.setcolor(item.displayValue)}></span>
                ))
              : obj.items.map((item) => {
                  return (
                    <span
                      key={item.displayValue}
                      className={`product-attributes__all ${
                        this.state.attributes.activeAttribute[obj.name] === item.displayValue
                          ? 'product-attributes__all-active'
                          : ''
                      }`}
                      onClick={() => this.setActiveAttribute(obj.name, item.displayValue)}>
                      {item.value}
                    </span>
                  );
                })}
          </div>
        ))}
      </div>
    );
  }
}

export default Attributes;

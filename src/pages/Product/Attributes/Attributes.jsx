import { assertDirective } from 'graphql';
import React from 'react';

import './Attributes.css';

class Attributes extends React.Component {
  constructor() {
    super();
    this.state = {
      attributes: {
        activeAttribute: null,
        activeColorAttribute: null,
      },
    };
  }

  setActiveColorAttribute = (value) => {
    this.setState((prevState) => ({
      attributes: {
        activeColorAttribute: value,
        activeAttribute: prevState.attributes.activeAttribute,
      },
    }));
  };

  setActiveAttribute = (key, value) => {
    this.setState((prevState) => ({
      attributes: {
        activeColorAttribute: prevState.attributes.activeColorAttribute,
        activeAttribute: value,
      },
    }));
  };

  render() {
    const obj = this.props.obj;
    console.log(obj);
    return (
      <div key={obj.name}>
        <h3>{obj.name}:</h3>
        {/* {obj.filter()} */}
        {/* {obj.name === 'Color'
          ? obj
              .filter((a) => a.name === 'Color')
              .items.map((item) => (
                <span
                  key={item.displayValue}
                  className={`product-attributes__color ${
                    this.state.attributes.activeColorAttribute === item.displayValue
                      ? 'product-attributes__color-active'
                      : ''
                  }`}
                  style={{ backgroundColor: item.displayValue }}
                  onClick={() => this.setActiveColorAttribute(item.displayValue)}></span>
              ))
          : obj.items.map((item) => (
              <span
                key={item.displayValue}
                className={`product-attributes__all ${
                  this.state.attributes.activeAttribute === item.displayValue
                    ? 'product-attributes__all-active'
                    : ''
                }`}
                onClick={() => this.setActiveAttribute(obj.name, item.displayValue)}>
                {item.value}
              </span>
            ))} */}
      </div>
    );
  }
}

export default Attributes;

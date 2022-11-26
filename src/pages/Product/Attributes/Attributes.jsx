import React from 'react';

import './Attributes.css';

class Attributes extends React.Component {
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
                      this.props.attributes?.color === item.displayValue
                        ? 'product-attributes__color-active'
                        : ''
                    }`}
                    style={{ backgroundColor: item.displayValue }}
                    onClick={() => this.props.setColor(item.displayValue)}></span>
                ))
              : obj.items.map((item) => {
                  return (
                    <span
                      key={item.displayValue}
                      className={`product-attributes__all ${
                        this.props.attributes?.activeAttribute[obj.name] === item.displayValue
                          ? 'product-attributes__all-active'
                          : ''
                      }`}
                      onClick={() => this.props.setActiveAttribute(obj.name, item.displayValue)}>
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

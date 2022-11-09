import React from 'react'



import './Tabs.css'

class Tabs extends React.Component{
    render() {
        return (
            <>
                <div className='tabs'>{this.props.name.name}</div>
            </>
          )
    }
  
}
export default Tabs
import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text
    }
  }
  componentDidMount() {
    this.interval = window.setInterval(() => {
      // console.log(this.state.content)

      if(this.state.content === `${this.state.content}....`) {
        this.setState({
          content: this.props.text
        })
      }
      this.setState(({content}) => ({ content: content + '.'}))
    },this.props.speed)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
  render(){
    const style = {
      textAlign: 'center',
      fontSize: '26px',
      fontWeight: '700'
    }
    return(
      <p style={style}>{this.state.content}</p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
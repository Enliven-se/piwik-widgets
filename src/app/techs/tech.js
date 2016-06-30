const TechStyles = {
  tech: {
    height: '15rem',
    width: '15rem',
    border: '1px solid lightgray',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '1rem'
  },
  logo: {
    width: '5rem',
    height: '5rem',
    float: 'right',
    margin: '0 0 .5rem .5rem'
  },
  h3: {
    fontSize: '1.5rem',
    margin: '0 0 2rem 0'
  }
};

class Tech extends React.Component {
  render() {
    return (
      <div style={TechStyles.tech}>
        <img style={TechStyles.logo} src={this.props.tech.logo}/>
        <h3 style={TechStyles.h3}>
          {this.props.tech.title}
        </h3>
        <p>{this.props.tech.text1}</p>
        <p>{this.props.tech.text2}</p>
      </div>
    );
  }
}

Tech.propTypes = {
  tech: React.PropTypes.object.isRequired
};

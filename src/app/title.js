const TitleStyles = {
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#cf4646',
    color: 'white'
  },
  h1: {
    fontWeight: 300,
    fontSize: '4rem',
    margin: '1rem'
  },
  logo: {
    height: '12rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    margin: '1rem'
  },
  h2: {
    fontWeight: 300,
    fontSize: '2rem',
    margin: '.5rem'
  }
};

class Title extends React.Component {
  render() {
    return (
      <div style={TitleStyles.title}>
        <h1 style={TitleStyles.h1}>'Allo, 'Allo!</h1>
        <div>
          <img style={TitleStyles.logo} src="http://fountainjs.io/assets/imgs/yeoman.png"/>
          <img style={TitleStyles.logo} src="http://fountainjs.io/assets/imgs/fountain.png"/>
        </div>
        <h2 style={TitleStyles.h2}>Always a pleasure scaffolding your apps.</h2>
      </div>
    );
  }
}

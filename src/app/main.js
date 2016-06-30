const MainStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

class Main extends React.Component {
  render() {
    return (
      <div style={MainStyles.container}>
        <Header/>
        <main style={MainStyles.main}>
          <Title/>
          <Techs/>
        </main>
        <Footer/>
      </div>
    );
  }
}

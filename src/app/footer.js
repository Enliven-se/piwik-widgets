const FooterStyles = {
  footer: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#1f1f1f',
    textAlign: 'center',
    color: 'white'
  }
};

class Footer extends React.Component {
  render() {
    return (
      <footer style={FooterStyles.footer}>
        Build with ♥ by the&nbsp;
        <a href="https://github.com/orgs/FountainJS/people">
          FountainJS team
        </a>
      </footer>
    );
  }
}

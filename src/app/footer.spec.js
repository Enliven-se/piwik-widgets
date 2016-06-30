describe('Footer', () => {
  it('should be a footer', () => {
    const footer = React.addons.TestUtils.renderIntoDocument(<Footer/>);
    const footerNode = ReactDOM.findDOMNode(footer);
    expect(footerNode.tagName).toEqual('FOOTER');
  });
});

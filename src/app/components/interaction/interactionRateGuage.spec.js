describe('InteractionRateGuage component', () => {
  it('should render default text', () => {
    const interactionRateGuage = React.addons.TestUtils.renderIntoDocument(<InteractionRateGuage/>);
    const p = React.addons.TestUtils.findRenderedDOMComponentWithTag(interactionRateGuage, 'p');
  });
});

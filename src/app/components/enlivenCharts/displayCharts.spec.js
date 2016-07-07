describe('DisplayCharts component', () => {
  it('should render default text', () => {
    const displayCharts = React.addons.TestUtils.renderIntoDocument(<DisplayCharts/>);
    const p = React.addons.TestUtils.findRenderedDOMComponentWithTag(displayCharts, 'p');
  });
});

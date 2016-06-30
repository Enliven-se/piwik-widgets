const HeaderStyles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f1f1f'
  },
  date: {
    flex: 1,
    textAlign: 'center',
    fontSize: '1.5rem',
    margin: '1rem',
    color: 'white'
  },
  chartAlign: {
    alignItems: 'left'
  }
};

let Gauge = React.createClass({
  getInitialState() {
    const state = {
      getAPI: "http://demo.piwik.org/index.php?module=API&method=API.get&format=JSON&idSite=7&period=year&date=2016-05-30,2016-06-28&date=2016-05-30%2C2016-06-28&filter_limit=false&format_metrics=1&expanded=1&token_auth=anonymous&filter_limit=30",
      dataR: ''
    };
    return state;
  },

  componentDidMount() {
    this._interactionChart(this.state.getAPI);
  },

  _getLiveData(apiLink) {
    return $.ajax({
      url: apiLink,
      dataType: 'jsonp',
      cashe: false,
      crossDomain: true,
      success: function (data) {
        console.log(`data received: ${JSON.stringify(data)}`);
        this.setState({
          dataR: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  },

  _interactionChart(apiLink) {
    this._getLiveData(apiLink).done(function (data) {
      const interactionRate = ((data['2016'].nb_visits - data['2016'].bounce_count) / data['2016'].nb_visits * 100).toFixed(2);
      console.log(`interactionRate: ${interactionRate}%`);
      c3.generate({
        bindto: '#chart_1',
        data: {
          columns: [
            ['data', interactionRate]
          ],
          type: 'gauge'
        }
      });
    });
  },

  render() {
    return (
      <div id="chart_1"></div>
    );
  }
});

class InteractionRateGuage extends React.Component {
  render() {
    return (
      <div>
        <header style={HeaderStyles.header}>
          <p style={HeaderStyles.date}>
              Enliven Charts
          </p>
        </header>
        <div style={HeaderStyles.chartAlign}><Gauge/></div>
      </div>
    );
  }
}

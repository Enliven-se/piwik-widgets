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
      baseAPI: "http://demo.piwik.org/index.php?",
      interactionRateAPI: "module=API&method=API.get&format=JSON&idSite=7&period=year&date=2016-05-30,2016-06-28&date=2016-05-30%2C2016-06-28&filter_limit=false&format_metrics=1&expanded=1&token_auth=anonymous&filter_limit=30",
      dataR: ''
    };
    return state;
  },

  componentDidMount() {
    this._interactionChart(this.state.baseAPI + this.state.interactionRateAPI);
  },

  _getLiveData(apiLink) {
    return $.ajax({
      url: apiLink,
      dataType: 'jsonp',
      cashe: false,
      crossDomain: true,
      success: function (data) {
        console.log(`data received from api: ${apiLink} is \n ${JSON.stringify(data)}`);
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
      const interactionChart = c3.generate({
        bindto: '#chart_1',
        data: {
          columns: [
            ['data', interactionRate]
          ],
          type: 'gauge'
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        size: {
          height: 180
        }
      });
      setTimeout(() => {
        interactionChart.load({
          columns: [['data', 10]]
        });
      }, 1000);
      setTimeout(() => {
        interactionChart.load({
          columns: [['data', 50]]
        });
      }, 2000);
      setTimeout(() => {
        interactionChart.load({
          columns: [['data', 70]]
        });
      }, 3000);
      setTimeout(() => {
        interactionChart.load({
          columns: [['data', 100]]
        });
      }, 4000);
      setTimeout(() => {
        interactionChart.load({
          columns: [['data', interactionRate]]
        });
      }, 5000);
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

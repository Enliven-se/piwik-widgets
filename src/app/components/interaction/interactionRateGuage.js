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
    align: 'left'
  }
};

class InteractionRateGuage extends React.Component {
  componentDidMount() {
    this._interactionChart(`${this.props.baseAPI}${this.props.authtoken}&period=${this.props.period}&date=${this.props.fromDate},${this.props.toDate}&idSite=${this.props.siteId}`);
    //  this._lineChart(this.state);
  }

  _getLiveData(apiLink) {
    return $.ajax({
      url: apiLink,
      dataType: 'jsonp',
      cashe: false,
      crossDomain: true,
      success: function (data) {
        console.log(`data received from api: ${apiLink} is \n ${JSON.stringify(data)}`);
      }.bind(),
      error: function (xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind()
    });
  }

  _interactionChart(apiLink) {
    this._getLiveData(apiLink).done(data => {
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
    });
  }

  render() {
    return (
      <div>
        <header style={HeaderStyles.header}>
          <p style={HeaderStyles.date}>
              Enliven Charts
          </p>
        </header>
        <div style={HeaderStyles.chartAlign} id="chart_1"></div>
      </div>
    );
  }
}

InteractionRateGuage.propTypes = {
  baseAPI: React.PropTypes.string,
  authtoken: React.PropTypes.string,
  period: React.PropTypes.string,
  date: React.PropTypes.string,
  fromDate: React.PropTypes.string,
  toDate: React.PropTypes.string,
  siteId: React.PropTypes.string,
  offlineData: React.PropTypes.arrayOf(React.PropTypes.string)
};
InteractionRateGuage.defaultProps = {
  //  offlineData: {"2016": {"nb_visits": 18, "bounce_count": 9}}
};

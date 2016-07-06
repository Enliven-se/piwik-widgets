class PiwikAPI {
  constructor(baseAPI, authtoken, period, fromDate, toDate, siteId) {
    this.baseAPI = baseAPI;
    this.authtoken = authtoken;
    this.period = period;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.siteId = siteId;
  }

  generalMetrics() {
    const apiLink = `${this.baseAPI}${this.authtoken}&period=${this.period}&date=${this.fromDate},${this.toDate}&idSite=${this.siteId}`;
    console.log(`api link constructed is: ${apiLink}`);
    return this.ajaxCall(apiLink);
  }

  ajaxCall(apiLink) {
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
}

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
  charts: {
    flex: 1,
    textAlign: 'left',
    fontSize: '1rem',
    margin: '1rem',
    align: 'left'
  }
};

class InteractionRateGuage extends React.Component {
  componentDidMount() {
    this._interactionChart();
    //  this._timeseriesChart("http://duskywing.enliven.se/index.php?module=API&method=API.get&format=JSON&&token_auth=e06756f6aaccba2f6da411342f2fecfa&period=day&date=2016-06-28,today&idSite=1");
  }

  _interactionChart() {
    const piwikapi = new PiwikAPI(this.props.baseAPI, this.props.authtoken, this.props.period, this.props.fromDate, this.props.toDate, this.props.siteId);
    piwikapi.generalMetrics().done(data => {
      const interactionRate = ((data['2016'].nb_visits - data['2016'].bounce_count) / data['2016'].nb_visits * 100).toFixed(2);
      c3.generate({
        bindto: '#chart_1',
        data: {
          columns: [
            ['data', interactionRate]
          ],
          type: 'gauge'
        }
      });
      c3.generate({
        bindto: '#chart_2',
        data: {
          columns: [
            ['data', data['2016'].bounce_rate.replace("%", "")]
          ],
          type: 'gauge'
        }
      });
    });
  }

  _timeseriesChart() {
    this._getLiveData().done(data => {
      const interactionRate = ((data['2016'].nb_visits - data['2016'].bounce_count) / data['2016'].nb_visits * 100).toFixed(2);
      console.log(`interactionRate: ${interactionRate}%`);
      c3.generate({
        bindto: '#chart_3',
        data: {
          x: 'x',
          columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06', '2013-01-07'],
            ['data1', 30, 200, 100, 400, 150, 250, 350],
            ['data2', 130, 340, 200, 500, 250, 350, 450]
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
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
        <div>
          <p style={HeaderStyles.charts}>Interaction Rate Guage</p>
          <div id="chart_1"></div>
        </div>
        <div>
          <p style={HeaderStyles.charts}>Bounce Rate Guage</p>
          <div id="chart_2"></div>
        </div>
        <div>
          <p style={HeaderStyles.charts}>Impression's, Interaction's timeseries</p>
          <div id="chart_3"></div>
        </div>
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

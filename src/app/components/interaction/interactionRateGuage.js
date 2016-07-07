const BootstrapTable = ReactBootstrap.BootstrapTable;

class PiwikAPI {
  constructor(baseAPI, authtoken) {
    this.baseAPI = baseAPI;
    this.authtoken = authtoken;
  }

  generalMetrics(period, fromDate, toDate, siteId, method) {
    const apiLink = `${this.baseAPI}${this.authtoken}&period=${period}&date=${fromDate},${toDate}&idSite=${siteId}&method=${method}`;
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
    this._renderCharts();
  }

  _renderCharts() {
    const piwikapi = new PiwikAPI(this.props.baseAPI, this.props.authtoken);

    piwikapi.generalMetrics("year", this.props.fromDate, this.props.toDate, this.props.siteId, this.props.method).done(data => {
      const year = new Date().getFullYear();
      const interactions = data[year].nb_visits - data[year].bounce_count;
      const interactionRate = (interactions / data[year].nb_visits * 100).toFixed(2);

      c3.generate({
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
        }
      });

      c3.generate({
        bindto: '#chart_2',
        data: {
          columns: [
            ['data', data[year].bounce_rate.replace("%", "")]
          ],
          type: 'gauge'
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
          threshold: {
            values: [30, 60, 90, 100]
          }
        }
      });
    });

    piwikapi.generalMetrics("day", this.props.fromDate, this.props.toDate, this.props.siteId, this.props.method).done(data => {
      const dateArr = ['x'];
      const interactionArr = ['nb_interactions'];
      const impressionArr = ['nb_impressions'];
      for (const value in data) {
        if (data.hasOwnProperty(value)) {
          dateArr.push(value);
          if (jQuery.isEmptyObject(data[value])) {
            impressionArr.push(0);
            interactionArr.push(0);
          } else {
            impressionArr.push(data[value].nb_visits);
            interactionArr.push(data[value].nb_visits - data[value].bounce_count);
          }
        }
      }
      c3.generate({
        bindto: '#chart_3',
        data: {
          x: 'x',
          columns: [
            dateArr,
            impressionArr,
            interactionArr
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

    piwikapi.generalMetrics("year", this.props.fromDate, this.props.toDate, this.props.siteId, "UserCountry.getCountry").done(data => {
      const arr = [];
      let temp = [];
      const another = data[new Date().getFullYear()];
      for (const value of another) {
        temp.push(value.label);
        temp.push(value.nb_visits);
        arr.push(temp);
        temp = [];
      }
      c3.generate({
        bindto: '#chart_4',
        data: {
          columns: arr,
          type: 'donut'
        },
        size: {
          height: 480
        }
      });
    });

    piwikapi.generalMetrics("year", this.props.fromDate, this.props.toDate, this.props.siteId, "UserCountry.getCity").done(data => {
      const arr = [];
      let temp = [];
      const another = data[new Date().getFullYear()];
      for (const value of another) {
        temp.push(value.label);
        temp.push(value.nb_visits);
        arr.push(temp);
        temp = [];
      }
      c3.generate({
        bindto: '#chart_5',
        data: {
          columns: arr,
          type: 'donut'
        },
        size: {
          height: 700
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
        <div>
          <p style={HeaderStyles.charts}>Countrywise impression's donut</p>
          <div id="chart_4"></div>
        </div>
        <div>
          <p style={HeaderStyles.charts}>Citywise impression's donut</p>
          <div id="chart_5"></div>
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
  method: React.PropTypes.string,
  offlineData: React.PropTypes.arrayOf(React.PropTypes.string)
};
InteractionRateGuage.defaultProps = {
  //  offlineData: {"2016": {"nb_visits": 18, "bounce_count": 9}}
};

class InteractionRateGuage extends React.Component {

  componentDidMount() {
    // Need local config file "src/piwik/configure.js" to construct cofig object
    const config = new Configuration();
    const piwikapi = new PiwikAPI(config.baseAPI, config.authtoken);

    // Piwik api callback to display interaction rate and bounce rate widgets.
    piwikapi.generalMetrics("year", this.props.fromDate, this.props.toDate, this.props.siteId, this.props.method).done(data => {
      const year = new Date().getFullYear();
      const interactions = data[year].nb_visits - data[year].bounce_count;
      // formula to calculate interaction rate as we are not getting this from piwik api
      const interactionRate = (interactions / data[year].nb_visits * 100).toFixed(2);
      // C3 chart rendering to display interaction rate
      this._displayGuageChart('#chart_1', interactionRate);
      // C3 chart rendering to display bounce rate
      this._displayGuageChart('#chart_2', data[year].bounce_rate.replace("%", ""));
    });

    // C3 chart rendering to display timeseries chart of interactions and impressions
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
      this._displayTimeSeriesChart('#chart_3', [dateArr, impressionArr, interactionArr]);
    });

    // C3 chart rendering to display countrywise impressions donut chart
    piwikapi.generalMetrics("year", this.props.fromDate, this.props.toDate, this.props.siteId, "UserCountry.getCountry").done(data => {
      this._displayDonutChart('#chart_4', this._utilityFunction(data, new Date().getFullYear()), 480);
    });

    // C3 chart rendering to display citywise impressions donut chart
    piwikapi.generalMetrics("year", this.props.fromDate, this.props.toDate, this.props.siteId, "UserCountry.getCity").done(data => {
      this._displayDonutChart('#chart_5', this._utilityFunction(data, new Date().getFullYear()), 700);
    });
  }

  _utilityFunction(data, year) {
    const arr = [];
    let temp = [];
    for (const value of data[year]) {
      temp.push(value.label);
      temp.push(value.nb_visits);
      arr.push(temp);
      temp = [];
    }
    return arr;
  }

  // Modularising repetitive code
  _displayGuageChart(bindTo, displayData) {
    c3.generate({
      bindto: bindTo,
      data: {
        columns: [
          ['data', displayData]
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
  }

  _displayTimeSeriesChart(bindTo, displayData) {
    c3.generate({
      bindto: bindTo,
      data: {
        x: 'x',
        columns: displayData
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
  }

  _displayDonutChart(bindTo, displayData, assignHeight) {
    c3.generate({
      bindto: bindTo,
      data: {
        columns: displayData,
        type: 'donut'
      },
      size: {
        height: assignHeight
      }
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

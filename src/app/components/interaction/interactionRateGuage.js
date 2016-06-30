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
    getInitialState: function() {
    	var state = {
    		bounce_rate: '',
    		visits: '',
    		bounce_count: '',
    		interaction_count: '',
    		dataR:''
    	};
        return state;
    },
    componentDidMount: function() {
        $.ajax({
            url: "http://demo.piwik.org/index.php?module=API&method=API.get&format=JSON&idSite=7&period=year&date=2016-05-30,2016-06-28&date=2016-05-30%2C2016-06-28&filter_limit=false&format_metrics=1&expanded=1&token_auth=anonymous&filter_limit=30",
            dataType: 'jsonp',
            cashe: false,
            crossDomain: true,
            success: function(data) {
                this.setState({
                	dataR: data,
                	bounce_rate: data['2016']['bounce_rate'],
                	visits: data['2016']['nb_visits'],
                	bounce_count: data['2016']['bounce_count'],
                	interaction_count: data['2016']['nb_visits']-data['2016']['bounce_count']
                });
                var interaction_rate = (this.state.interaction_count/this.state.visits*100).toFixed(2);
                console.info("interaction_rate:" + interaction_rate + "%");
                this._renderChart(interaction_rate);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    _renderChart: function(interaction_rate) {
        var lineChart = c3.generate({
            bindto: '#chart_1',
            data: {
                columns: [
                    ['data', 78.8]
                ],
                type: 'gauge'
            }
        })
    },
    render: function() {
        this._renderChart();
        return ( <
            div id = "chart_1" > < /div>
        );
    }
});

class InteractionRateGuage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piwikApi1: "http://demo.piwik.org/index.php?module=API&method=API.get&format=JSON&idSite=7&period=year&date=2016-05-30,2016-06-28&date=2016-05-30%2C2016-06-28&filter_limit=false&format_metrics=1&expanded=1&token_auth=anonymous&filter_limit=30"
        }
    }
    render() {
        return (
	    <div>
	      <header style={HeaderStyles.header}>
	        <p style={HeaderStyles.date}>
	            Caratred Charts
	        </p>
	      </header>
	      <div style={HeaderStyles.chartAlign}><Gauge/></div>
	    </div>
    	);
    }
}
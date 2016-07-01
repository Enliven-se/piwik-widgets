const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;

ReactDOM.render(
  <InteractionRateGuage
    baseAPI="http://demo.piwik.org/index.php?format=JSON&module=API&method=API.get&format_metrics=1&expanded=1&token_auth="
    authtoken="anonymous"
    period="year"
    fromDate="2016-01-01"
    toDate="2016-06-30"
    siteId="7"
    />,
  document.getElementById('root')
);


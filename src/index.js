const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;

ReactDOM.render(
  <InteractionRateGuage
    baseAPI="http://demo.piwik.org/index.php?module=API&format=JSON&token_auth="
    authtoken="anonymous"
    period="year"
    fromDate="2016-06-28"
    toDate="today"
    siteId="7"
    method="API.get"
    />,
  document.getElementById('root')
);


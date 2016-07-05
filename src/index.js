const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;

ReactDOM.render(
  <InteractionRateGuage
    baseAPI="http://duskywing.enliven.se/index.php?module=API&method=API.get&format=JSON&&token_auth="
    authtoken="e06756f6aaccba2f6da411342f2fecfa"
    period="year"
    fromDate="2016-01-01"
    toDate="2016-07-04"
    siteId="1"
    />,
  document.getElementById('root')
);


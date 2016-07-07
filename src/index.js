const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;

ReactDOM.render(
  <InteractionRateGuage
    period="year"
    fromDate="2016-06-28"
    toDate="today"
    siteId="7"
    method="API.get"
    />,
  document.getElementById('root')
);


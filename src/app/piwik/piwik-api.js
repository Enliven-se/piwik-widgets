class PiwikAPI {
  // Class constructor with config data initialtion
  // Need local config file "src/piwik/configure.js" for constructor parameters
  constructor(baseAPI, authtoken) {
    this.baseAPI = baseAPI;
    this.authtoken = authtoken;
  }

  generalMetrics(period, fromDate, toDate, siteId, method) {
    const apiLink = `${this.baseAPI}${this.authtoken}&period=${period}&date=${fromDate},${toDate}&idSite=${siteId}&method=${method}`;
    return this.ajaxCall(apiLink);
  }

  // common ajax call used for all piwik api call
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

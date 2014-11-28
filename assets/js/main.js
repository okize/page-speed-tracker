// creates a div target for a chart
function insertChartTarget (id) {
  $('body').append('<div id="chart_' + id + '" class="text-center extended-y-ticks"></div>');
}

// inserts a new chart based on a url id
function initCharts (urlIds) {
  _.each(urlIds, function(obj) {
    insertChartTarget(obj.id);

    d3.json('api/score/' + obj.id, function(data) {

      var scores = data.scores;

      for (var i = 0; i < scores.length; i++) {
        scores[i] = convert_dates(scores[i], 'date');
      }

      // add a wide multi-line chart
      data_graphic({
        chart_type: 'line',
        title: data.url,
        legend: ['Mobile', 'Desktop'],
        legend_target: '#legend',
        linked: true,
        data: scores,
        width: 1000,
        height: 300,
        show_years: true,
        y_extended_ticks: true,
        target: '#chart_' + obj.id,
        x_accessor: 'date',
        y_accessor: 'score'
      });

    });

  });
}

// get list of url ids that are being tracked
$.ajax({
  type: 'GET',
  contentType: 'application/json',
  url: '/api/url',
  success: function(data) {
    initCharts(data);
  },
  error: function(error){
    console.log(error.responseText);
  }
});

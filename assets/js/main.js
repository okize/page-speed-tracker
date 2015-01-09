// creates a div target for a chart
function insertChartTarget (id) {
  $('body').append('<div id="chart_' + id + '" class="text-center extended-y-ticks extended-x-ticks"></div>');
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

      var event_markers = [
        {'date': new Date('2014-04-08'), 'label': 'April 8'},
        {'date': new Date('2014-06-21'), 'label': 'June 21'},
        {'date': new Date('2014-07-01'), 'label': 'July 1'},
        {'date': new Date('2014-07-09'), 'label': 'July 9'},
        {'date': new Date('2014-10-01'), 'label': 'October 1'},
        {'date': new Date('2014-10-21'), 'label': 'October 21'},
        {'date': new Date('2014-12-01'), 'label': 'December 1'},
        {'date': new Date('2014-12-28'), 'label': 'December 28'}
      ];

      // add a wide multi-line chart
      data_graphic({
        data: scores,
        x_accessor: 'date',
        y_accessor: 'score',
        target: '#chart_' + obj.id,
        chart_type: 'line',
        markers: event_markers,
        animate_on_load: false,
        area: false,
        // custom_line_color_map: [1,4],
        interpolate: 'step',
        title: data.url,
        // description: "Chart description here.",
        legend: ['Mobile', 'Desktop'],
        legend_target: '#legend',
        list: false,
        linked: true,
        show_years: true,
        xax_count: 12,
        // xax_tick_length: 10,
        show_years: true,
        x_extended_ticks: true,
        y_extended_ticks: true,
        width: 1200,
        height: 300,
        right: 0,
        left: 30
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

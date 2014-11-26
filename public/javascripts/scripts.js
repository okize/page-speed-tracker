// get chart data
$.ajax({
  type: 'GET',
  contentType: 'application/json',
  url: '/api/score/1',
  success: function(data) {
    console.log(data);
  },
  error: function(error){
    console.log(error.responseText);
  },
  complete: function() {
    console.log('Scores loaded');
  }
});

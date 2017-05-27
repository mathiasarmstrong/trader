m.request({
  method: 'PUT',
  url: '/api/v1/users/:id',
  data: {id: 1, name: 'test'}
})
  .then(function(result) {
    console.log(result);
  });

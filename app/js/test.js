(function() {
  'use strict';

  console.log('this is a plain old JavaScript example file, see source /app/js/test.js');

  var list = [1, 2, 3];
  var list2 = list.map(function(number) { return number * 2; });

  console.log(list, list2);
})();

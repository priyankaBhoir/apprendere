(function() {
    'use strict';
    var url = 'notes.json';
    console.log('render');
    React.render(
      <Board url={url}/>,
      document.getElementById('content')
      );
})();
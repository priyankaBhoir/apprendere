class NoteList extends React.Component {
  constructor(properties){
    super(properties);
     // making use of classes, so getInitialState can be replace with properties of class
    this.state = {
      data: [
      {
        "title": "data",
        "content": "hi there"
      },
      {
        "title": "data1",
        "content": "bye"
      }]
    };
  }

  StoreAndRefresh (newNote) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: newNote,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    //https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
       this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    var notes = this.state.data.map(note => (<Note title={note.title}> {note.content} </Note>))
    return (
      <div className="noteList">
        <Note title="credentials"> priyankaBhoir GrowSeed100 </Note>
        <Note title="commit"> ce99e2e3e7743a0a02bc746337b2cb7430f716df </Note>
        {notes}
        <NewNote createNote={this.StoreAndRefresh.bind(this)}/>
      </div>
    );
  }
}
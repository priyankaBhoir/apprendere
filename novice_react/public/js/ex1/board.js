//================ ex1 ================================
//sticky notes

class Board extends React.Component {
  constructor(properties){
    super(properties);
  }
  getInitialState() {
    return {
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
  componentDidMount() {
    console.log("brfb")
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
    return (
      <div className="board">
        plain board
        <NoteList data={this.state.data}/>
      </div>
    );
  }
}
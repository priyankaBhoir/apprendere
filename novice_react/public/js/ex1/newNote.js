class NewNote extends React.Component {
  constructor(properties){
    super(properties);
  }

  handleSubmit(e) {
    e.preventDefault();
    //this is not pointing to current class
    var title = React.findDOMNode(this.refs.title).value.trim();
    var note = React.findDOMNode(this.refs.note).value.trim();

    this.props.createNote({title: title, content: note});

    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.note).value = '';
    return;
  }

  render() {
    return (
      <div className="note">
        <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="title" ref="title" />
          <input type="text" placeholder="notes" ref="note" />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}
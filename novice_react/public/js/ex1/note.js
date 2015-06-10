class Note extends React.Component {
  constructor(properties){
    super(properties);
  }

  render() {
    return (
      <div className="note">
        <h2 className="noteTitle">
          {this.props.title}
        </h2>
        {this.props.children}
      </div>
    );
  }
}
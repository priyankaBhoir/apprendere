//================ ex1 ================================
//sticky notes

class Board extends React.Component {
  constructor(properties){
    super(properties);
  }

  render() {
    return (
      <div className="board">
        plain board
        <NoteList />
      </div>
    );
  }
}
class NoteList extends React.Component {
  constructor(properties){
    super(properties);
  }

  render() {
    return (
      <div className="noteList">
        <Note title="credentials"> priyankaBhoir GrowSeed100 </Note>
        <Note title="commit"> ce99e2e3e7743a0a02bc746337b2cb7430f716df </Note>
      </div>
    );
  }
}
import React from 'react';
import './style.css';

export default class App extends React.Component {
  state = {
    tasks: [
      { name: 'react', category: 'whip', bgcolor: 'yellow' },
      { name: 'Angular', category: 'whip', bgcolor: 'yellow' },
      { name: 'veu', category: 'complete', bgcolor: 'yellow' },
    ],
  };
  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id);
  };
  onDragOver = (ev) => {
    ev.preventDefault();
  };
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('id');
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks,
    });
  };
  render() {
    var tasks = {
      whip: [],
      complete: [],
    };
    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });
    return (
      <div className="container-drag">
        <h1 className="header">Drag & Drop Demo</h1>
        <div
          className="wip"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => {
            this.onDrop(e, 'whip');
          }}
        >
          <span className="task-header">Whip</span>
          {tasks.whip}
        </div>
        <div
          className="droppable"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, 'complete')}
        >
          <span className="task-header">complete</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}

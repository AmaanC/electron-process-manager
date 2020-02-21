import React from 'react';
import PropTypes from 'prop-types';

export default class ToolBar extends React.Component {

  static propTypes = {
    onStopClick: PropTypes.func,
    onContClick: PropTypes.func,
    disableKill: PropTypes.bool,
    onOpenDevToolClick: PropTypes.func,
    disabelOpenDevTool: PropTypes.bool
  }

  render() {
    return (
        <div className="toolbar-actions">
            <div className="btn-group">
              <button
                className="btn btn-default"
                disabled={this.props.disableKill}
                onClick={this.props.onStopClick}
              >
                Pause process
              </button>
              <button
                className="btn btn-default"
                disabled={this.props.disableKill}
                onClick={this.props.onContClick}
              >
                Resume process
              </button>
              <button
                className="btn btn-default"
                disabled={this.props.disabelOpenDevTool}
                onClick={this.props.onOpenDevToolClick}
              >
                Open Dev Tool
              </button>
            </div>
          </div>
    )
  }
}

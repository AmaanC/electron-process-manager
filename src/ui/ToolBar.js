import React from 'react';
import PropTypes from 'prop-types';

export default class ToolBar extends React.Component {

  static propTypes = {
    onKillClick: PropTypes.func,
    disableKill: PropTypes.bool,
    onDebugClick: PropTypes.func,
    disableDebug: PropTypes.bool
  }

  render() {
    return (
        <div className="toolbar-actions">
            <div className="btn-group">
              <button
                className="btn btn-default"
                disabled={this.props.disableKill}
                onClick={this.props.onKillClick}
              >
                End process
              </button>
              <button
                className="btn btn-default"
                disabled={this.props.disableDebug}
                onClick={this.props.onDebugClick}
              >
                Debug process
              </button>
            </div>
          </div>
    )
  }
}

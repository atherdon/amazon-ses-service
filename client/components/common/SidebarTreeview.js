/*eslint-disable react/prop-types*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class SidebarTreeview extends Component {

  render() {
    return (
      <li className="treeview">
        <a href="#">
          <i className={`fa ${this.props.icon}`}/><span>{this.props.name}</span>
        </a>
        <ul className="treeview-menu">
          {this.props.children}
        </ul>
      </li>
    );
  }
}

SidebarTreeview.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default SidebarTreeview;

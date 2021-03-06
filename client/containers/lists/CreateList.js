import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ImportCSV from './ImportCSV';

import { submitCSV } from '../../actions/listActions';
import { notify } from '../../actions/notificationActions';

function mapStateToProps(state) {
  // State reducer @ state.manageList
  return {
    lists: state.manageList.lists,
    isGetting: state.manageList.isGetting
  };
}

const mapDispatchToProps = { submitCSV, notify };

export class CreateListComponent extends Component {

  static propTypes = {
    submitCSV: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    isGetting: PropTypes.bool.isRequired
  }

  constructor() {
    super();
    this.handleCSVSubmit = this.handleCSVSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.notification = this.notification.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  state = {
    title: ''
  }

  notification(notification) {
    this.props.notify(notification);
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleCSVSubmit(file, headers) {
    const { title } = this.state;
    // List title should not be empty
    if (title === '') {
      this.props.notify({ message: 'Please provide a name for this list' });
    }
    else if (this.props.lists.some(x => x.name === title)) {
      // Notify if list name exists
      this.props.notify({ message: 'This list already exists, please provide a unique name' });
    }
    else {
      this.props.submitCSV(file, headers, title);
      this.props.notify({
        message: 'Uploaded initiated - check notifications for progress',
        colour: 'green'
      });
      this.props.history.push(`/lists/manage`);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="content-header">
          <h1>Create List
          </h1>
        </div>

        <section className="content">
          <div className="container-fluid">
            <Row>
              <Col xs={12} md={12}>

                <div className="card">
                  <Row>
                    <Col md={12}>
                      <div className="card-header">
                        <h3 className="card-title">List name</h3>
                      </div>

                      <div className="card-body">

                        <div className="nav-tabs-custom">
                          <ul className="nav nav-tabs pull-right">
                            {/*<li className="">
                            <a href="#tab_1-1" data-toggle="tab">Add single email</a>
                          </li>*/}
                            <li className="pull-left header">
                              <i className="fa fa-th" />
                            Import a list
                          </li>
                          </ul>


                          <form role="form" onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                              <input className="form-control" id="title" placeholder="The name of this list" type="text" value={this.state.title} onChange={this.handleChange} />
                            </div>
                          </form>
                          <ImportCSV handleCSVSubmit={this.handleCSVSubmit} notification={this.notification} />
                        </div>

                      </div>
                    </Col>
                  </Row>

                  {this.props.isGetting && <div className="overlay">
                    <FontAwesome name="refresh" spin />
                  </div>}
                </div>

              </Col>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListComponent);

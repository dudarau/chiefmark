import React from 'react';
import DatePicker from 'react-datepicker';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import './filters.css';

class Filters extends React.Component {
  handleTagButtonClick = event => {
    event.preventDefault();
    this.props.handleTagButtonClick();
  };

  handleTodayButtonClick = event => {
    event.preventDefault();
    this.props.handleTodayButtonClick();
  };

  handleOldLinksButtonClick = event => {
    event.preventDefault();
    this.props.handleOldLinksButtonClick();
  };

  handleResetButtonClick = event => {
    event.preventDefault();
    this.props.handleResetClick();
  };

  render() {
    return (
      <Form className="filters-form">
        <FormGroup>
          <Input
            type="text"
            placeholder="Search"
            value={this.props.search}
            onChange={this.props.handleSearchChange}
            className="filters-search"
          />
        </FormGroup>
        <FormGroup className="filters-dates">
          <DatePicker
            selected={this.props.startDate}
            onChange={this.props.handleStartDateChange}
            placeholderText="Select date from"
            className="filters-datepicker"
          />
          <DatePicker
            selected={this.props.endDate}
            onChange={this.props.handleEndDateChange}
            placeholderText="Select date to"
            className="filters-datepicker"
          />
        </FormGroup>
        <div className="filters-buttons">
          <Button onClick={this.handleTagButtonClick} className="filters-button">
            By Tags ({this.props.tags.length})
          </Button>
          <Button onClick={this.handleTodayButtonClick} className="filters-button">Today</Button>
          <Button onClick={this.handleOldLinksButtonClick} className="filters-button">
            Basket/Old links
          </Button>
          <Button onClick={this.handleResetButtonClick} className="filters-button">Reset filters</Button>
        </div>
      </Form>
    );
  }
}

export default Filters;

import React from 'react';
import DatePicker from 'react-datepicker';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

class Filters extends React.Component {
  handleTagButtonClicked = event => {
    event.preventDefault();
    this.props.handleTagButtonClicked();
  };

  render() {
    return (
      <Form inline>
        <FormGroup>
          <Input
            type="text"
            placeholder="Search"
            value={this.props.search}
            onChange={this.props.handleSearchChange}
          />
        </FormGroup>
        <FormGroup>
          <DatePicker
            selected={this.props.startDate}
            onChange={this.props.handleStartDateChange}
          />
        </FormGroup>
        <FormGroup>
          <DatePicker
            selected={this.props.endDate}
            onChange={this.props.handleEndDateChange}
          />
        </FormGroup>
        <Button onClick={this.handleTagButtonClicked}>
          By Tags ({this.props.tags.length})
        </Button>
        <Button>Added Today</Button>
        <Button>Basket/Old links</Button>
      </Form>
    );
  }
}

export default Filters;

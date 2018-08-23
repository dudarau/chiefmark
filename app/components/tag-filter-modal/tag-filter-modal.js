import React from 'react';
import {
  Badge,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class TagFilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleTagChange = event => {
    const selectedTags = [...this.props.selectedTags];
    if (selectedTags.includes(event.target.name)) {
      const index = selectedTags.indexOf(event.target.name);
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(event.target.name);
    }
    this.props.handleTagFilterChange(selectedTags);
  };

  handleReset = () => {
    this.toggle();
    this.props.handleTagFilterChange([]);
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        onClosed={this.props.onClosed}
        backdrop={true}
      >
        <ModalHeader toggle={this.toggle}>Filter By Tags</ModalHeader>
        <ModalBody>
          <Form>
            {this.props.allTags.map((tag, index) => (
              <FormGroup key={index} check inline>
                <Badge color="primary" pill>
                  <Input
                    type="checkbox"
                    name={tag}
                    checked={this.props.selectedTags.includes(tag)}
                    onChange={this.handleTagChange}
                  />{' '}
                  {tag}
                </Badge>
              </FormGroup>
            ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={this.handleReset}>
            Reset Filter
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TagFilterModal;

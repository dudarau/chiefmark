import React from 'react';
import {
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
import { composeTitle } from '../../services/filters';

const TAGS_INPUT_SEPARATOR = ',';

class BookmarkModal extends React.Component {
  constructor(props) {
    super(props);
    const { bookmark } = this.props;
    this.state = {
      modal: true,
      title: bookmark.title,
      url: bookmark.url,
      tags: bookmark.tags.join(TAGS_INPUT_SEPARATOR),
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
    });
  };

  handleUrlChange = event => {
    this.setState({
      url: event.target.value,
    });
  };

  handleTagsChange = event => {
    this.setState({
      tags: event.target.value,
    });
  };

  onSaveClick = () => {
    const { bookmark } = this.props;
    this.toggle();
    this.props.onUpdateBookmark(bookmark.id, {
      title: composeTitle(
        this.state.title,
        this.state.tags.split(TAGS_INPUT_SEPARATOR),
        bookmark.dateLastOpened
      ),
      url: bookmark.url,
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal} onClosed={this.props.onClosed}>
        <ModalHeader toggle={this.toggle}>Edit Bookmark</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="url">Url</Label>
              <Input
                name="url"
                type="text"
                value={this.state.url}
                onChange={this.handleUrlChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="tags">
                Tags(separated by '{TAGS_INPUT_SEPARATOR}')
              </Label>
              <Input
                name="tags"
                type="text"
                value={this.state.tags}
                onChange={this.handleTagsChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dates">Date Created / Last Opened</Label>
              <Input plaintext>
                {new Date(this.props.bookmark.dateAdded).toDateString()} /{' '}
                {new Date(
                  new Number(this.props.bookmark.dateLastOpened)
                ).toDateString()}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onSaveClick}>
            Save Changes
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default BookmarkModal;

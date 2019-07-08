import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledForm,
  Label,
  InputGroup,
  ButtonGroup,
  SaveButton,
  CancelButton
} from './style';
import { Input, FeedbackMessage } from 'shared/components';
import { Link } from 'react-router-dom';

function Form({
  name,
  username,
  bio,
  location,
  website,
  birthday,
  handleChange,
  handleSubmit,
    errors
}) {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="name">Name:</Label>
        <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            error={!!errors.name}
        />
          {errors.name && <FeedbackMessage>{errors.name}</FeedbackMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          error={!!errors.username}
        />
          {errors.username && <FeedbackMessage>{errors.username}</FeedbackMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="bio">Bio:</Label>
        <Input type="text" name="bio" value={bio} onChange={handleChange} error={!!errors.bio} />
          {errors.bio && <FeedbackMessage>{errors.bio}</FeedbackMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="location">Location:</Label>
        <Input
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          error={!!errors.location}
        />
          {errors.location && <FeedbackMessage>{errors.location}</FeedbackMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="website">Website:</Label>
        <Input
          type="text"
          name="website"
          value={website}
          onChange={handleChange}
          error={!!errors.website}
        />
          {errors.website && <FeedbackMessage>{errors.website}</FeedbackMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="birthday">Birthday:</Label>
        <Input
          type="date"
          name="birthday"
          value={birthday}
          onChange={handleChange}
          error={!!errors.birthday}
        />
          {errors.birthday && <FeedbackMessage>{errors.birthday}</FeedbackMessage>}
      </InputGroup>

      <ButtonGroup>
        <SaveButton type="submit">Save Changes</SaveButton>
        <CancelButton as={Link} to={`/${username}`}>
          Cancel
        </CancelButton>
      </ButtonGroup>
    </StyledForm>
  );
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default Form;
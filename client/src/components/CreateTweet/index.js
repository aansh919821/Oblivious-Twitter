import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import {
  Header,
  Title,
  CloseButton,
  Content,
  Form,
  Textarea,
  Button,
  StyledDialogContent,
} from './style';
import TextareaGroup from 'components/TextareaGroup';
import { useCreateTweet } from 'utils/tweets';
import { IoMdClose } from 'react-icons/io';

export function CreateTweetModal() {
  const history = useHistory();

  const close = (e) => {
    if (e) e.stopPropagation();
    history.goBack();
  };

  return (
    <DialogOverlay onDismiss={close}>
      <StyledDialogContent aria-label="Compose new tweet">
        <Header>
          <Title>Compose new Tweet</Title>
          <CloseButton onClick={close}>
            <IoMdClose />
          </CloseButton>
        </Header>
        <Content>
          <CreateTweetForm onCreate={close} />
        </Content>
      </StyledDialogContent>
    </DialogOverlay>
  );
}

function CreateTweetForm({ onCreate }) {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const createTweetMutation = useCreateTweet();

  function handleChange(e) {
    setText(e.target.value);
  }

  function validateTweet(tweet) {
    if (tweet.text.length < 1 || tweet.text.length > 280) {
      setErrors({
        message: 'Tweet text length must be between 1 and 280 characters',
      });
      return false;
    }
    return true;
  }

  function generate_Shares(input_string) {
    const ascii_Values = Array.from(input_string ).map( char => char.charCodeAt(0) );
     let share1 = '';
    let share2 = '';
    ascii_Values.forEach(ascii => {
        const bin_Value = ascii.toString(2).padStart(8, '0');
        const random_Binary = Array.from({ length:  8 }, ()  => Math.floor(Math.random() * 2)).join('');
        let xor_Result = '';

        for (let i = 0; i < 8 ; i++) {
              xor_Result += ( bin_Value[i] ^ random_Binary[i]).toString();
        }
        share1 += random_Binary;

        share2 +=xor_Result;
  });

  const convert_Binary_To_String = binary_str => {
      let str = '';
      for (let i = 0 ; i < binary_str.length ; i += 8) {
          let byte =  binary_str.slice(i, i + 8);

          str +=String.fromCharCode(parseInt(byte, 2));
      }
      return str;
  };
  return {
      share1: convert_Binary_To_String(share1),
      share2: convert_Binary_To_String(share2)
  };
}


  function addTweet(e) {
    e && e.preventDefault();

    const tweet = { text };

    if (validateTweet(tweet)) {
      createTweetMutation.mutate(tweet, {
        onSuccess: () => {
          if (onCreate) onCreate();
        },
        onError: (err) => {
          setErrors(
            err.response?.data || { message: 'An error has occurred!' }
          );
        },
      });
    }
  }

  function handleEnterPress(e) {
    e.preventDefault();
    if (e.keyCode === 13 && e.shiftKey === false) {
      addTweet();
    }
  }

  return (
    <Form onSubmit={addTweet}>
      <TextareaGroup
        textarea={Textarea}
        text={text}
        handleChange={handleChange}
        handleEnterPress={handleEnterPress}
        placeholder="What's happening?"
        error={Object.keys(errors).length > 0}
        errorMsg={errors.message || ''}
      />
      <Button
        primary
        type="submit"
        disabled={
          text.length < 1 || text.length > 280 || createTweetMutation.isLoading
        }
      >
        {createTweetMutation.isLoading ? 'Loading...' : 'Tweet'}
      </Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateTweetForm;

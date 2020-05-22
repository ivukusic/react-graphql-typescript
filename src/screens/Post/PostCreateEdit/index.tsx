import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { useParams, withRouter, RouteComponentProps } from 'react-router-dom';

import { useForm, Button, Card } from 'common/components';
import { INITIAL_TEXT_FIELD } from 'common/constants';
import { extractMessageFromError, validateForm, Validators } from 'common/utils';
import { MUTATION_CREATE_POST, MUTATION_UPDATE_POST, QUERY_POST } from './PostCreateEdit.gql';

import './PostCreateEdit.style.scss';

export const PostCreateEdit = ({ history }: RouteComponentProps): JSX.Element => {
  let id = 0;
  const params: { id?: string } = useParams();
  if (params.id) {
    id = parseInt(params.id, 10);
  }
  const edit = history.location.pathname.includes('user-profile') || !!id;

  const [createPost] = useMutation(MUTATION_CREATE_POST);
  const [updatePost] = useMutation(MUTATION_UPDATE_POST);
  const { data } = useQuery<any>(QUERY_POST, { variables: { where: { id } } });

  const { form, renderCheckbox, renderTextArea, renderTextField, setForm } = useForm({
    title: {
      ...INITIAL_TEXT_FIELD,
      field: 'title',
      label: 'Title',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: '',
    },
    body: {
      ...INITIAL_TEXT_FIELD,
      field: 'body',
      label: 'Body',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: '',
    },
    published: {
      ...INITIAL_TEXT_FIELD,
      field: 'published',
      label: 'Published',
      value: false,
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    if (data && data.post && data.post.id && !formLoaded) {
      const newForm = { ...form };
      Object.keys(newForm).forEach(key => {
        newForm[key] = {
          ...newForm[key],
          value: data.post[key],
        };
      });
      setForm(newForm);
      setFormLoaded(true);
    }
  }, [data, form, formLoaded, setForm]);

  const onSave = async () => {
    const valid = validateForm(Object.keys(form), form);
    if (!valid.isValid) {
      setForm(valid.newState);
    } else {
      setLoading(true);
      try {
        const arrayOfKeys: any = Object.keys(form);
        const dataToSend: any = {};
        arrayOfKeys.forEach((key: string) => {
          const formField = form && form[key];
          if (formField) {
            dataToSend[key] = formField.value;
          }
        });
        let result: any;
        let type = 'createPost';
        if (edit) {
          type = 'updatePost';
          result = await updatePost({ variables: { data: dataToSend, where: { id } } });
        } else {
          result = await createPost({ variables: { data: dataToSend } });
        }
        if (result && result.data && result.data[type]) {
          history.push({ pathname: `/post`, state: { refresh: true } });
        }
      } catch ({ graphQLErrors }) {
        setErrorMessage(extractMessageFromError(graphQLErrors));
      }
      setLoading(false);
    }
  };

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  return (
    <Card className="post">
      {renderTextField('title')}
      {renderTextArea('body')}
      {renderCheckbox('published')}
      {error && <div className="error-message mb-4">{error}</div>}
      <div>
        <Button label={edit ? 'Save' : 'Create'} loading={loading} onClick={onSave} />
      </div>
    </Card>
  );
};

export default withRouter(PostCreateEdit);

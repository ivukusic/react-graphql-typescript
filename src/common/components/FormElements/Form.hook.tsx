import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from 'react';
import { isEqual } from 'lodash';

import { checkValidity } from '../../utils/Validation';
import TextField from './TextField';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

export const useForm = (fields: any) => {
  const [initialForm, setInitialForm] = useState(fields);
  const [form, setForm] = useState(fields);

  useEffect(() => {
    if (initialForm && fields && !isEqual(initialForm, fields)) {
      setForm(fields);
      setInitialForm(fields);
    }
  }, [initialForm, fields]);

  const onChange = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let formField = form && form[field];
    if (formField) {
      let error = formField.error;
      if (error) {
        error = checkValidity(formField.validators, e.target.value).error;
      }
      setForm({ ...form, [field]: { ...formField, error, value: e.target.value } });
    }
  };

  const onCheckbox = (field: string) => (e: SyntheticEvent) => {
    let formField = form && form[field];
    if (formField) {
      let error = formField.error;
      if (error) {
        error = checkValidity(formField.validators, !formField.value).error;
      }
      setForm({ ...form, [field]: { ...formField, error, value: !formField.value } });
    }
  };

  const onSelect = (field: string) => (value: string | number) => {
    let formField = form && form[field];
    if (formField) {
      let error = formField.error;
      if (error) {
        error = checkValidity(form.role.validators, value).error;
      }
      setForm({ ...form, role: { ...form.role, error, value } });
    }
  };

  const renderTextField = (field: string): JSX.Element | null => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <TextField
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        onChange={onChange(field)}
        value={formField.value}
      />
    );
  };

  const renderTextArea = (field: string): JSX.Element | null => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <TextArea
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        onChange={onChange(field)}
        value={formField.value}
      />
    );
  };

  const renderDropdown = (field: string) => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <Dropdown
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        data={['ADMIN', 'EDITOR', 'USER']}
        onSelect={onSelect(field)}
        value={formField.value}
      />
    );
  };

  const renderCheckbox = (field: string) => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <Checkbox
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        onClick={onCheckbox(field)}
        value={formField.value}
      />
    );
  };

  return {
    form,
    onChange,
    onSelect,
    renderCheckbox,
    renderDropdown,
    renderTextArea,
    renderTextField,
    setForm,
  };
};

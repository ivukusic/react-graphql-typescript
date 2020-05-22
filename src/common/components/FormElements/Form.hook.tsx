import { isEqual } from 'lodash';
import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from 'react';

import { checkValidity } from '../../utils/Validation';
import Checkbox from './Checkbox';
import Dropdown from './Dropdown';
import TextArea from './TextArea';
import TextField from './TextField';

export const useForm = (fields: any, onFormChange?: any) => {
  const [initialForm, setInitialForm] = useState(fields);
  const [form, setForm] = useState(fields);

  useEffect(() => {
    if (initialForm && fields && !isEqual(initialForm, fields)) {
      setForm(fields);
      setInitialForm(fields);
    }
  }, [initialForm, fields]);

  const onChange = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const formField = form && form[field];
    if (formField) {
      let error = formField.error;
      if (error) {
        error = checkValidity(formField.validators, e.target.value).error;
      }
      setForm({ ...form, [field]: { ...formField, error, value: e.target.value } });
      if (onFormChange) {
        onFormChange({ field, form });
        onFormChange({ field, form: { ...form, [field]: { ...formField, error, value: e.target.value } } });
      }
    }
  };

  const onCheckbox = (field: string) => (e: SyntheticEvent) => {
    const formField = form && form[field];
    if (formField) {
      let error = formField.error;
      if (error) {
        error = checkValidity(formField.validators, !formField.value).error;
      }
      setForm({ ...form, [field]: { ...formField, error, value: !formField.value } });
      if (onFormChange) {
        onFormChange({ field, form: { ...form, [field]: { ...formField, error, value: !formField.value } } });
      }
    }
  };

  const onSelect = (field: string) => (value: any) => {
    const formField = form && form[field];
    if (formField) {
      let error = formField.error;
      if (error) {
        error = checkValidity(form.role.validators, value).error;
      }
      setForm({ ...form, [field]: { ...form[field], error, value } });
      if (onFormChange) {
        onFormChange({ field, form: { ...form, [field]: { ...formField, error, value } } });
      }
    }
  };

  const renderTextField = (field: string): JSX.Element | null => {
    const formField = form && form[field];
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
    const formField = form && form[field];
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
    const formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <Dropdown
        className={formField.className}
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        data={formField.data}
        keys={formField.keys}
        idKey={formField.idKey}
        onSelect={onSelect(field)}
        value={formField.value}
      />
    );
  };

  const renderCheckbox = (field: string) => {
    const formField = form && form[field];
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

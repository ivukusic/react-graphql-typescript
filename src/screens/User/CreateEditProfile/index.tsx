import React from 'react';

import { Button, Card } from 'common/components';
import { UserProfileFormType } from 'common/types';

import './CreateEditProfile.style.scss';

interface Props {
  edit?: boolean;
  error?: string;
  form: UserProfileFormType;
  loading?: boolean;
  message?: string;
  title: string;
  onSave: () => void;
  renderTextArea: any;
  renderTextField: any;
  renderDropdown: any;
}

const CreateEditProfile = ({
  edit,
  error,
  form,
  message,
  loading,
  onSave,
  renderTextArea,
  renderTextField,
  renderDropdown,
  title,
}: Props): JSX.Element => {
  return (
    <Card className="edit-profile">
      <h4>{title}</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-12 col-lg-4 edit-profile__col">{renderTextField('company')}</div>
          <div className="col col-12 col-lg-4 edit-profile__col">{renderTextField('email')}</div>
          {!edit && <div className="col col-12 col-lg-4 edit-profile__col">{renderTextField('password')}</div>}
          <div className="col col-lg-6 edit-profile__col">{renderTextField('firstName')}</div>
          <div className="col col-lg-6 edit-profile__col">{renderTextField('lastName')}</div>
          <div className="col col-12 edit-profile__col">{renderTextField('address')}</div>
          <div className="col col-md-4 edit-profile__col">{renderTextField('city')}</div>
          <div className="col col-md-4 edit-profile__col">{renderTextField('country')}</div>
          <div className="col col-md-4 edit-profile__col">{renderTextField('postalCode')}</div>
          {form.role && renderDropdown('role')}
          <div className="col col-12 edit-profile__col">{renderTextArea('description')}</div>
        </div>
      </div>
      {error && <div className="error-message mb-4">{error}</div>}
      {message && <div className="success-message mb-4">{message}</div>}
      <div>
        <Button label={edit ? 'Save' : 'Create'} loading={loading} onClick={onSave} />
      </div>
    </Card>
  );
};

CreateEditProfile.defaultProps = {
  edit: false,
  error: '',
  loading: false,
  message: '',
};

export default CreateEditProfile;

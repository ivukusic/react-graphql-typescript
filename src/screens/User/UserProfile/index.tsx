import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AiOutlineUser } from 'react-icons/ai';

import TextField from '../../../common/components/FormElements/TextField';

import './UserProfile.style.scss';
import Button from '../../../common/components/Button';
import TextArea from '../../../common/components/FormElements/TextArea';

export const UserProfile = (): JSX.Element => {
  const [form, setForm] = useState({
    company: 'Nordit',
    username: 'ivukusic',
    email: 'info@nordit.hr',
    firstName: 'Ivan',
    lastName: 'Vukušić',
    address: 'Kudeji 9',
    city: 'Kastav',
    country: 'Croatia',
    postalCode: '51215',
    description: 'I like the way you work it No diggity I wanna bag it up',
  });

  const onChange = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const onSave = () => {
    console.log('SAVE');
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={3} md={8}>
          <div className="user-profile card mb-4">
            <div className="user-profile__header"></div>
            <div className="user-profile__image">
              <AiOutlineUser size={40} color="darkgray" />
            </div>
            <div className="user-profile__content">
              <h3>Ivan Vukušić</h3>
              <p>@ivukusic</p>
              <p className="quote">"I like the way you work it No diggity I wanna bag it up"</p>
            </div>
          </div>
        </Col>
        <Col lg={9} md={12}>
          <div className="card edit-profile">
            <h4>Edit profile</h4>
            <Container fluid>
              <Row>
                <Col className="edit-profile__col">
                  <TextField
                    disabled
                    label="Company"
                    field="company"
                    onChange={onChange('company')}
                    value={form.company}
                  />
                </Col>
                <Col className="edit-profile__col">
                  <TextField label="Username" field="username" onChange={onChange('username')} value={form.username} />
                </Col>
                <Col className="edit-profile__col">
                  <TextField label="Email" field="email" onChange={onChange('email')} value={form.email} />
                </Col>
              </Row>
              <Row>
                <Col className="edit-profile__col">
                  <TextField
                    label="First name"
                    field="firstName"
                    onChange={onChange('firstName')}
                    value={form.firstName}
                  />
                </Col>
                <Col className="edit-profile__col">
                  <TextField label="Last name" field="lastName" onChange={onChange('lastName')} value={form.lastName} />
                </Col>
              </Row>

              <Row>
                <Col className="edit-profile__col">
                  <TextField label="Address" field="address" onChange={onChange('address')} value={form.address} />
                </Col>
              </Row>

              <Row>
                <Col className="edit-profile__col">
                  <TextField label="City" field="city" onChange={onChange('city')} value={form.city} />
                </Col>
                <Col className="edit-profile__col">
                  <TextField label="Country" field="country" onChange={onChange('country')} value={form.country} />
                </Col>
                <Col className="edit-profile__col">
                  <TextField
                    label="Postal code"
                    field="postalCode"
                    onChange={onChange('postalCode')}
                    value={form.postalCode}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="edit-profile__col">
                  <TextArea
                    label="Description"
                    field="description"
                    onChange={onChange('description')}
                    value={form.description}
                  />
                </Col>
              </Row>
            </Container>
            <div>
              <Button label="Save" onClick={onSave} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;

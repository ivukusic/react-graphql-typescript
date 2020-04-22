import { Validator } from './Validators.types';

export interface FormInputType {
  data?: Array<string>;
  disabled: boolean;
  error?: { error: boolean; message: string } | null;
  field: string;
  label: string;
  isValid: boolean;
  multiline: boolean;
  required: boolean;
  type?: string;
  validators: Validator[];
  touched: boolean;
  value: any;
}

export type UserProfileFormKeysType =
  | 'company'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'city'
  | 'country'
  | 'postalCode'
  | 'description'
  | 'role'
  | 'password';

export interface UserProfileFormType {
  company: FormInputType;
  email: FormInputType;
  firstName: FormInputType;
  lastName: FormInputType;
  address: FormInputType;
  city: FormInputType;
  country: FormInputType;
  postalCode: FormInputType;
  description: FormInputType;
  role?: FormInputType;
  password?: FormInputType;
}

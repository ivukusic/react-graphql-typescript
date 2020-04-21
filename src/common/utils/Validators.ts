import moment from 'moment';

import { regex } from '../constants/Regex';

export class Validators {
  static email(value: string, message: string) {
    const strLength = value ? value.length : 0;
    if (strLength > 0) {
      const result = regex.email.test(value);
      if (!result) {
        return { error: true, message };
      }
    } else {
      return { error: true, message };
    }
    return false;
  }

  static required(value: string, message: string) {
    if (!value || !value.toString().trim().length) {
      return { error: true, message };
    }
    return false;
  }

  static number(value: string, message: string) {
    const strLength = value ? value.toString().length : 0;
    if (strLength > 0) {
      const result = regex.number.test(value);
      if (!result) {
        return { error: true, message };
      }
    } else {
      return false;
    }
    return false;
  }

  static date(value: string, message: string) {
    if (!value || !moment(value).isValid()) {
      return { error: true, message };
    }
    return false;
  }
}

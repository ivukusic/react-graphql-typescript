export const checkValidity = (validators: any, value: any) => {
  if (!validators || !validators.length) {
    return { valid: true, error: null };
  }
  for (let i = 0; i < validators.length; i++) {
    const error = validators[i].check && validators[i].check(value, validators[i].message);
    if (error) {
      return { error, valid: false };
    }
  }
  return { valid: true, error: null };
};

export const validateForm = (fields: any, values: any) => {
  const newState: any = {};
  let isValid = true;
  if (fields && fields.length) {
    if (values && Object.keys(values).length) {
      fields.forEach((field: any) => {
        if (values[field]) {
          const validity = checkValidity(values[field].validators, values[field].value);
          if (!validity.valid) {
            isValid = false;
          }
          newState[field] = {
            ...values[field],
            isValid: validity.valid,
            error: validity.error || null,
            touched: true,
          };
        }
      });
    }
  }
  return { isValid, newState };
};

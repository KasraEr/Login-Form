export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "email is required";
  } else if (
    !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
      data.email
    )
  ) {
    errors.email = "email address is invalid";
  } else {
    delete errors.email;
  }
  if (!data.password) {
    errors.password = "password is required";
  } else if (data.password.length < 6) {
    errors.password = "the password must be atleast 6characters";
  } else {
    delete errors.password;
  }
  if (type === "signup") {
    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "please accept our policies";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "please confirm your password";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "the password doesn't match";
    } else {
      delete errors.confirmPassword;
    }
    if (!data.name.trim()) {
      errors.name = "name is required";
    } else {
      delete errors.name;
    }
  }
  return errors;
};

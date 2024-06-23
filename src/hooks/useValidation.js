import { useState } from 'react';

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let tempErrors = {};

    // Validation logic for each field
    if (!values.fullName) {
      tempErrors.fullName = 'Full Name is required';
    }

    if (!values.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = 'Email address is invalid';
    }

    if (!values.phone) {
      tempErrors.phone = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phone)) {
      tempErrors.phone = 'Phone Number must only contain digits';
    } else if (values.phone.length !== 10) {
      tempErrors.phone = 'Phone Number must be exactly 10 digits';
    } else if (!/^[789]\d{9}$/.test(values.phone)) {
      tempErrors.phone = 'Phone Number must start with 7, 8, or 9';
    }

    if (!values.position) {
      tempErrors.position = 'Position is required';
    }

    if ((values.position === 'Developer' || values.position === 'Designer') && !values.experience) {
      tempErrors.experience = 'Relevant Experience is required';
    }

    if (values.position === 'Designer') {
      if (!values.portfolio) {
        tempErrors.portfolio = 'Portfolio URL is required';
      } else if (
        !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(values.portfolio)
      ) {
        tempErrors.portfolio = 'Portfolio URL is invalid';
      }
    }

    if (values.position === 'Manager' && !values.managementExperience) {
      tempErrors.managementExperience = 'Management Experience is required';
    }

    if (values.skills.length === 0) {
      tempErrors.skills = 'At least one skill is required';
    }

    if (!values.interviewTime) {
      tempErrors.interviewTime = 'Preferred Interview Time and Date is required';
    }

    // Update errors state
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return {
    errors,
    validate,
  };
};

export default useValidation;

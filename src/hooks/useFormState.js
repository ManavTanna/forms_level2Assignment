import { useState } from 'react';

const useFormState = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value, type, checked } = e.target;
      setValues({
        ...values,
        [name]: type === 'checkbox' ? checked : value,
      });
    } else {
      setValues({
        ...values,
        ...e,
      });
    }
  };

  const handleSkillChange = (newSkills) => {
    setValues({
      ...values,
      skills: newSkills,
    });
  };

  return {
    values,
    handleChange,
    handleSkillChange,
    setValues,
  };
};

export default useFormState;

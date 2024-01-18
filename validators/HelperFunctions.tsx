const isFilled = (value: string) => {
  return value.trim() !== "";
};

const hasErrors = (errors: object) => {
  return Object.keys(errors).length > 0;
};

export { hasErrors, isFilled };

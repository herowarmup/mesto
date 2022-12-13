const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.textContent = "";
    input.classList.remove(config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
};

const toggleButton = (inputs, submitBtn, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid);
  const { inactiveButtonClass } = config;

  if (isFormValid) {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
  }
};

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...rest } = config;
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const submitBtn = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, rest);
        toggleButton(inputs, submitBtn, rest);
      });
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_invalid",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
});

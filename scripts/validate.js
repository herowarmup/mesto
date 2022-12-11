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

  if (isFormValid) {
    submitBtn.classList.remove(config.inactiveButtonClass);
    submitBtn.disabled = "";
  } else {
    submitBtn.classList.add(config.inactiveButtonClass);
    submitBtn.disabled = "disabled";
  }
};

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...rest } = config;
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const submitBtn = form.querySelector(submitButtonSelector);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

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

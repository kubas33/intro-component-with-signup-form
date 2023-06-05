const fName = document.getElementById("f-name");
const lName = document.getElementById("l-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
const inputs = document.getElementsByTagName("input");
const submit = document.getElementById("submit");
let hasErrors = true;


function errorEmpty(input){
    if (input === email)
    return "Email cannot be empty";
    else
    return `${input.placeholder} cannot be empty`;
};

function toggleErrors(state, object) {
    const input = object;
    const error = input.parentNode.querySelector("p.error");
    const errorIcon = input.parentNode.querySelector("img.error");
    if (state == true) {
        error.classList.add("active");
        errorIcon.classList.add("active");
        this.classList.add("invalid");
        hasErrors = true;
    } else if (state == false) {
        error.classList.remove("active");
        errorIcon.classList.remove("active");
        this.classList.remove("invalid");
        hasErrors = false;
    }
}

Array.from(inputs).forEach((input) => {
    input.addEventListener("input", handleInputChange);
    input.addEventListener("click", handleInputChange);
    input.addEventListener("focus", handleInputChange);
});

function handleInputChange(event) {
    const input = this;
    const error = input.parentNode.querySelector("p.error");
    const errorIcon = input.parentNode.querySelector("img.error");
    if (input.validity.valueMissing) {
        error.textContent = errorEmpty(input);
        toggleErrors(true, this);
    }
    else if (input.type === "email") {
        if (input.validity.typeMismatch) {
            error.textContent = "Looks like this is not an email";
            toggleErrors(true, this);
        } else {
            toggleErrors(false, this);
        }
    }
    else {
        toggleErrors(false, this);
    }
};

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
    }
    Array.from(inputs).forEach((input) => {
        handleInputChange.call(input);
    });
});
/*
email.addEventListener("input", (event) => {
    const error = email.parentNode.querySelector("p.error");
    const errorIcon = email.parentNode.querySelector("img.error");
    if (email.validity.typeMismatch) {
        error.textContent = "Looks like this is not an email";
        errorIcon.classList.add("active");
        error.classList.add("active");
    } else {
        error.classList.remove("active");
        errorIcon.classList.remove("active");
    }
});



fName.addEventListener("input", "click", (event) => {
    if (fName.validity.valueMissing) {
        fName.parentNode.getElementsByTagName("p")[0].textContent = errorEmpty(fName);
    }
});
*/
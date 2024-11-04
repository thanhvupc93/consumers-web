export const checkValidateEmail = (email: string) => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email);
};
export const checkValidatePhone = (phone: string) => {
    const expression: RegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (phone.match(/^\d{10}$/g)) {
        return expression.test(phone)

    } else return false;
};

export const checkValidatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
        password.length >= minLength &&
        hasLowercase &&
        hasUppercase &&
        hasDigit &&
        hasSpecialChar
    );
}

export const checkValidateFullName = (fullName: string) => {
    return fullName.length < 1;
};

export const checkValidateAddress = (address: string) => {
    return address.length < 12;
};
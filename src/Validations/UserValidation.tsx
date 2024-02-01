import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string().required("Your Full Name is Required!"),
    email: yup.string().email().required("Your email is incorrect!"),
    password: yup.string().min(6, "Password must be at least 6 characters").max(12, "Password must be at most 12 characters").required("Your password is incorrect!"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "The passwords aren't the same!")
        .required("The passwords aren't the same!"),
});

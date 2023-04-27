import { useField } from "formik";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";

const PasswordInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);

    // state to hide or show password
    const [showPassword, setShowPassword] = useState(false);

    // function to toggle show password
    const toggleShowPassword = (event) => {
        // prevent browser refresh
        event.preventDefault();

        // toggle show password
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div
                className={`flex resize-none flex-row items-center justify-between rounded-md ${
                    meta.touched && meta.error
                        ? "border-2 border-red-600"
                        : "border border-[#30373d]"
                } pr-3 text-[1.1rem] text-[#ececf1] disabled:opacity-50`}
            >
                <input
                    {...field}
                    {...props}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-md bg-[#070809] p-3 outline-none"
                />
                <button onClick={toggleShowPassword} className="hover:opacity-80">
                    {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </button>
            </div>
            {meta.touched && meta.error && (
                <div className="error -mt-4 ml-2 text-red-600">{meta.error}</div>
            )}
        </>
    );
};

export default PasswordInput;

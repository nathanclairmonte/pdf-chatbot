import { useField } from "formik";

const FormikTextInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);

    return (
        <>
            <div
                className={`resize-none rounded-md ${
                    meta.touched && meta.error
                        ? "border-2 border-red-500"
                        : "border border-[#30373d]"
                } text-[1.1rem] text-[#ececf1] disabled:opacity-50`}
            >
                <input
                    {...field}
                    {...props}
                    className="w-full rounded-md bg-[#070809] p-3 outline-none"
                />
            </div>
            {meta.touched && meta.error && (
                <div className="error -mt-4 ml-2 text-red-500">{meta.error}</div>
            )}
        </>
    );
};

export default FormikTextInput;

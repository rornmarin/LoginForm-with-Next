const { TextInput } = require("flowbite-react");
const { ErrorMessage } = require("formik");

const MyInput = ({ label, showError, field, form, ...props }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <TextInput {...field} {...props} />
      {showError && (
        <ErrorMessage
          name={field.name}
          render={(msg) => <div className="text-red-500">{msg}</div>}
        />
      )}
    </div>
  );
};

export default MyInput;

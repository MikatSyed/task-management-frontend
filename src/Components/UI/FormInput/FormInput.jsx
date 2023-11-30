import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../../utils/schema-validator";

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  customStyle,
}) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            size={size}
            placeholder={placeholder}
            style={customStyle}
            {...field}
            value={value ? value : field.value}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300
                       transition duration-300 ease-in-out
                       hover:border-blue-500 focus:border-blue-500"
          />
        )}
      />
      {errorMessage && (
        <small className="text-red-500 mt-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default FormInput;

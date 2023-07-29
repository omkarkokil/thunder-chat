import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  type?: string;
  required?: boolean;
}

const MessageInput: FC<MessageInputProps> = ({
  placeholder,
  id,
  errors,
  register,
  type,
  required,
}) => {
  return (
    <>
      <div className="relative w-full">
        <input
          id={id}
          type={type}
          autoComplete={id}
          placeholder={placeholder}
          {...register(id, { required })}
          className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          w-full 
          rounded-full
          focus:outline-none
        "
        />
      </div>
    </>
  );
};

export default MessageInput;

import { useImperativeHandle, useRef } from "react";

export function NoteInput({
  ref,
  value,
  title,
  name,
  id,
  onChange,
  placeholder,
}) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
    };
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-gray-700 text-sm">
        {title}
      </label>

      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white px-3 py-2 border border-gray-300 focus:border-amber-500 rounded-lg outline-none focus:ring-2 focus:ring-amber-100 w-full text-gray-800 placeholder:text-gray-400 text-sm transition-colors duration-200"
      />
    </div>
  );
}

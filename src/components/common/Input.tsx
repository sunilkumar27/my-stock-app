// src/components/common/Input.tsx
import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps {
  onClear?: () => void;
  onSearch?: () => void;
  showSearchIcon?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onClear, onSearch, showSearchIcon = false, inputProps = {} }, ref) => {
    return (
      <div className="flex items-center rounded-full border-2 border-blue-500">
        <input
          ref={ref}
          className="w-full h-11 outline-none bg-white text-sm px-5 rounded-l-full"
          {...inputProps}
        />
        {inputProps.value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="px-2 h-11 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        {showSearchIcon && (
          <button
            title="Click to view search results"
            type="button"
            onClick={onSearch}
            className="h-11 flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-6 rounded-r-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16"
              height="16"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
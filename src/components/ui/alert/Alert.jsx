import React from "react";

const Alert = ({ variant = "info", title, message, showLink = false, linkHref, linkText }) => {
  const variantClasses = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <div className={`p-4 rounded ${variantClasses[variant]}`}>
      <strong>{title}</strong>
      <p>{message}</p>
      {showLink && (
        <a href={linkHref} className="underline">
          {linkText}
        </a>
      )}
    </div>
  );
};

export default Alert;
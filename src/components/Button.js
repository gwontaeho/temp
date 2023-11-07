export const Button = (props) => {
  const { children, className, ...rest } = props;
  return (
    <button {...rest} className={`px-2 py-1 h-7 w-full border shadow rounded bg-bg ${className}`}>
      {children}
    </button>
  );
};

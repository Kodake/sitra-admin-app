
type TError = {
  ErrorMsg: string | undefined;
};

const ErrorMessage = ({ ErrorMsg }: TError) => {
  return (
    <>
      <p
        style={{
          fontSize: "12px",
          color: "rgb(239 68 68 / var(--tw-text-opacity))",
        }}
      >
        {ErrorMsg}
      </p>
    </>
  );
};

export default ErrorMessage;

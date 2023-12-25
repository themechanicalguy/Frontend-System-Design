const InputField = ({ value, setValue, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
export default InputField;

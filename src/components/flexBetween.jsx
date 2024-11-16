const FlexBetween = (props) => {
  const { children, className } = props;
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {children}
    </div>
  );
};

export default FlexBetween;

interface ButtonType {
  children: any;
  variant?: string;
  classNames?: string;
  onClick?: () => void;
}

export default function Button({ children, variant, classNames, onClick }: ButtonType) {
  if (variant === 'outlined') {
    return (
      <button
        className={` ${
          classNames && classNames
        } cursor-pointer rounded-md border-2 border-solid text-primary-600 border-primary-600 hover:bg-primary-600 px-4 py-2 text-base hover:text-white transition-all duration-300 ease-in-out`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={` ${classNames && classNames}
        cursor-pointer rounded-md border-2 border-solid border-primary-600 bg-primary-600 text-white hover:bg-transparent px-4 py-2 text-base hover:text-primary-600 transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

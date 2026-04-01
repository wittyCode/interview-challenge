type ButtonProps = {
  label: string;
  clickHandler?: () => void;
  type: 'submit' | undefined;
};

/**
 * component wrapping a confirmation button bar
 */
export function ConfirmationButton({ label, clickHandler, type }: Readonly<ButtonProps>) {
  return (
    <div id="editButtonBar" className="flex items-center justify-end p-2">
      <button
        className="bg-btn-primary hover:bg-btn-hover rounded-xl p-4 font-bold text-white hover:cursor-pointer"
        onClick={clickHandler}
        type={type}
      >
        {label}
      </button>
    </div>
  );
}

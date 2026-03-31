type ButtonProps = {
  label: string;
  clickHandler: () => void;
};

/**
 * component wrapping a confirmation button bar
 */
export function ConfirmationButton({ label, clickHandler }: ButtonProps) {
  return (
    <div id="editButtonBar" className="flex items-center justify-end p-2">
      <button
        className="bg-btn-primary hover:bg-btn-hover rounded-xl p-4 font-bold text-white hover:cursor-pointer"
        onClick={clickHandler}
      >
        {label}
      </button>
    </div>
  );
}

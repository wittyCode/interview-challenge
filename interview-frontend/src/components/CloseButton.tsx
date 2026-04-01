type CloseButtonProps = {
  closeFn: () => void;
};

/**
 * component wrapping a close button bar
 */
export default function CloseButton({ closeFn }: Readonly<CloseButtonProps>) {
  return (
    <div id="closeButtonBar" className="flex min-w-auto items-center justify-end">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full p-2 font-bold hover:cursor-pointer hover:bg-gray-200"
        onClick={closeFn}
      >
        X
      </button>
    </div>
  );
}

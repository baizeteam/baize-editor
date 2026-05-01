const toolbar = {
  wrapper:
    "sticky top-0 z-50 w-full flex justify-center pt-4 md:pt-8 pb-3 md:pb-4 px-3 md:px-4 bg-surface-container-low/80 backdrop-blur-md",
  container:
    "max-w-4xl w-full bg-white/90 backdrop-blur-2xl md:px-6 px-3 py-2 md:rounded-full rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/10",
  buttonGroup:
    "flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 min-w-0",
  rightGroup: "flex items-center gap-2 md:gap-4 flex-shrink-0",
};

const iconButton = {
  base: "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg",
  active: "text-primary bg-primary/15 hover:bg-primary/25",
  inactive: "text-on-surface-variant hover:bg-black/5",
};

const divider = "h-6 w-[1px] bg-outline-variant/20 mx-1 flex-shrink-0";

const colorPickerButton =
  "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-black/5";

const colorSwatch = "w-4 h-4 rounded border border-gray-300";

const headingDropdown =
  "flex items-center gap-1 px-3 rounded-full hover:bg-black/5 flex-shrink-0";

const headingLabel = "text-xs font-bold text-on-surface-variant";

const charCount = {
  container:
    "hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full",
  label:
    "text-[10px] font-bold text-on-surface-variant uppercase tracking-wider",
  value: "text-xs font-medium text-primary",
};

const saveButton =
  "md:rounded-full rounded-lg bg-primary hover:bg-primary-dim border-none h-9 md:px-6 px-4 flex items-center gap-2 shadow-lg shadow-primary/20";

const listButton = {
  base: "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg flex-shrink-0",
  active: "text-primary bg-primary/15 hover:bg-primary/25 shadow-sm",
  inactive: "text-on-surface-variant hover:bg-black/5",
};

const popoverContent = {
  colorPicker: "flex flex-col gap-2 p-2",
  colorLabel: "text-xs font-semibold text-gray-500 mb-1",
  imageInput: "flex flex-col gap-2 p-1",
  imageInputWidth: "w-64",
  imageActions: "flex justify-end gap-2",
};

export const styles = {
  toolbar,
  iconButton,
  divider,
  colorPickerButton,
  colorSwatch,
  headingDropdown,
  headingLabel,
  charCount,
  saveButton,
  listButton,
  popoverContent,
};

import { useSlate } from "slate-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { styles } from "../styles";
import { getBlockLabel, getHeadingMenuItems } from "./toolbar-editor";

export function HeadingDropdown() {
  const editor = useSlate();
  const items = getHeadingMenuItems(editor);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.headingDropdown}>
          <span className={styles.headingLabel}>{getBlockLabel(editor)}</span>
          <ChevronDown className="text-[10px]" size={12} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item.key} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

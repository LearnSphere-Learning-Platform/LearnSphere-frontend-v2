import React from "react";
import * as CommandPrimitive from "cmdk";
import { Search } from "lucide-react";

import { cn } from "../../lib/utils";
import { Dialog, DialogContent } from "./dialog";

// Command wrapper
const Command = React.forwardRef(function Command(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Command
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )}
      {...props}
    />
  );
});
Command.displayName = CommandPrimitive.Command.displayName;

// Command Dialog
const CommandDialog = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]-2 [&_[cmdk-group-heading]]-medium [&_[cmdk-group-heading]]-muted-foreground [&_[cmdk-group]([hidden])_~[cmdk-group]]-0 [&_[cmdk-group]]-2 [&_[cmdk-input-wrapper]_svg]-5 [&_[cmdk-input-wrapper]_svg]-5 [&_[cmdk-input]]-12 [&_[cmdk-item]]-2 [&_[cmdk-item]]-3 [&_[cmdk-item]_svg]-5 [&_[cmdk-item]_svg]-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

// Command Input
const CommandInput = React.forwardRef(function CommandInput(
  { className, ...props },
  ref
) {
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder-muted-foreground disabled-not-allowed disabled-50",
          className
        )}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = CommandPrimitive.Input.displayName;

// Command List
const CommandList = React.forwardRef(function CommandList(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  );
});
CommandList.displayName = CommandPrimitive.List.displayName;

// Command Empty
const CommandEmpty = React.forwardRef(function CommandEmpty(props, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
    />
  );
});
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// Command Group
const CommandGroup = React.forwardRef(function CommandGroup(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]-2 [&_[cmdk-group-heading]]-1.5 [&_[cmdk-group-heading]]-xs [&_[cmdk-group-heading]]-medium [&_[cmdk-group-heading]]-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// Command Separator
const CommandSeparator = React.forwardRef(function CommandSeparator(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  );
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// Command Item
const CommandItem = React.forwardRef(function CommandItem(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]-events-none data-[selected='true']-accent data-[selected=true]-accent-foreground data-[disabled=true]-50",
        className
      )}
      {...props}
    />
  );
});
CommandItem.displayName = CommandPrimitive.Item.displayName;

// Command Shortcut
const CommandShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

// Export all
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

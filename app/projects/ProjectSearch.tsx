import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import type { ChangeEvent } from "react";

interface ProjectSearchProps {
  onSearchChange: (query: string) => void;
  value?: string;
}

export function ProjectSearch({ onSearchChange, value = "" }: ProjectSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onSearchChange(newValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onSearchChange("");
  };

  return (
    <InputGroup width="full" startElement={<span>🔍</span>} endElement={localValue && <CloseButton onClick={handleClear} />}>
      <Input
        placeholder="Search projects by title, description, or tags..."
        value={localValue}
        onChange={handleChange}
        size="md"
      />
    </InputGroup>
  );
}

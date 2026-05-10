import { X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface SkillsInputProps {
  skills?: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsInput = ({ skills = [], onSkillsChange }: SkillsInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        onSkillsChange([...skills, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      onSkillsChange(skills.slice(0, -1));
    }
  };
  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove));
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full hover:bg-muted-foreground/20"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter..."
      />
    </div>
  );
};

export default SkillsInput;

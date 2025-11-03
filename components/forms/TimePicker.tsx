import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

export default function TimePicker({ value = "10:30", onChange, className }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const [hour = "00", minute = "00"] = (value ?? "00:00").split(":");

  const updateTime = (newHour: string, newMinute: string) => {
    const newTime = `${newHour}:${newMinute}`;
    onChange?.(newTime);
  };
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <Select value={hour} onValueChange={(h) => updateTime(h, minute)}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {hours.map((h) => (
            <SelectItem key={h} value={h}>{h}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <span className="flex items-center">:</span>
      
      <Select value={minute} onValueChange={(m) => updateTime(hour, m)}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
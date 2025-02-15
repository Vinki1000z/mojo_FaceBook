import type { DateRange } from '../types/facebook';

interface DateRangePickerProps {
  since: Date;
  until: Date;
  onChange: (range: DateRange) => void;
}

export default function DateRangePicker({ since, until, onChange }: DateRangePickerProps) {
  return (
    <div className="flex space-x-4 text-black">
      <div>
        <label className="block text-sm font-medium mb-1">Since</label>
        <input
          type="date"
          value={since.toISOString().split('T')[0]}
          onChange={(e) => onChange({
            since: new Date(e.target.value),
            until
          })}
          className="border rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Until</label>
        <input
          type="date"
          value={until.toISOString().split('T')[0]}
          onChange={(e) => onChange({
            since,
            until: new Date(e.target.value)
          })}
          className="border rounded-md p-2"
        />
      </div>
    </div>
  );
}
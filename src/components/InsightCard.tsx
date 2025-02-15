import { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface InsightCardProps {
  title: string;
  value: number;
  icon: keyof typeof LucideIcons;
}

export default function InsightCard({ title, value, icon }: InsightCardProps) {
  const LucideIcon = LucideIcons[icon] as React.FC<LucideProps>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-black">
      <div className="flex items-center justify-between mb-4 text-black">
        <h3 className="text-lg font-semibold">{title}</h3>
        {LucideIcon && <LucideIcon className="w-6 h-6 text-blue-600" />}
      </div>
      <p className="text-3xl font-bold">
        {new Intl.NumberFormat().format(value)}
      </p>
    </div>
  );
}

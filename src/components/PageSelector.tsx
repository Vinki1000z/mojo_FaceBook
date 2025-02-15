import type { FacebookPage } from '../types/facebook';

interface PageSelectorProps {
  pages: FacebookPage[];
  selectedPage: FacebookPage | null;
  onSelect: (page: FacebookPage) => void;
}

export default function PageSelector({ pages, selectedPage, onSelect }: PageSelectorProps) {
  return (
    <div className="flex space-x-4 text-black">
      <select
        value={selectedPage?.id || ''}
        onChange={(e) => {
          const page = pages.find(p => p.id === e.target.value);
          if (page) onSelect(page);
        }}
        className="border rounded-md p-2 flex-grow"
      >
        <option value="">Select a Page</option>
        {pages.map(page => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
    </div>
  );
}

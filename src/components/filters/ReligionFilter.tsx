interface ReligionFilterProps {
    selectedReligion: string;
    onSelectReligion: (religion: string) => void;
    religions: string[];
    
  }
  
  export default function ReligionFilter({ selectedReligion, onSelectReligion, religions }: ReligionFilterProps) {
    return (
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {religions.map((r) => (
          <button
            key={r}
            className={`px-4 py-1 rounded-full border shadow-sm transition text-sm font-medium ${
              selectedReligion === r
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-white/10 dark:text-gray-200 text-gray-700 hover:bg-blue-100 dark:hover:bg-white/20'
            }`}
            onClick={() => onSelectReligion(r)}
          >
            {r}
          </button>
        ))}
      </div>
    );
  }
  
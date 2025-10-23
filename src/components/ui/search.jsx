import { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Card } from './card';
import { Badge } from './badge';
import { useNavigate } from 'react-router-dom';

const searchData= [
  {
    title: 'Dashboard',
    description: 'View real-time crane monitoring and IoT data',
    url: '/dashboard',
    category: 'Navigation'
  },
  {
    title: 'Compare Cranes',
    description: 'Compare performance metrics between different cranes',
    url: '/compare',
    category: 'Navigation'
  },
  {
    title: 'Impact Metrics',
    description: 'View safety improvements and cost savings data',
    url: '/impact',
    category: 'Navigation'
  },
  {
    title: 'Tower Crane TC7050',
    description: 'Optimal status - Construction Site Alpha',
    url: '/compare',
    category: 'Crane'
  },
  {
    title: 'Mobile Crane MC5000',
    description: 'Warning status - Construction Site Beta',
    url: '/compare',
    category: 'Crane'
  },
  {
    title: 'Crawler Crane CC3200',
    description: 'Optimal status - Construction Site Gamma',
    url: '/compare',
    category: 'Crane'
  },
  {
    title: 'Predictive Maintenance',
    description: 'AI-powered failure prediction and prevention',
    url: '/dashboard',
    category: 'Feature'
  },
  {
    title: 'LIDAR Safety',
    description: 'Advanced lift zone monitoring with drone integration',
    url: '/impact',
    category: 'Feature'
  }
];

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchData.slice(0, 6)); // Show recent/popular results
  } else {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
    }
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        navigate(results[selectedIndex].url);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (url) => {
    navigate(url);
    onClose();
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Navigation': return 'bg-primary/10 text-primary';
      case 'Crane': return 'bg-secondary/10 text-secondary';
      case 'Feature': return 'bg-success/10 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 bg-card border-border shadow-lg">
        <div className="flex items-center border-b border-border p-4">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <Input
            ref={inputRef}
            placeholder="Search cranes, features, or navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 text-base"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="ml-2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {query === '' && (
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  Quick Access
                </div>
              )}
              {results.map((result, index) => (
                <div
                  key={`${result.title}-${index}`}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleResultClick(result.url)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{result.title}</h4>
                      <Badge className={`text-xs ${getCategoryColor(result.category)}`}>
                        {result.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No results found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="border-t border-border p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div>Use ↑↓ to navigate, Enter to select, Esc to close</div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd>
              <span>to search</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GlobalSearch;


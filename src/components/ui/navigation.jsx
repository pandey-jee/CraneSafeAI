import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Monitor, BarChart3, GitCompare, Target, Shield, Menu, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './theme-toggle';
import GlobalSearch from './search';
import NotificationCenter from './notification-center';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home', icon: Monitor },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/compare', label: 'Compare', icon: GitCompare },
    { path: '/impact', label: 'Impact', icon: Target }
  ];

  // Global search keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-lg sm:text-xl font-bold text-foreground">CraneSafe AI</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">IoT + LIDAR Safety System</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    asChild
                    className={isActive(item.path) ? 'btn-hero' : 'hover:bg-muted'}
                  >
                    <Link to={item.path} className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center space-x-2 w-auto px-3"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm text-muted-foreground hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-flex pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </Button>

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden w-9 h-9 p-0"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Notifications */}
              <NotificationCenter />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Navigation */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 bg-card border-border">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center space-x-3 pb-4 border-b border-border">
                      <div className="p-2 bg-gradient-primary rounded-lg">
                        <Shield className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-foreground">CraneSafe AI</h1>
                        <p className="text-xs text-muted-foreground">IoT + LIDAR Safety System</p>
                      </div>
                    </div>
                    
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.path}
                          variant={isActive(item.path) ? 'default' : 'ghost'}
                          asChild
                          className={`justify-start ${isActive(item.path) ? 'btn-hero' : 'hover:bg-muted'}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to={item.path} className="flex items-center space-x-3 w-full">
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navigation;

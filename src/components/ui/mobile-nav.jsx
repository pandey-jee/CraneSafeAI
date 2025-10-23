import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Monitor, BarChart3, GitCompare, Target, Shield, Menu } from 'lucide-react';

>;
}

const MobileNav = ({ navigationItems }: MobileNavProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
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
  );
};

export default MobileNav;

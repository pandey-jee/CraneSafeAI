import { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Info, Clock } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';
import { ScrollArea } from './scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Generate some mock notifications
  useEffect(() => {
    const mockNotifications= [
      {
        id: '1',
        title: 'Crane A Maintenance Due',
        description: 'Scheduled maintenance required within 48 hours',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      },
      {
        id: '2',
        title: 'Safety Alert Resolved',
        description: 'Lift zone clearance issue at Site Beta has been resolved',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false
      },
      {
        id: '3',
        title: 'New IoT Sensor Online',
        description: 'Temperature sensor TC-401 is now active and reporting',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true
      },
      {
        id: '4',
        title: 'Efficiency Improvement',
        description: 'Crane C efficiency increased by 8% this week',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true
      },
      {
        id: '5',
        title: 'Weather Advisory',
        description: 'High winds expected tomorrow. Consider crane operation restrictions.',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        read: true
      }
    ];

    setNotifications(mockNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification= {
        id: Date.now().toString(),
        title: 'System Update',
        description: 'IoT sensors synchronized successfully',
        type: 'info',
        timestamp: new Date(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 30000); // Add new notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative w-9 h-9 p-0"
          aria-label={`Notifications (${unreadCount} unread)`}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive text-destructive-foreground">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-card border-border" 
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary-foreground"
            >
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-96">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`mb-2 p-3 cursor-pointer transition-colors ${
                    !notification.read 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-card hover:bg-muted/50'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(notification.timestamp)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;

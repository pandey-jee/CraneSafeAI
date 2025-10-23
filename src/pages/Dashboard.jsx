import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Thermometer, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Gauge,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Simulated IoT data generator
const generateIoTData = () => {
  return {
    vibration: Math.random() * 15 + 5, // 5-20 mm/s
    torque: Math.random() * 100 + 50,  // 50-150 Nm
    temperature: Math.random() * 40 + 20, // 20-60°C
    load: Math.random() * 80 + 20, // 20-100% capacity
    timestamp: new Date().toLocaleTimeString()
  };
};

const Dashboard = () => {
  const [liveData, setLiveData] = useState(generateIoTData());
  const [historicalData, setHistoricalData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Crane B requires maintenance in 12 days', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Predictive model updated successfully', time: '5 min ago' },
    { id: 3, type: 'success', message: 'All safety checks passed', time: '10 min ago' }
  ]);

  // Health status data for pie chart
  const healthData = [
    { name: 'Optimal', value: 75, color: 'hsl(var(--success))' },
    { name: 'Warning', value: 20, color: 'hsl(var(--warning))' },
    { name: 'Critical', value: 5, color: 'hsl(var(--destructive))' }
  ];

  // Manual refresh function
  const refreshData = () => {
    const newData = generateIoTData();
    setLiveData(newData);
    setLastUpdated(new Date());
    
    // Add to historical data
    setHistoricalData(prev => {
      const updated = [...prev, { ...newData, time: Date.now() }];
      return updated.slice(-20);
    });
  };

  // Update data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateIoTData();
      setLiveData(newData);
      setLastUpdated(new Date());
      
      // Add to historical data (keep last 20 points)
      setHistoricalData(prev => {
        const updated = [...prev, { ...newData, time: Date.now() }];
        return updated.slice(-20);
      });
    }, 3000);

    // Initialize with some historical data
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      ...generateIoTData(),
      time: Date.now() - (9 - i) * 3000
    }));
    setHistoricalData(initialData);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'vibration':
        if (value > 15) return 'status-critical';
        if (value > 10) return 'status-warning';
        return 'status-active';
      case 'temperature':
        if (value > 50) return 'status-critical';
        if (value > 40) return 'status-warning';
        return 'status-active';
      case 'load':
        if (value > 90) return 'status-critical';
        if (value > 75) return 'status-warning';
        return 'status-active';
      default:
        return 'status-active';
    }
  };

  const getStatusIcon = (value, type) => {
    const status = getStatusColor(value, type);
    if (status === 'status-critical') return <AlertTriangle className="w-4 h-4" />;
    if (status === 'status-warning') return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Data
              </Badge>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                Updated {lastUpdated.toLocaleTimeString()}
              </Badge>
            </div>
            <Button 
              onClick={refreshData}
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Live IoT Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time monitoring of crane operations and predictive maintenance
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="metric-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Vibration</h3>
              </div>
              {getStatusIcon(liveData.vibration, 'vibration')}
            </div>
            <div className="metric-value">
              {liveData.vibration.toFixed(1)} mm/s
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Normal range: 5-10 mm/s
            </p>
          </Card>

          <Card className="metric-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">Torque</h3>
              </div>
              {getStatusIcon(liveData.torque, 'torque')}
            </div>
            <div className="metric-value">
              {liveData.torque.toFixed(0)} Nm
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Optimal performance
            </p>
          </Card>

          <Card className="metric-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-foreground">Temperature</h3>
              </div>
              {getStatusIcon(liveData.temperature, 'temperature')}
            </div>
            <div className="metric-value">
              {liveData.temperature.toFixed(1)}°C
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <TrendingDown className="w-3 h-3 inline mr-1" />
              Safe operating range
            </p>
          </Card>

          <Card className="metric-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Load</h3>
              </div>
              {getStatusIcon(liveData.load, 'load')}
            </div>
            <div className="metric-value">
              {liveData.load.toFixed(0)}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Current capacity usage
            </p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vibration Trend Chart */}
          <Card className="card-industrial p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Vibration Trends (Last 60 seconds)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vibration" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* System Health Status */}
          <Card className="card-industrial p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Overall System Health
            </h3>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="70%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-30% space-y-3 ml-6">
                {healthData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="card-industrial p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Recent Alerts & Notifications
          </h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className={`p-2 rounded-full ${
                  alert.type === 'warning' ? 'bg-warning/10' :
                  alert.type === 'success' ? 'bg-success/10' : 'bg-secondary/10'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.type === 'warning' ? 'text-warning' :
                      alert.type === 'success' ? 'text-success' : 'text-secondary'
                    }`} />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <Activity className="w-4 h-4 text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{alert.message}</p>
                  <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
                </div>
                <Badge 
                  variant={alert.type === 'warning' ? 'destructive' : 'secondary'}
                  className={
                    alert.type === 'warning' ? 'status-warning' :
                    alert.type === 'success' ? 'status-active' : ''
                  }
                >
                  {alert.type.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Predictive Maintenance Banner */}
        <Card className="card-glow p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  AI Predictive Maintenance Alert
                </h3>
                <p className="text-muted-foreground">
                  Crane B shows early wear indicators. Scheduled maintenance recommended within 12 days.
                </p>
              </div>
            </div>
            <Badge className="status-warning text-sm px-4 py-2">
              ACTION REQUIRED
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


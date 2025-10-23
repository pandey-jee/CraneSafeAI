import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Clock, 
  Users, 
  Award,
  Target,
  CheckCircle,
  Zap,
  BarChart3,
  Calendar,
  Wrench,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const Impact = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [animateCharts, setAnimateCharts] = useState(true);

  // Function to refresh data (simulates real-time updates)
  const refreshData = () => {
    setAnimateCharts(false);
    setTimeout(() => setAnimateCharts(true), 100);
  };
  // Sample impact data over time
  const impactData = [
    { month: 'Jan', safety: 85, downtime: 15, cost: 120000, efficiency: 70 },
    { month: 'Feb', safety: 88, downtime: 12, cost: 110000, efficiency: 74 },
    { month: 'Mar', safety: 91, downtime: 9, cost: 95000, efficiency: 82 },
    { month: 'Apr', safety: 93, downtime: 7, cost: 85000, efficiency: 87 },
    { month: 'May', safety: 95, downtime: 5, cost: 75000, efficiency: 91 },
    { month: 'Jun', safety: 97, downtime: 3, cost: 65000, efficiency: 94 }
  ];

  // Cost savings breakdown
  const costSavingsData = [
    { name: 'Predictive Maintenance', value: 35, amount: 280000, color: 'hsl(var(--primary))' },
    { name: 'Reduced Downtime', value: 30, amount: 240000, color: 'hsl(var(--secondary))' },
    { name: 'Safety Improvements', value: 25, amount: 200000, color: 'hsl(var(--success))' },
    { name: 'Energy Efficiency', value: 10, amount: 80000, color: 'hsl(var(--warning))' }
  ];

  // Future projections
  const projectionData = [
    { year: '2024', traditional: 95, aiPowered: 85 },
    { year: '2025', traditional: 98, aiPowered: 72 },
    { year: '2026', traditional: 102, aiPowered: 65 },
    { year: '2027', traditional: 106, aiPowered: 58 },
    { year: '2028', traditional: 110, aiPowered: 52 }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Safety Improvements",
      description: "95% reduction in safety incidents",
      metric: "95%",
      trend: "+23% this quarter",
      color: "success"
    },
    {
      icon: Clock,
      title: "Reduced Downtime", 
      description: "87% decrease in unexpected failures",
      metric: "87%",
      trend: "+18% this quarter",
      color: "primary"
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "$800K annual maintenance savings",
      metric: "$800K",
      trend: "+32% YoY",
      color: "secondary"
    },
    {
      icon: Zap,
      title: "Energy Efficiency",
      description: "24% reduction in energy consumption",
      metric: "24%",
      trend: "+12% this quarter",
      color: "warning"
    }
  ];

  const futureFeatures = [
    {
      icon: Target,
      title: "AR/VR Integration",
      description: "Immersive crane operation training and real-time overlay guidance for operators",
      timeline: "Q1 2025"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Machine learning models for weather-based operation optimization and risk assessment",
      timeline: "Q2 2025"
    },
    {
      icon: Users,
      title: "Fleet Management",
      description: "Multi-site crane coordination and automated scheduling across construction projects",
      timeline: "Q3 2025"
    },
    {
      icon: CheckCircle,
      title: "Blockchain Integration",
      description: "Immutable equipment history and certification tracking for regulatory compliance",
      timeline: "Q4 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Impact & Future Vision
          </h1>
          <p className="text-muted-foreground text-lg">
            Measurable improvements and our roadmap for the future of crane operations
          </p>
          
          {/* Interactive Controls */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button 
              variant="outline" 
              onClick={refreshData}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </Button>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Last Updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Impact Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="metric-card group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${
                  benefit.color === 'success' ? 'bg-success/10' :
                  benefit.color === 'primary' ? 'bg-primary/10' :
                  benefit.color === 'secondary' ? 'bg-secondary/10' :
                  'bg-warning/10'
                }`}>
                  <benefit.icon className={`w-6 h-6 ${
                    benefit.color === 'success' ? 'text-success' :
                    benefit.color === 'primary' ? 'text-primary' :
                    benefit.color === 'secondary' ? 'text-secondary' :
                    'text-warning'
                  }`} />
                </div>
                <Badge className={`${
                  benefit.color === 'success' ? 'status-active' :
                  benefit.color === 'primary' ? 'bg-primary/20 text-primary' :
                  benefit.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                  'status-warning'
                }`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {benefit.trend}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{benefit.description}</p>
              
              <div className={`text-3xl font-bold ${
                benefit.color === 'success' ? 'text-success' :
                benefit.color === 'primary' ? 'text-primary' :
                benefit.color === 'secondary' ? 'text-secondary' :
                'text-warning'
              }`}>
                {benefit.metric}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Trends */}
          <Card className="card-industrial p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Performance Improvements Over Time
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="safetyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="safety" 
                    stroke="hsl(var(--success))" 
                    fillOpacity={1}
                    fill="url(#safetyGradient)"
                    strokeWidth={3}
                    name="Safety Score"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1}
                    fill="url(#efficiencyGradient)"
                    strokeWidth={3}
                    name="Efficiency Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Cost Savings Breakdown */}
          <Card className="card-industrial p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Annual Cost Savings Breakdown
            </h3>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={costSavingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {costSavingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-40% space-y-3 ml-4">
                {costSavingsData.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Future Projections */}
        <Card className="card-industrial p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            5-Year Cost Projection: Traditional vs AI-Powered Operations
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  label={{ value: 'Relative Cost Index', angle: -90, position: 'insideLeft' }}
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
                  dataKey="traditional" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 5 }}
                  name="Traditional Operations"
                />
                <Line 
                  type="monotone" 
                  dataKey="aiPowered" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  name="AI-Powered Operations"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-destructive rounded"></div>
              <span className="text-sm text-muted-foreground">Traditional Operations (Increasing Costs)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-primary rounded"></div>
              <span className="text-sm text-muted-foreground">AI-Powered Operations (Decreasing Costs)</span>
            </div>
          </div>
        </Card>

        {/* Future Vision Timeline */}
        <Card className="card-industrial p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Future Innovation Roadmap
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {futureFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {feature.timeline}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ROI Summary */}
        <Card className="card-glow p-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Total Return on Investment
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-success mb-2">340%</div>
                <p className="text-muted-foreground">ROI in First Year</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$2.4M</div>
                <p className="text-muted-foreground">Total Savings (Annual)</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">6 Months</div>
                <p className="text-muted-foreground">Payback Period</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Impact;

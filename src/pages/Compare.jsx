import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  GitCompare, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Shield, 
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Download,
  RefreshCw,
  Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Crane data
const craneData = {
  'crane-a': {
    id: 'crane-a',
    name: 'Crane A - Tower Crane TC7050',
    specs: {
      capacity: 95,
      efficiency: 88,
      failureProbability: 12,
      maintenanceCost: 85000,
      safetyRating: 92,
      energyUsage: 78
    },
    status: 'optimal',
    location: 'Construction Site Alpha'
  },
  'crane-b': {
    id: 'crane-b', 
    name: 'Crane B - Mobile Crane MC5000',
    specs: {
      capacity: 75,
      efficiency: 72,
      failureProbability: 18,
      maintenanceCost: 95000,
      safetyRating: 85,
      energyUsage: 85
    },
    status: 'warning',
    location: 'Construction Site Beta'
  },
  'crane-c': {
    id: 'crane-c',
    name: 'Crane C - Crawler Crane CC3200', 
    specs: {
      capacity: 82,
      efficiency: 79,
      failureProbability: 15,
      maintenanceCost: 78000,
      safetyRating: 89,
      energyUsage: 90
    },
    status: 'optimal',
    location: 'Construction Site Gamma'
  }
};

const Compare = () => {
  const [selectedCrane1, setSelectedCrane1] = useState('');
  const [selectedCrane2, setSelectedCrane2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const crane1 = selectedCrane1 ? craneData[selectedCrane1] : null;
  const crane2 = selectedCrane2 ? craneData[selectedCrane2] : null;

  // Prepare comparison data for charts
  const comparisonData = crane1 && crane2 ? [
    {
      metric: 'Load Capacity',
      crane1: crane1.specs.capacity,
      crane2: crane2.specs.capacity,
    },
    {
      metric: 'Efficiency',
      crane1: crane1.specs.efficiency,
      crane2: crane2.specs.efficiency,
    },
    {
      metric: 'Safety Rating',
      crane1: crane1.specs.safetyRating,
      crane2: crane2.specs.safetyRating,
    },
    {
      metric: 'Energy Usage',
      crane1: 100 - crane1.specs.energyUsage, // Inverted for better visualization
      crane2: 100 - crane2.specs.energyUsage,
    }
  ] : [];

  // Radar chart data
  const radarData = crane1 && crane2 ? [
    {
      metric: 'Capacity',
      crane1: crane1.specs.capacity,
      crane2: crane2.specs.capacity,
      fullMark: 100
    },
    {
      metric: 'Efficiency',
      crane1: crane1.specs.efficiency,
      crane2: crane2.specs.efficiency,
      fullMark: 100
    },
    {
      metric: 'Safety',
      crane1: crane1.specs.safetyRating,
      crane2: crane2.specs.safetyRating,
      fullMark: 100
    },
    {
      metric: 'Reliability',
      crane1: 100 - crane1.specs.failureProbability,
      crane2: 100 - crane2.specs.failureProbability,
      fullMark: 100
    },
    {
      metric: 'Cost Efficiency',
      crane1: Math.max(0, 100 - (crane1.specs.maintenanceCost / 100)),
      crane2: Math.max(0, 100 - (crane2.specs.maintenanceCost / 100)),
      fullMark: 100
    }
  ] : [];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'optimal':
        return <Badge className="status-active">Optimal</Badge>;
      case 'warning':
        return <Badge className="status-warning">Warning</Badge>;
      case 'critical':
        return <Badge className="status-critical">Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRecommendation = () => {
    if (!crane1 || !crane2) return null;

    const c1Score = (crane1.specs.capacity + crane1.specs.efficiency + crane1.specs.safetyRating - crane1.specs.failureProbability) / 4;
    const c2Score = (crane2.specs.capacity + crane2.specs.efficiency + crane2.specs.safetyRating - crane2.specs.failureProbability) / 4;

    const better = c1Score > c2Score ? crane1 : crane2;
    const reason = better === crane1 ? 
      (crane1.specs.capacity > crane2.specs.capacity ? 'higher load capacity and' : '') +
      (crane1.specs.efficiency > crane2.specs.efficiency ? ' better efficiency' : '') +
      (crane1.specs.safetyRating > crane2.specs.safetyRating ? ' superior safety rating' : '') :
      (crane2.specs.capacity > crane1.specs.capacity ? 'higher load capacity and' : '') +
      (crane2.specs.efficiency > crane1.specs.efficiency ? ' better efficiency' : '') +
      (crane2.specs.safetyRating > crane1.specs.safetyRating ? ' superior safety rating' : '');

    return {
      crane,
      reason: reason || 'overall better performance metrics'
    };
  };

  const recommendation = getRecommendation();

  const handleExportComparison = () => {
    if (!crane1 || !crane2) return;
    
    const exportData = {
      comparison_date: new Date().toISOString(),
      crane1,
      crane2,
      metrics: comparisonData,
      recommendation: recommendation
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `crane_comparison_${crane1.id}_vs_${crane2.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Comparison Exported",
      description: "The comparison data has been downloaded successfully.",
    });
  };

  const handleRandomComparison = () => {
    setIsLoading(true);
    const craneIds = Object.keys(craneData);
    const shuffled = craneIds.sort(() => 0.5 - Math.random());
    
    setTimeout(() => {
      setSelectedCrane1(shuffled[0]);
      setSelectedCrane2(shuffled[1]);
      setIsLoading(false);
      toast({
        title: "Random Comparison Generated",
        description: "Two cranes have been randomly selected for comparison.",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="container mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
            Crane Comparison Tool
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Compare performance, costs, and efficiency metrics across different cranes
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRandomComparison}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>Random Compare</span>
            </Button>
            
            {crane1 && crane2 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportComparison}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Results</span>
                <span className="sm:hidden">Export</span>
              </Button>
            )}
          </div>
        </div>

        {/* Selection Controls */}
        <Card className="card-industrial p-4 sm:p-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select First Crane</label>
              <Select value={selectedCrane1} onValueChange={setSelectedCrane1}>
                <SelectTrigger className="bg-background border-border w-full">
                  <SelectValue placeholder="Choose a crane..." />
                </SelectTrigger>
                <SelectContent 
                  className="bg-popover border-border z-50 max-h-60 overflow-y-auto"
                  position="popper"
                  sideOffset={5}
                >
                  {Object.values(craneData).map((crane) => (
                    <SelectItem 
                      key={crane.id} 
                      value={crane.id} 
                      disabled={crane.id === selectedCrane2}
                      className="cursor-pointer hover:bg-accent focus:bg-accent"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{crane.name}</span>
                        <span className="text-xs text-muted-foreground">{crane.location}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Second Crane</label>
              <Select value={selectedCrane2} onValueChange={setSelectedCrane2}>
                <SelectTrigger className="bg-background border-border w-full">
                  <SelectValue placeholder="Choose a crane..." />
                </SelectTrigger>
                <SelectContent 
                  className="bg-popover border-border z-50 max-h-60 overflow-y-auto"
                  position="popper"
                  sideOffset={5}
                >
                  {Object.values(craneData).map((crane) => (
                    <SelectItem 
                      key={crane.id} 
                      value={crane.id} 
                      disabled={crane.id === selectedCrane1}
                      className="cursor-pointer hover:bg-accent focus:bg-accent"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{crane.name}</span>
                        <span className="text-xs text-muted-foreground">{crane.location}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {crane1 && crane2 && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button className="btn-hero w-full sm:w-auto">
                <GitCompare className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Compare Selected Cranes</span>
                <span className="sm:hidden">Compare</span>
              </Button>
            </div>
          )}
        </Card>

        {/* Comparison Results */}
        {crane1 && crane2 && (
          <>
            {/* Basic Info Comparison */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card className="card-industrial p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground break-words">{crane1.name}</h3>
                    {getStatusBadge(crane1.status)}
                  </div>
                  <p className="text-muted-foreground text-sm">{crane1.location}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                    <div className="text-center p-3 sm:p-4 bg-primary/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{crane1.specs.capacity}%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Load Capacity</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-secondary/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-secondary">{crane1.specs.efficiency}%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Efficiency</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-success/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-success">{crane1.specs.safetyRating}%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Safety Rating</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-warning/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-warning">${crane1.specs.maintenanceCost}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Maintenance Cost</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card-industrial p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground break-words">{crane2.name}</h3>
                    {getStatusBadge(crane2.status)}
                  </div>
                  <p className="text-muted-foreground text-sm">{crane2.location}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                    <div className="text-center p-3 sm:p-4 bg-primary/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{crane2.specs.capacity}%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Load Capacity</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-secondary/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-secondary">{crane2.specs.efficiency}%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Efficiency</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-success/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-success">{crane2.specs.safetyRating}%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Safety rating</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-warning/10 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-warning">${crane2.specs.maintenanceCost}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Maintenance Cost</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Bar Chart Comparison */}
              <Card className="card-industrial p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                  Performance Metrics
                </h3>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={comparisonData} 
                      margin={{ 
                        top, 
                        right, 
                        left, 
                        bottom: window.innerWidth < 640 ? 80 : 60 
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="metric" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={window.innerWidth < 640 ? 10 : 12}
                        angle={-45}
                        textAnchor="end"
                        height={window.innerWidth < 640 ? 80 : 60}
                        interval={0}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={window.innerWidth < 640 ? 10 : 12}
                        width={30}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar 
                        dataKey="crane1" 
                        fill="hsl(var(--primary))" 
                        name={crane1.name.split(' - ')[1] || 'Crane 1'}
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar 
                        dataKey="crane2" 
                        fill="hsl(var(--secondary))" 
                        name={crane2.name.split(' - ')[1] || 'Crane 2'}
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Radar Chart */}
              <Card className="card-industrial p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                  Performance Radar
                </h3>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      data={radarData} 
                      margin={{ 
                        top, 
                        right, 
                        left, 
                        bottom: 20 
                      }}
                    >
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="metric" 
                        tick={{ 
                          fontSize: window.innerWidth < 640 ? 10 : 12, 
                          fill: 'hsl(var(--muted-foreground))' 
                        }}
                      />
                      <PolarRadiusAxis 
                        domain={[0, 100]} 
                        tick={{ 
                          fontSize: window.innerWidth < 640 ? 8 : 10, 
                          fill: 'hsl(var(--muted-foreground))' 
                        }}
                      />
                      <Radar
                        name={crane1.name.split(' - ')[1] || 'Crane 1'}
                        dataKey="crane1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name={crane2.name.split(' - ')[1] || 'Crane 2'}
                        dataKey="crane2"
                        stroke="hsl(var(--secondary))"
                        fill="hsl(var(--secondary))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* AI Recommendation */}
            {recommendation && (
              <Card className="card-glow p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      AI Recommendation
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Based on the performance analysis, <span className="font-semibold text-foreground">
                      {recommendation.crane.name}</span> is recommended for heavy lifting operations due to its: {recommendation.reason}.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="status-active">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Best Performance
                      </Badge>
                      <Badge className="bg-secondary/20 text-secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        Safety Optimized
                      </Badge>
                      <Badge className="bg-warning/20 text-warning">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Cost Efficient
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Empty State */}
        {(!crane1 || !crane2) && (
          <Card className="card-industrial p-8 sm:p-12 text-center">
            <GitCompare className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              Select Two Cranes to Compare
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              Choose cranes from the dropdowns above to view detailed performance comparisons and AI recommendations.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Compare;

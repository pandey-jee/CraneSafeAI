import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Activity, 
  Eye, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/hero-crane.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 fade-in">
          <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-card rounded-full border border-border">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI + IoT + LIDAR Technology
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Smart Crane
            </span>
            <br />
            <span className="text-foreground">Operations</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered safety monitoring, predictive maintenance, and real-time decision support for construction cranes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hero px-8 py-4 text-lg">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>View Live Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-border hover:bg-muted">
              <Link to="/compare" className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Compare Cranes</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating Metrics */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <Card className="card-glow p-4 bg-card/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full pulse-glow"></div>
              <div>
                <p className="text-sm font-medium text-success-foreground">System Status</p>
                <p className="text-xs text-muted-foreground">All cranes operational</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="absolute bottom-20 left-10 hidden lg:block">
          <Card className="card-glow p-4 bg-card/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-foreground">Live Monitoring</p>
                <p className="text-xs text-muted-foreground">24/7 AI surveillance</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                  <h2 className="text-3xl font-bold text-foreground">The Problem</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Construction crane operations face critical challenges that cost the industry billions annually.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Unexpected equipment failures causing project delays",
                  "Safety incidents due to poor visibility and monitoring",
                  "Inefficient maintenance scheduling and resource allocation",
                  "Lack of real-time operational insights and predictive analytics"
                ].map((problem, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <h2 className="text-3xl font-bold text-foreground">Our Solution</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Comprehensive AI-powered system combining IoT sensors, LIDAR technology, and predictive analytics.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Shield, text: "AI-powered safety monitoring with real-time alerts" },
                  { icon: Activity, text: "Predictive maintenance to prevent costly breakdowns" },
                  { icon: Eye, text: "LIDAR and drone surveillance for enhanced visibility" },
                  { icon: Zap, text: "Smart decision support system for optimal operations" }
                ].map((solution, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <solution.icon className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-foreground font-medium">{solution.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge solutions combining hardware sensors, AI algorithms, and intuitive interfaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "IoT Sensor Network",
                description: "Real-time monitoring of vibration, torque, and temperature across all crane components"
              },
              {
                icon: Eye,
                title: "LIDAR Integration", 
                description: "3D mapping and obstacle detection for enhanced safety and precision operations"
              },
              {
                icon: Zap,
                title: "Predictive AI",
                description: "Machine learning algorithms predict maintenance needs and prevent failures"
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Comprehensive dashboards with KPIs, trends, and optimization recommendations"
              },
              {
                icon: AlertTriangle,
                title: "Real-time Alerts",
                description: "Instant notifications for safety violations, maintenance needs, and anomalies"
              },
              {
                icon: CheckCircle,
                title: "Decision Support",
                description: "AI-powered recommendations for optimal crane selection and operation planning"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-industrial p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Crane Operations?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the future of construction with our AI-powered safety and maintenance platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-hero px-8 py-4 text-lg">
                <Link to="/dashboard">
                  <Activity className="w-5 h-5 mr-2" />
                  Explore Live Dashboard
                </Link>
              </Button>
              
              <Button asChild size="lg" className="btn-teal px-8 py-4 text-lg">
                <Link to="/impact">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  See Impact Metrics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, Activity, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

// Simulate getting live IoT data
const generateLiveData = () => ({
  vibration: (Math.random() * 10 + 5).toFixed(2),
  temperature: (Math.random() * 20 + 65).toFixed(1),
  load: (Math.random() * 80 + 20).toFixed(0),
  torque: (Math.random() * 150 + 100).toFixed(0)
});

const chatResponses = {
  hello: {
    text: "Hello 👋 I'm CraneBot! I can help you explore our Predictive Maintenance System. What would you like to know?",
    quickReplies: ["Show live data", "Explain predictive maintenance", "Compare cranes", "Future vision"]
  },
  "show live data": {
    text: "🔴 LIVE DATA UPDATE:\n📊 Current Crane Status:\n• Vibration: {vibration} Hz\n• Temperature: {temperature}°F\n• Load: {load}%\n• Torque: {torque} Nm\n\n✅ All systems operational!",
    quickReplies: ["Refresh data", "What if values are high?", "Safety thresholds"]
  },
  "show dashboard demo": {
    text: "Great! Our dashboard shows real-time IoT data from industrial cranes. You can see live vibration, torque, temperature, and load metrics with predictive analytics.",
    quickReplies: ["Show live data", "What sensors do you use?", "Safety features"]
  },
  "explain predictive maintenance": {
    text: "Predictive maintenance uses IoT sensors + AI to detect equipment issues before they cause failures. This prevents costly downtime and improves safety by 60%.",
    quickReplies: ["What data do you collect?", "Cost savings?", "Implementation time"]
  },
  "compare cranes": {
    text: "Our comparison tool analyzes different crane models based on performance, safety scores, and operational costs. It helps you choose the best crane for your project!",
    quickReplies: ["Show comparison", "Safety metrics", "Cost analysis"]
  },
  "future vision": {
    text: "🚀 Future features include AR/VR operator training, blockchain equipment tracking, drone-based safety monitoring, and AI-powered route optimization!",
    quickReplies: ["Tell me about drones", "AR training details", "Blockchain benefits"]
  },
  "how does prediction work?": {
    text: "We use machine learning algorithms to analyze vibration patterns, temperature trends, and load data. When anomalies are detected, we alert operators before equipment fails."
  },
  "what sensors do you use?": {
    text: "Our system uses vibration sensors, temperature monitors, load cells, and torque sensors. All data is transmitted via IoT to our cloud analytics platform."
  },
  "safety features": {
    text: "Key safety features: Real-time hazard detection, automated emergency stops, load limit warnings, and predictive failure alerts. Safety is our #1 priority! 🦺"
  },
  "tell me about drones": {
    text: "🚁 Our drone system uses LIDAR to monitor lift zones, detect ground hazards, and ensure safe crane operations. Drones provide 360° awareness that traditional sensors can't match.",
    quickReplies: ["Drone specs", "How often do drones patrol?", "Weather limitations"]
  },
  "cost savings?": {
    text: "💰 Predictive maintenance reduces unplanned downtime by 70%, extends equipment life by 25%, and cuts maintenance costs by 30%. ROI typically achieved in 6-12 months!",
    quickReplies: ["Show ROI calculator", "Implementation cost", "Success stories"]
  },
  "refresh data": {
    text: "🔄 Refreshing live data...\n\n📊 Updated Crane Status:\n• Vibration: {vibration} Hz\n• Temperature: {temperature}°F\n• Load: {load}%\n• Torque: {torque} Nm",
    quickReplies: ["Set alert threshold", "Historical trends", "Export data"]
  },
  "what if values are high?": {
    text: "⚠️ When values exceed thresholds:\n• Automated alerts sent to operators\n• Emergency shutdown if critical\n• Maintenance team notified\n• Root cause analysis initiated",
    quickReplies: ["Show alert system", "Emergency procedures", "Maintenance scheduling"]
  },
  "what makes this solution unique?": {
    text: "Unlike traditional sensor-only systems, we combine IoT + AI + drone monitoring for complete situational awareness. Our predictive algorithms are specifically trained for crane operations."
  },
  default: {
    text: "I'm still learning! 🤖 You can explore more on our Dashboard page or ask me about predictive maintenance, crane safety, or our future vision.",
    quickReplies: ["Show dashboard demo", "Safety features", "Future vision"]
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello 👋 I'm CraneBot! I can help you explore our Predictive Maintenance System.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userMessage)=> {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Check for exact matches first
    if (chatResponses[normalizedMessage]) {
      const response = chatResponses[normalizedMessage];
      // If response contains live data placeholders, replace with actual data
      if (response.text.includes('{vibration}')) {
        const liveData = generateLiveData();
        return {
          ...response,
          text: response.text
            .replace('{vibration}', liveData.vibration)
            .replace('{temperature}', liveData.temperature)
            .replace('{load}', liveData.load)
            .replace('{torque}', liveData.torque)
        };
      }
      return response;
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(chatResponses)) {
      if (key !== 'default' && normalizedMessage.includes(key)) {
        return response;
      }
    }
    
    // Check for keywords
    if (normalizedMessage.includes('live') || normalizedMessage.includes('data') || normalizedMessage.includes('status')) return findResponse("show live data");
    if (normalizedMessage.includes('drone')) return chatResponses["tell me about drones"];
    if (normalizedMessage.includes('predict') || normalizedMessage.includes('maintenance')) return chatResponses["explain predictive maintenance"];
    if (normalizedMessage.includes('dashboard') || normalizedMessage.includes('demo')) return chatResponses["show dashboard demo"];
    if (normalizedMessage.includes('compare') || normalizedMessage.includes('crane')) return chatResponses["compare cranes"];
    if (normalizedMessage.includes('future') || normalizedMessage.includes('vision')) return chatResponses["future vision"];
    if (normalizedMessage.includes('safety')) return chatResponses["safety features"];
    if (normalizedMessage.includes('cost')) return chatResponses["cost savings?"];
    if (normalizedMessage.includes('refresh')) return findResponse("refresh data");
    
    return chatResponses.default;
  };

  const handleSendMessage = (messageText) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);
    
    // Generate bot response with realistic delay
    setTimeout(() => {
      setIsTyping(false);
      const response = findResponse(text);
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasData: response.text.includes('📊') || response.text.includes('🔴')
      };

      setMessages(prev => [...prev, botMessage]);
      
      // If chat is closed, increment unread counter
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, Math.random() * 1000 + 800); // 800-1800ms realistic delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble */}
      {!isOpen && (
        <div className="relative">
          <Button
            onClick={openChat}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center animate-pulse">
              {unreadCount}
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 flex flex-col bg-background/95 backdrop-blur-sm border-primary/20 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">CraneBot</h3>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-xs text-muted-foreground">
                    {isTyping ? 'Typing...' : 'Online'}
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isBot ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line",
                    message.isBot
                      ? message.hasData
                        ? "bg-primary/10 text-foreground border border-primary/20"
                        : "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground ml-4"
                  )}
                >
                  {message.hasData && (
                    <div className="flex items-center gap-1 mb-2 text-xs text-primary">
                      <Activity className="h-3 w-3" />
                      <span>Live IoT Data</span>
                    </div>
                  )}
                  {message.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Reply Buttons */}
            {!isTyping && messages.length > 0 && messages[messages.length - 1].isBot && (
              <div className="flex flex-wrap gap-2 mt-2">
                {findResponse(messages[messages.length - 2]?.text || "").quickReplies?.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs h-7 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Chatbot;

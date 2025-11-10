import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CheckCircle2, TrendingUp, Shield, Award, Calendar } from "lucide-react";

// Mock manager data
const managers = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "SJ",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    experience: 8,
    strategy: "Conservative Growth",
    historicalReturn: 24.5,
    riskLabel: "Low",
    verified: true,
    aum: "2.4M",
    clients: 156,
    bio: "Former institutional trader with 8 years of experience in traditional markets. Specializes in risk-adjusted returns through diversified crypto portfolios.",
    minAllocation: 250,
    feeStructure: "1.5% management fee + 15% performance fee",
  },
  {
    id: 2,
    name: "Michael Chen",
    initials: "MC",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    experience: 6,
    strategy: "Balanced Portfolio",
    historicalReturn: 42.8,
    riskLabel: "Medium",
    verified: true,
    aum: "3.8M",
    clients: 203,
    bio: "Crypto-native investor with deep knowledge of blockchain technology. Focuses on fundamentally strong projects with long-term growth potential.",
    minAllocation: 500,
    feeStructure: "2.0% management fee + 20% performance fee",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    initials: "ER",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    experience: 5,
    strategy: "DeFi Growth",
    historicalReturn: 68.3,
    riskLabel: "Medium-High",
    verified: true,
    aum: "1.9M",
    clients: 89,
    bio: "DeFi specialist with extensive smart contract audit experience. Identifies high-yield opportunities in emerging DeFi protocols.",
    minAllocation: 1000,
    feeStructure: "2.5% management fee + 20% performance fee",
  },
  {
    id: 4,
    name: "David Kim",
    initials: "DK",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    experience: 7,
    strategy: "Aggressive Growth",
    historicalReturn: 125.7,
    riskLabel: "High",
    verified: true,
    aum: "5.2M",
    clients: 127,
    bio: "Venture capital background with focus on early-stage crypto projects. Active in identifying emerging trends before they go mainstream.",
    minAllocation: 1000,
    feeStructure: "3.0% management fee + 25% performance fee",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    initials: "LT",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    experience: 10,
    strategy: "Stablecoin Yield",
    historicalReturn: 8.2,
    riskLabel: "Very Low",
    verified: true,
    aum: "6.7M",
    clients: 412,
    bio: "Fixed-income specialist transitioning to crypto. Focuses on capital preservation and consistent returns through conservative strategies.",
    minAllocation: 100,
    feeStructure: "1.0% management fee + 10% performance fee",
  },
];

const Managers = () => {
  const [selectedManager, setSelectedManager] = useState<typeof managers[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleViewManager = (manager: typeof managers[0]) => {
    setSelectedManager(manager);
    setIsSheetOpen(true);
  };

  const getRiskColor = (risk: string) => {
    if (risk.includes("Low")) return "bg-success/10 text-success border-success/20";
    if (risk.includes("Medium")) return "bg-warning/10 text-warning border-warning/20";
    if (risk.includes("High")) return "bg-destructive/10 text-destructive border-destructive/20";
    return "bg-muted text-muted-foreground";
  };

  return (
    <AppLayout pageTitle="Asset Managers">
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="gradient-primary rounded-lg p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-3">Meet Our Verified Asset Managers</h2>
          <p className="text-lg text-white/90 max-w-3xl">
            All managers are thoroughly vetted and verified. Choose based on strategy, track record, and risk tolerance.
          </p>
        </div>

        {/* Managers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {managers.map((manager) => (
            <Card key={manager.id} className="shadow-card hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={manager.avatar} alt={manager.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {manager.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{manager.name}</CardTitle>
                      {manager.verified && (
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{manager.experience} years experience</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={getRiskColor(manager.riskLabel)}>
                    {manager.riskLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Strategy</div>
                  <div className="font-medium">{manager.strategy}</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Historical Return</div>
                    <div className="text-lg font-bold text-success">+{manager.historicalReturn}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">AUM</div>
                    <div className="text-lg font-bold">${manager.aum}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Clients</div>
                    <div className="text-lg font-bold">{manager.clients}</div>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewManager(manager)}
                  className="w-full bg-primary hover:bg-primary-hover"
                >
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Our Managers */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Why Choose BlueWave Managers?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Verified & Vetted</h3>
                  <p className="text-sm text-muted-foreground">
                    All managers undergo rigorous verification including background checks and track record validation.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="w-8 h-8 text-success flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Transparent Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time performance tracking with complete transaction history and verified returns.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Aligned Incentives</h3>
                  <p className="text-sm text-muted-foreground">
                    Performance-based fees mean managers only earn more when your portfolio grows.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manager Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-4 mb-2">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedManager?.avatar} alt={selectedManager?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {selectedManager?.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-2xl flex items-center gap-2">
                  {selectedManager?.name}
                  {selectedManager?.verified && (
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  )}
                </SheetTitle>
                <SheetDescription>{selectedManager?.strategy}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Historical Return</div>
                  <div className="text-2xl font-bold text-success">+{selectedManager?.historicalReturn}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Experience</div>
                  <div className="text-2xl font-bold">{selectedManager?.experience} years</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">AUM</div>
                  <div className="text-2xl font-bold">${selectedManager?.aum}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Clients</div>
                  <div className="text-2xl font-bold">{selectedManager?.clients}</div>
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{selectedManager?.bio}</p>
            </div>

            {/* Fee Structure */}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Fee Structure</h3>
              <p className="text-sm">{selectedManager?.feeStructure}</p>
            </div>

            {/* Min Allocation */}
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Minimum Allocation</span>
              <span className="text-lg font-bold">${selectedManager?.minAllocation}</span>
            </div>

            {/* Risk Badge */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Risk Level:</span>
              <Badge variant="outline" className={getRiskColor(selectedManager?.riskLabel || "")}>
                {selectedManager?.riskLabel}
              </Badge>
            </div>

            {/* CTA */}
            <Button className="w-full bg-primary hover:bg-primary-hover" size="lg">
              Invest with {selectedManager?.name}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default Managers;

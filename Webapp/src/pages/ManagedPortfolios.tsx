import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Briefcase, TrendingUp, Shield, DollarSign } from "lucide-react";
import { toast } from "sonner";

// Mock portfolio data
const portfolios = [
  {
    id: 1,
    name: "Conservative Growth",
    strategy: "70% BTC, 30% ETH - Long-term holding strategy",
    riskLevel: "Low",
    performance12m: 24.5,
    minDeposit: 250,
    managementFee: 1.5,
    managerName: "Sarah Johnson",
    description: "Perfect for beginners. Focus on established cryptocurrencies with proven track records.",
  },
  {
    id: 2,
    name: "Balanced Portfolio",
    strategy: "50% BTC, 30% ETH, 20% Top Altcoins",
    riskLevel: "Medium",
    performance12m: 42.8,
    minDeposit: 500,
    managementFee: 2.0,
    managerName: "Michael Chen",
    description: "Diversified approach balancing stability with growth opportunities.",
  },
  {
    id: 3,
    name: "DeFi Growth",
    strategy: "DeFi protocols and emerging tokens",
    riskLevel: "Medium",
    performance12m: 68.3,
    minDeposit: 1000,
    managementFee: 2.5,
    managerName: "Emma Rodriguez",
    description: "Focused on decentralized finance protocols with high growth potential.",
  },
  {
    id: 4,
    name: "Aggressive Growth",
    strategy: "High-potential altcoins and emerging projects",
    riskLevel: "High",
    performance12m: 125.7,
    minDeposit: 1000,
    managementFee: 3.0,
    managerName: "David Kim",
    description: "For experienced investors seeking maximum returns with higher volatility.",
  },
  {
    id: 5,
    name: "Stablecoin Yield",
    strategy: "USDC/USDT staking and lending",
    riskLevel: "Very Low",
    performance12m: 8.2,
    minDeposit: 100,
    managementFee: 1.0,
    managerName: "Lisa Thompson",
    description: "Conservative strategy focusing on stable returns through stablecoin protocols.",
  },
];

const ManagedPortfolios = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<typeof portfolios[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState("");

  const handleInvestClick = (portfolio: typeof portfolios[0]) => {
    setSelectedPortfolio(portfolio);
    setInvestAmount(portfolio.minDeposit.toString());
    setIsModalOpen(true);
  };

  const handleConfirmInvestment = () => {
    if (!investAmount || parseFloat(investAmount) < (selectedPortfolio?.minDeposit || 0)) {
      toast.error(`Minimum investment is $${selectedPortfolio?.minDeposit}`);
      return;
    }
    toast.success(`Investment of $${parseFloat(investAmount).toLocaleString()} confirmed!`);
    setIsModalOpen(false);
    setInvestAmount("");
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
        return "bg-success/10 text-success border-success/20";
      case "Low":
        return "bg-success/10 text-success border-success/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "High":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout pageTitle="Managed Portfolios">
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Hero Section */}
        <div className="gradient-primary rounded-lg p-8 text-white shadow-lg">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-3">Invest with Professional Asset Managers</h2>
            <p className="text-lg text-white/90 mb-4">
              Let experienced professionals manage your crypto investments. Our verified managers use proven strategies
              to help you build wealth while you focus on what matters.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Verified Managers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Transparent Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Start from $100</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>How Managed Investing Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Choose a Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Select a strategy that matches your risk tolerance and investment goals
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Deposit Funds</h3>
                <p className="text-sm text-muted-foreground">
                  Fund your investment with as little as $100 to get started
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Sit Back & Grow</h3>
                <p className="text-sm text-muted-foreground">
                  Professional managers handle trading while you track performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="shadow-card hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      {portfolio.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{portfolio.strategy}</p>
                  </div>
                  <Badge variant="outline" className={getRiskColor(portfolio.riskLevel)}>
                    {portfolio.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">12-Month Performance</div>
                  <div className="text-2xl font-bold text-success">+{portfolio.performance12m}%</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Min. Deposit</div>
                    <div className="font-semibold">${portfolio.minDeposit}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Management Fee</div>
                    <div className="font-semibold">{portfolio.managementFee}%</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-1">Managed by</div>
                  <div className="font-medium">{portfolio.managerName}</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button onClick={() => handleInvestClick(portfolio)} className="flex-1 bg-primary hover:bg-primary-hover">
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Investment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in {selectedPortfolio?.name}</DialogTitle>
            <DialogDescription>
              Start building wealth with professional management
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Strategy</div>
              <div className="text-sm font-medium">{selectedPortfolio?.strategy}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invest-amount">Investment Amount (USD)</Label>
              <Input
                id="invest-amount"
                type="number"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Minimum: ${selectedPortfolio?.minDeposit}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Investment Amount</span>
                <span className="font-medium">${parseFloat(investAmount || "0").toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Management Fee</span>
                <span className="font-medium">{selectedPortfolio?.managementFee}%</span>
              </div>
            </div>

            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-xs text-warning-foreground">
              <strong>Risk Disclaimer:</strong> Cryptocurrency investments carry risk. Past performance does not
              guarantee future results. Only invest what you can afford to lose.
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmInvestment} className="bg-primary hover:bg-primary-hover">
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ManagedPortfolios;

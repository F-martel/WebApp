import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Briefcase, Wallet, DollarSign, Shield, CreditCard } from "lucide-react";

// Mock data
const portfolioData = {
  totalValue: 24582.50,
  todaysPL: 312.45,
  todaysPLPercent: 1.29,
  allTimeReturn: 3240.80,
  allTimeReturnPercent: 15.2,
};

const managedInvestments = {
  allocated: 18420.00,
  numberOfManagers: 3,
  averageReturn: 18.5,
};

const manualTrades = {
  cashAvailable: 6162.50,
  topHoldings: [
    { symbol: "BTC", name: "Bitcoin", amount: 0.245, value: 10250.00 },
    { symbol: "ETH", name: "Ethereum", amount: 3.5, value: 5840.00 },
    { symbol: "SOL", name: "Solana", amount: 45.2, value: 3920.00 },
  ],
};

const nextActions = [
  { icon: Briefcase, title: "Start with a managed portfolio", description: "Let professionals grow your investment", action: "Browse Portfolios" },
  { icon: Shield, title: "Verify your identity", description: "Quick 5-minute process", action: "Complete KYC" },
  { icon: CreditCard, title: "Fund your account", description: "Add money to start investing", action: "Deposit Funds" },
];

const Dashboard = () => {
  return (
    <AppLayout pageTitle="Dashboard">
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Welcome Banner */}
        <div className="gradient-primary rounded-lg p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-white/90 text-lg">Your portfolio is up {portfolioData.todaysPLPercent}% today</p>
        </div>

        {/* Portfolio Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
                <div className="text-3xl font-bold text-foreground">${portfolioData.totalValue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Today's P/L</div>
                <div className={`text-3xl font-bold ${portfolioData.todaysPL >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {portfolioData.todaysPL >= 0 ? '+' : ''}${portfolioData.todaysPL.toLocaleString()}
                </div>
                <div className={`text-sm ${portfolioData.todaysPL >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {portfolioData.todaysPL >= 0 ? '+' : ''}{portfolioData.todaysPLPercent}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">All-Time Return</div>
                <div className="text-3xl font-bold text-success">
                  +${portfolioData.allTimeReturn.toLocaleString()}
                </div>
                <div className="text-sm text-success">+{portfolioData.allTimeReturnPercent}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Managed Investments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Managed Investments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount Allocated</span>
                <span className="text-xl font-semibold">${managedInvestments.allocated.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Managers</span>
                <span className="text-xl font-semibold">{managedInvestments.numberOfManagers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Return</span>
                <span className="text-xl font-semibold text-success">+{managedInvestments.averageReturn}%</span>
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary-hover text-primary-foreground">
                View All Portfolios
              </Button>
            </CardContent>
          </Card>

          {/* Manual Trades */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Manual Trades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Cash Available</span>
                <span className="text-xl font-semibold text-accent">${manualTrades.cashAvailable.toLocaleString()}</span>
              </div>
              <div>
                <div className="text-sm font-medium mb-3">Top Holdings</div>
                <div className="space-y-3">
                  {manualTrades.topHoldings.map((holding) => (
                    <div key={holding.symbol} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{holding.symbol}</div>
                        <div className="text-sm text-muted-foreground">{holding.amount} {holding.symbol}</div>
                      </div>
                      <div className="text-right font-semibold">${holding.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full mt-4 bg-accent hover:bg-accent-hover text-accent-foreground">
                Start Trading
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Portfolio Performance (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Chart visualization area - ready for Recharts integration
            </div>
          </CardContent>
        </Card>

        {/* Next Best Actions */}
        <Card className="shadow-card border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">Get Started with BlueWave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextActions.map((action, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-smooth cursor-pointer">
                  <action.icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {action.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

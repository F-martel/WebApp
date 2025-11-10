import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban, Briefcase, ArrowLeft } from "lucide-react";

const ManualTradingRetired = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AppLayout pageTitle="Manual Trading Retired">
      <div className="p-6 space-y-6 animate-fade-in">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleGoBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>

        <Card className="max-w-3xl shadow-card border-2 border-dashed border-muted mx-auto">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-semibold">Manual Trading Is No Longer Supported</CardTitle>
            <Alert variant="default" className="bg-muted">
              <Ban className="w-5 h-5" />
              <AlertTitle className="font-semibold">What changed?</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                We&apos;ve sunset manual trading so that BlueWave can focus entirely on curated managed portfolios.
                Your existing allocations and transaction history are still available under the managed investing views.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Explore our vetted asset managers, review historical performance, and allocate funds in minutes. Every
              portfolio is monitored by our investment team so you can benefit from professional expertise without the
              complexity of day-to-day trading.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Managed Portfolios
                </h3>
                <p className="text-sm text-muted-foreground">
                  Diversified strategies with transparent fees and performance reporting.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Experienced Managers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Partner with specialists who actively manage portfolios and keep you informed.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="gap-2" onClick={() => navigate("/portfolios")}> 
                <Briefcase className="w-4 h-4" />
                Browse Managed Portfolios
              </Button>
              <Button variant="outline" onClick={() => navigate("/transactions")}>
                View Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ManualTradingRetired;

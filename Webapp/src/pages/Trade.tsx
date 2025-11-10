import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";

// Mock crypto data
const cryptoAssets = [
  { symbol: "BTC", name: "Bitcoin", price: 41836.50, change24h: 2.4 },
  { symbol: "ETH", name: "Ethereum", price: 2238.90, change24h: -1.2 },
  { symbol: "SOL", name: "Solana", price: 86.70, change24h: 5.8 },
  { symbol: "USDC", name: "USD Coin", price: 1.00, change24h: 0.0 },
];

const Trade = () => {
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentAsset = cryptoAssets.find((a) => a.symbol === selectedAsset);
  const estimatedQuantity = amount && currentAsset ? (parseFloat(amount) / currentAsset.price).toFixed(6) : "0.000000";
  const fee = amount ? (parseFloat(amount) * 0.005).toFixed(2) : "0.00"; // 0.5% fee
  const total = amount ? (parseFloat(amount) + parseFloat(fee)).toFixed(2) : "0.00";

  const handleConfirmOrder = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setIsModalOpen(true);
  };

  const handleExecuteOrder = () => {
    toast.success(`${side === "buy" ? "Buy" : "Sell"} order placed successfully!`);
    setIsModalOpen(false);
    setAmount("");
  };

  return (
    <AppLayout pageTitle="Trade">
      <div className="p-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Trade Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Buy or Sell Crypto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Buy/Sell Toggle */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSide("buy")}
                    className={`flex-1 ${
                      side === "buy"
                        ? "bg-success hover:bg-success/90 text-success-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    Buy
                  </Button>
                  <Button
                    onClick={() => setSide("sell")}
                    className={`flex-1 ${
                      side === "sell"
                        ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    Sell
                  </Button>
                </div>

                {/* Asset Selection */}
                <div className="space-y-2">
                  <Label htmlFor="asset">Select Asset</Label>
                  <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                    <SelectTrigger id="asset">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          {asset.name} ({asset.symbol}) - ${asset.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Estimated Quantity */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Estimated Quantity</span>
                    <span className="text-lg font-semibold">
                      {estimatedQuantity} {selectedAsset}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <span className="text-sm font-medium">
                      ${currentAsset?.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleConfirmOrder}
                  className={`w-full text-lg py-6 ${
                    side === "buy"
                      ? "bg-success hover:bg-success/90 text-success-foreground"
                      : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  }`}
                >
                  {side === "buy" ? "Confirm Buy Order" : "Confirm Sell Order"}
                </Button>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center">
                  Crypto trading involves risk. Past performance doesn't guarantee future results.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Market Overview */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Live Markets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cryptoAssets.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-smooth"
                      onClick={() => setSelectedAsset(asset.symbol)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{asset.symbol}</div>
                          <div className="text-xs text-muted-foreground">{asset.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${asset.price.toLocaleString()}</div>
                          <div className={`text-xs flex items-center gap-1 ${asset.change24h >= 0 ? "text-success" : "text-destructive"}`}>
                            {asset.change24h >= 0 ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            {Math.abs(asset.change24h)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Trading Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trading Fee</span>
                  <span className="font-medium">0.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Settlement</span>
                  <span className="font-medium">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Limit</span>
                  <span className="font-medium">$25,000</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>
              Please review your order details before confirming
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Action</span>
              <span className={`font-semibold ${side === "buy" ? "text-success" : "text-destructive"}`}>
                {side === "buy" ? "Buy" : "Sell"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Asset</span>
              <span className="font-semibold">{selectedAsset}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">${parseFloat(amount || "0").toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-semibold">{estimatedQuantity} {selectedAsset}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Fee (0.5%)</span>
              <span>${fee}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold">${total}</span>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleExecuteOrder}
              className={side === "buy" ? "bg-success hover:bg-success/90" : "bg-destructive hover:bg-destructive/90"}
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Trade;

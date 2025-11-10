import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Briefcase, DollarSign } from "lucide-react";

// Mock transaction data
const mockTransactions = [
  { id: "TX001", date: "2025-01-15", type: "Deposit", asset: "USD", amount: 5000.00, status: "Completed", icon: ArrowDownRight },
  { id: "TX002", date: "2025-01-14", type: "Trade", asset: "BTC", amount: -2500.00, status: "Completed", icon: DollarSign },
  { id: "TX003", date: "2025-01-14", type: "Managed Investment", asset: "Conservative Growth", amount: -1000.00, status: "Completed", icon: Briefcase },
  { id: "TX004", date: "2025-01-13", type: "Trade", asset: "ETH", amount: -800.00, status: "Completed", icon: DollarSign },
  { id: "TX005", date: "2025-01-12", type: "Withdrawal", asset: "USD", amount: -500.00, status: "Pending", icon: ArrowUpRight },
  { id: "TX006", date: "2025-01-11", type: "Managed Investment", asset: "DeFi Growth", amount: -1500.00, status: "Completed", icon: Briefcase },
  { id: "TX007", date: "2025-01-10", type: "Trade", asset: "SOL", amount: -300.00, status: "Completed", icon: DollarSign },
  { id: "TX008", date: "2025-01-09", type: "Deposit", asset: "USD", amount: 2000.00, status: "Completed", icon: ArrowDownRight },
  { id: "TX009", date: "2025-01-08", type: "Trade", asset: "BTC", amount: 150.00, status: "Completed", icon: DollarSign },
  { id: "TX010", date: "2025-01-07", type: "Withdrawal", asset: "USD", amount: -1000.00, status: "Failed", icon: ArrowUpRight },
  { id: "TX011", date: "2025-01-06", type: "Managed Investment", asset: "Balanced Portfolio", amount: -750.00, status: "Completed", icon: Briefcase },
  { id: "TX012", date: "2025-01-05", type: "Trade", asset: "ETH", amount: -400.00, status: "Completed", icon: DollarSign },
  { id: "TX013", date: "2025-01-04", type: "Deposit", asset: "USD", amount: 3000.00, status: "Completed", icon: ArrowDownRight },
  { id: "TX014", date: "2025-01-03", type: "Trade", asset: "USDC", amount: -500.00, status: "Completed", icon: DollarSign },
  { id: "TX015", date: "2025-01-02", type: "Managed Investment", asset: "Aggressive Growth", amount: -2000.00, status: "Completed", icon: Briefcase },
];

const Transactions = () => {
  const [filterType, setFilterType] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (filterType !== "All" && tx.type !== filterType) return false;
    if (startDate && tx.date < startDate) return false;
    if (endDate && tx.date > endDate) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success border-success/20";
      case "Pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "Failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "text-success";
      case "Withdrawal":
        return "text-destructive";
      case "Trade":
        return "text-accent";
      case "Managed Investment":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  return (
    <AppLayout pageTitle="Transactions">
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Transactions</SelectItem>
                    <SelectItem value="Deposit">Deposits</SelectItem>
                    <SelectItem value="Withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="Trade">Trades</SelectItem>
                    <SelectItem value="Managed Investment">Managed Investments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Results Count */}
              <div className="space-y-2">
                <Label>Results</Label>
                <div className="h-10 flex items-center px-3 bg-muted rounded-md font-medium">
                  {filteredTransactions.length} transactions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Asset/Portfolio</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => {
                    const Icon = tx.icon;
                    return (
                      <TableRow key={tx.id} className="hover:bg-muted/50 transition-smooth">
                        <TableCell className="font-medium">
                          {new Date(tx.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${getTypeColor(tx.type)}`} />
                            <span className={getTypeColor(tx.type)}>{tx.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{tx.asset}</TableCell>
                        <TableCell className={`text-right font-semibold ${tx.amount >= 0 ? 'text-success' : 'text-foreground'}`}>
                          {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className={getStatusColor(tx.status)}>
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No transactions found for the selected filters
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Transactions;

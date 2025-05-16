
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { DollarSign, IndianRupee } from "lucide-react";

// Define broker options for comparison
const indianBrokers = [
  { id: 'zerodha', name: 'Zerodha', deliveryFee: 0, intraday: 0.03, equity: 0.03, futuresPercent: 0.03, optionsPercent: 0, optionsFlat: 20 },
  { id: 'groww', name: 'Groww', deliveryFee: 0, intraday: 0.05, equity: 0.05, futuresPercent: 0.05, optionsPercent: 0, optionsFlat: 20 },
  { id: 'upstox', name: 'Upstox', deliveryFee: 0, intraday: 0.05, equity: 0.05, futuresPercent: 0.05, optionsPercent: 0, optionsFlat: 20 },
  { id: 'angelone', name: 'Angel One', deliveryFee: 0, intraday: 0.05, equity: 0.05, futuresPercent: 0.05, optionsPercent: 0, optionsFlat: 20 },
  { id: 'icicidirect', name: 'ICICI Direct', deliveryFee: 0.55, intraday: 0.275, equity: 0.55, futuresPercent: 0.05, optionsPercent: 0, optionsFlat: 20 },
];

const usBrokers = [
  { id: 'robinhood', name: 'Robinhood', baseCommission: 0, perContract: 0 },
  { id: 'tdameritrade', name: 'TD Ameritrade', baseCommission: 0, perContract: 0.65 },
  { id: 'etrade', name: 'E*TRADE', baseCommission: 0, perContract: 0.65 },
  { id: 'schwab', name: 'Charles Schwab', baseCommission: 0, perContract: 0.65 },
  { id: 'fidelity', name: 'Fidelity', baseCommission: 0, perContract: 0.65 },
];

export const BrokerageCalculator = () => {
  const [region, setRegion] = useState<"india" | "us">("india");
  const [calculatorType, setCalculatorType] = useState("fees");
  const [tradeType, setTradeType] = useState("delivery");
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(110);
  const [quantity, setQuantity] = useState(100);
  const [broker, setBroker] = useState("zerodha");
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(["zerodha", "groww"]);
  const [turnover, setTurnover] = useState(10000000); // Default 1 crore
  const [showResults, setShowResults] = useState(false);

  // Calculate Indian brokerage and taxes
  const calculateIndianBrokerage = () => {
    const buyValue = buyPrice * quantity;
    const sellValue = sellPrice * quantity;
    const totalValue = buyValue + sellValue;
    
    // Find selected broker
    const currentBroker = indianBrokers.find(b => b.id === broker) || indianBrokers[0];
    
    // Calculate brokerage based on trade type
    let brokerage = 0;
    if (tradeType === "delivery") {
      brokerage = (buyValue + sellValue) * (currentBroker.deliveryFee / 100);
    } else if (tradeType === "intraday") {
      brokerage = (buyValue + sellValue) * (currentBroker.intraday / 100);
    } else if (tradeType === "futures") {
      brokerage = (buyValue + sellValue) * (currentBroker.futuresPercent / 100);
    } else if (tradeType === "options") {
      brokerage = currentBroker.optionsFlat * 2; // Buy and sell
    }
    
    // Cap brokerage at 20 per order
    brokerage = Math.min(brokerage, 40); // 20 per side
    
    // STT (Securities Transaction Tax)
    let stt = 0;
    if (tradeType === "delivery") {
      stt = sellValue * 0.001; // 0.1% on sell side only
    } else if (tradeType === "intraday") {
      stt = sellValue * 0.00025; // 0.025% on sell side only
    } else if (tradeType === "futures") {
      stt = sellValue * 0.0001; // 0.01% on sell side only
    } else if (tradeType === "options") {
      stt = sellValue * 0.0005; // 0.05% on sell side only
    }
    
    // Exchange Transaction Charges
    const exchangeCharges = totalValue * 0.0000345;
    
    // SEBI Charges
    const sebiCharges = totalValue * 0.000001;
    
    // Stamp Duty (varies by state, using Maharashtra for example)
    const stampDuty = buyValue * 0.00015;
    
    // GST on brokerage and exchange charges (18%)
    const gst = (brokerage + exchangeCharges) * 0.18;
    
    // Total cost
    const totalCharges = brokerage + stt + exchangeCharges + sebiCharges + stampDuty + gst;
    
    // P&L calculation
    const grossPnl = sellValue - buyValue;
    const netPnl = grossPnl - totalCharges;
    
    return {
      brokerage,
      stt,
      exchangeCharges,
      sebiCharges,
      stampDuty,
      gst,
      totalCharges,
      grossPnl,
      netPnl
    };
  };

  // Calculate US brokerage and fees
  const calculateUSBrokerage = () => {
    const buyValue = buyPrice * quantity;
    const sellValue = sellPrice * quantity;
    const totalValue = buyValue + sellValue;
    
    // Find selected broker
    const currentBroker = usBrokers.find(b => b.id === broker) || usBrokers[0];
    
    // Calculate commission
    let commission = 0;
    if (tradeType === "stocks") {
      commission = currentBroker.baseCommission * 2; // Buy and sell
    } else if (tradeType === "options") {
      commission = (currentBroker.baseCommission + currentBroker.perContract * quantity) * 2; // Buy and sell
    }
    
    // SEC fees (only on sells, currently 0.0000229 of sell value)
    const secFee = sellValue * 0.0000229;
    
    // TAF fee (only on sells, $0.000119 per share, min $0.01, max $5.95)
    const tafFee = Math.min(Math.max(0.01, sellValue * 0.000119), 5.95);
    
    // FINRA Trading Activity Fee (only on sells, $0.000119 per share, min $0.01, max $5.95)
    const finraFee = Math.min(Math.max(0.01, quantity * 0.000119), 5.95);
    
    // Options Regulatory Fee (only for options, $0.0169 per contract)
    const orfFee = tradeType === "options" ? quantity * 0.0169 : 0;
    
    // Exchange fees (varies by exchange, using $0.003 per share as average)
    const exchangeFees = quantity * 0.003;
    
    // Total cost
    const totalCharges = commission + secFee + tafFee + finraFee + orfFee + exchangeFees;
    
    // P&L calculation
    const grossPnl = sellValue - buyValue;
    const netPnl = grossPnl - totalCharges;
    
    return {
      commission,
      secFee,
      tafFee,
      finraFee,
      orfFee,
      exchangeFees,
      totalCharges,
      grossPnl,
      netPnl
    };
  };

  // Calculate Indian turnover
  const calculateIndianTurnover = () => {
    // Calculate annual turnover implications
    const needsAudit = turnover >= 100000000; // 10 crore threshold
    const gstRegistration = turnover >= 2000000; // 20 lakh threshold
    
    return {
      turnover,
      needsAudit,
      gstRegistration
    };
  };

  // Compare brokers
  const compareBrokers = () => {
    const brokersList = region === "india" ? indianBrokers : usBrokers;
    const results = selectedBrokers.map(brokerId => {
      const brokerInfo = brokersList.find(b => b.id === brokerId);
      if (!brokerInfo) return null;
      
      // Save current broker
      const currentBroker = broker;
      // Set temporary broker for calculation
      setBroker(brokerId);
      // Calculate fees
      const result = region === "india" ? calculateIndianBrokerage() : calculateUSBrokerage();
      // Restore original broker
      setBroker(currentBroker);
      
      return {
        name: brokerInfo.name,
        ...result
      };
    }).filter(Boolean);
    
    return results;
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  // Formatter for currency
  const formatCurrency = (value: number) => {
    if (region === "india") {
      return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    } else {
      return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Tabs 
          defaultValue="fees" 
          value={calculatorType}
          onValueChange={setCalculatorType}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="fees">Brokerage & Fees</TabsTrigger>
            <TabsTrigger value="turnover">Turnover Calculator</TabsTrigger>
            <TabsTrigger value="compare">Broker Comparison</TabsTrigger>
          </TabsList>
          
          {/* Region selection for all tabs */}
          <div className="mb-6">
            <Label>Select Region</Label>
            <div className="flex mt-2 space-x-2">
              <Button
                variant={region === "india" ? "default" : "outline"}
                onClick={() => setRegion("india")}
                className="flex items-center gap-2"
              >
                <IndianRupee size={16} /> India
              </Button>
              <Button
                variant={region === "us" ? "default" : "outline"}
                onClick={() => setRegion("us")}
                className="flex items-center gap-2"
              >
                <DollarSign size={16} /> United States
              </Button>
            </div>
          </div>
          
          {/* Brokerage & Fees Calculator */}
          <TabsContent value="fees" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Trade Type</Label>
                <Select 
                  value={tradeType} 
                  onValueChange={setTradeType}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {region === "india" ? (
                      <>
                        <SelectItem value="delivery">Equity Delivery</SelectItem>
                        <SelectItem value="intraday">Equity Intraday</SelectItem>
                        <SelectItem value="futures">Futures</SelectItem>
                        <SelectItem value="options">Options</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="stocks">Stocks</SelectItem>
                        <SelectItem value="options">Options</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Broker</Label>
                <Select 
                  value={broker} 
                  onValueChange={setBroker}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(region === "india" ? indianBrokers : usBrokers).map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Buy Price</Label>
                <Input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Sell Price</Label>
                <Input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={calculateResults}
            >
              Calculate Brokerage & Fees
            </Button>
            
            {showResults && calculatorType === "fees" && (
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Results</h3>
                
                {region === "india" ? (
                  // Indian brokerage and taxes results
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Buy Value</p>
                        <p className="font-medium">{formatCurrency(buyPrice * quantity)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sell Value</p>
                        <p className="font-medium">{formatCurrency(sellPrice * quantity)}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="font-medium mb-2">Charges Breakdown</h4>
                    
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Brokerage</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().brokerage)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Securities Transaction Tax (STT)</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().stt)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Exchange Transaction Charges</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().exchangeCharges)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>SEBI Charges</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().sebiCharges)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Stamp Duty</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().stampDuty)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>GST (18%)</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().gst)}</TableCell>
                        </TableRow>
                        <TableRow className="font-medium">
                          <TableCell>Total Charges</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateIndianBrokerage().totalCharges)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Gross P&L</p>
                        <p className={`font-medium ${calculateIndianBrokerage().grossPnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(calculateIndianBrokerage().grossPnl)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net P&L (after charges)</p>
                        <p className={`font-medium ${calculateIndianBrokerage().netPnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(calculateIndianBrokerage().netPnl)}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  // US brokerage and fees results
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Buy Value</p>
                        <p className="font-medium">{formatCurrency(buyPrice * quantity)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sell Value</p>
                        <p className="font-medium">{formatCurrency(sellPrice * quantity)}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="font-medium mb-2">Charges Breakdown</h4>
                    
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Commission</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().commission)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>SEC Fee</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().secFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>TAF Fee</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().tafFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>FINRA Trading Activity Fee</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().finraFee)}</TableCell>
                        </TableRow>
                        {tradeType === "options" && (
                          <TableRow>
                            <TableCell>Options Regulatory Fee</TableCell>
                            <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().orfFee)}</TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell>Exchange Fees</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().exchangeFees)}</TableCell>
                        </TableRow>
                        <TableRow className="font-medium">
                          <TableCell>Total Charges</TableCell>
                          <TableCell className="text-right">{formatCurrency(calculateUSBrokerage().totalCharges)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Gross P&L</p>
                        <p className={`font-medium ${calculateUSBrokerage().grossPnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(calculateUSBrokerage().grossPnl)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net P&L (after charges)</p>
                        <p className={`font-medium ${calculateUSBrokerage().netPnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(calculateUSBrokerage().netPnl)}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Turnover Calculator (India only) */}
          <TabsContent value="turnover" className="space-y-4">
            {region === "india" ? (
              <>
                <div className="space-y-4">
                  <div>
                    <Label>Annual Turnover (₹)</Label>
                    <Input
                      type="number"
                      value={turnover}
                      onChange={(e) => setTurnover(parseFloat(e.target.value) || 0)}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter your estimated annual trading turnover
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={calculateResults}
                  >
                    Analyze Turnover Requirements
                  </Button>
                  
                  {showResults && calculatorType === "turnover" && (
                    <div className="mt-6 border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-4">Turnover Analysis</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Turnover</p>
                          <p className="font-medium">₹{calculateIndianTurnover().turnover.toLocaleString('en-IN')}</p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium">Tax Audit Requirement</h4>
                          <div className={`mt-2 p-3 rounded-md ${calculateIndianTurnover().needsAudit ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
                            {calculateIndianTurnover().needsAudit ? (
                              <p>Your turnover exceeds ₹10 crore. You need a tax audit under section 44AB of Income Tax Act.</p>
                            ) : (
                              <p>Your turnover is below ₹10 crore. No mandatory tax audit required.</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium">GST Registration</h4>
                          <div className={`mt-2 p-3 rounded-md ${calculateIndianTurnover().gstRegistration ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
                            {calculateIndianTurnover().gstRegistration ? (
                              <p>Your turnover exceeds ₹20 lakh. GST registration may be required depending on your business structure.</p>
                            ) : (
                              <p>Your turnover is below ₹20 lakh. GST registration may not be mandatory.</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-4">
                          <p>Note: This is for informational purposes only. Please consult with a tax professional for specific advice.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <h3 className="text-lg font-medium">Turnover Calculator</h3>
                <p className="text-muted-foreground mt-2">
                  Turnover calculator is only available for Indian markets.
                  Please select India as the region to use this calculator.
                </p>
                <Button 
                  onClick={() => setRegion("india")} 
                  className="mt-4"
                >
                  Switch to India
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Broker Comparison */}
          <TabsContent value="compare" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Select Brokers to Compare</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {(region === "india" ? indianBrokers : usBrokers).map((b) => (
                    <Button
                      key={b.id}
                      variant={selectedBrokers.includes(b.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedBrokers.includes(b.id)) {
                          setSelectedBrokers(selectedBrokers.filter(id => id !== b.id));
                        } else {
                          setSelectedBrokers([...selectedBrokers, b.id]);
                        }
                      }}
                      className="justify-start"
                    >
                      {b.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Buy Price</Label>
                  <Input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Sell Price</Label>
                  <Input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Trade Type</Label>
                  <Select 
                    value={tradeType} 
                    onValueChange={setTradeType}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {region === "india" ? (
                        <>
                          <SelectItem value="delivery">Equity Delivery</SelectItem>
                          <SelectItem value="intraday">Equity Intraday</SelectItem>
                          <SelectItem value="futures">Futures</SelectItem>
                          <SelectItem value="options">Options</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="stocks">Stocks</SelectItem>
                          <SelectItem value="options">Options</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={calculateResults}
                disabled={selectedBrokers.length < 1}
              >
                Compare Brokers
              </Button>
              
              {showResults && calculatorType === "compare" && selectedBrokers.length > 0 && (
                <div className="mt-6 border rounded-lg p-4 overflow-x-auto">
                  <h3 className="text-lg font-medium mb-4">Broker Comparison</h3>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Broker</TableHead>
                        <TableHead className="text-right">Charges</TableHead>
                        <TableHead className="text-right">Net P&L</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {compareBrokers().map((result, index) => result && (
                        <TableRow key={index}>
                          <TableCell>{result.name}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(region === "india" ? result.totalCharges : result.totalCharges)}
                          </TableCell>
                          <TableCell className={`text-right ${
                            (region === "india" ? result.netPnl : result.netPnl) >= 0 
                              ? "text-green-600" 
                              : "text-red-600"
                          }`}>
                            {formatCurrency(region === "india" ? result.netPnl : result.netPnl)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Note: Actual charges may vary based on specific broker policies and special promotions.</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

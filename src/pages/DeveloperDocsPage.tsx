import { useState } from 'react';
import { Calculator, Code2, Zap, Copy, Check, ExternalLink, TrendingUp, Percent, DollarSign, Heart, Shuffle, CreditCard, Home, PiggyBank } from 'lucide-react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const API_BASE = 'https://ctquagiotugkgvbmwdhv.supabase.co/functions/v1';

interface ApiEndpoint {
  name: string;
  endpoint: string;
  method: string;
  description: string;
  icon: React.ReactNode;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    default?: string;
  }[];
  exampleRequest: object;
  exampleResponse: object;
}

const apis: ApiEndpoint[] = [
  {
    name: 'BMI Calculator',
    endpoint: '/api-bmi',
    method: 'POST',
    description: 'Calculate Body Mass Index with health category classification',
    icon: <Heart className="h-5 w-5" />,
    parameters: [
      { name: 'weight', type: 'number', required: true, description: 'Weight in kg (metric) or lbs (imperial)' },
      { name: 'height', type: 'number', required: true, description: 'Height in cm (metric) or inches (imperial)' },
      { name: 'unit', type: 'string', required: false, description: 'Unit system', default: 'metric' }
    ],
    exampleRequest: { weight: 70, height: 175, unit: 'metric' },
    exampleResponse: { bmi: 22.9, category: 'Normal weight', healthyRange: { min: 18.5, max: 24.9 } }
  },
  {
    name: 'Loan Calculator',
    endpoint: '/api-loan',
    method: 'POST',
    description: 'Calculate loan payments, total interest, and amortization',
    icon: <CreditCard className="h-5 w-5" />,
    parameters: [
      { name: 'principal', type: 'number', required: true, description: 'Loan amount' },
      { name: 'annualRate', type: 'number', required: true, description: 'Annual interest rate (%)' },
      { name: 'termMonths', type: 'number', required: true, description: 'Loan term in months' },
      { name: 'downPayment', type: 'number', required: false, description: 'Down payment amount', default: '0' }
    ],
    exampleRequest: { principal: 25000, annualRate: 6.5, termMonths: 60, downPayment: 5000 },
    exampleResponse: { loanAmount: 20000, monthlyPayment: 390.29, totalPayment: 23417.58, totalInterest: 3417.58, effectiveRate: 17.09 }
  },
  {
    name: 'Mortgage Calculator',
    endpoint: '/api-mortgage',
    method: 'POST',
    description: 'Calculate mortgage payments with down payment and interest breakdown',
    icon: <Home className="h-5 w-5" />,
    parameters: [
      { name: 'homePrice', type: 'number', required: true, description: 'Home purchase price' },
      { name: 'downPaymentPercent', type: 'number', required: false, description: 'Down payment percentage', default: '20' },
      { name: 'loanTermYears', type: 'number', required: true, description: 'Loan term in years' },
      { name: 'annualRate', type: 'number', required: true, description: 'Annual interest rate (%)' }
    ],
    exampleRequest: { homePrice: 350000, downPaymentPercent: 20, loanTermYears: 30, annualRate: 6.5 },
    exampleResponse: { homePrice: 350000, downPayment: 70000, loanAmount: 280000, monthlyPayment: 1770.09, totalPayment: 637232.4, totalInterest: 357232.4, loanToValue: 80 }
  },
  {
    name: 'Compound Interest',
    endpoint: '/api-compound-interest',
    method: 'POST',
    description: 'Calculate compound interest with monthly contributions',
    icon: <PiggyBank className="h-5 w-5" />,
    parameters: [
      { name: 'principal', type: 'number', required: true, description: 'Initial investment' },
      { name: 'annualRate', type: 'number', required: true, description: 'Annual interest rate (%)' },
      { name: 'years', type: 'number', required: true, description: 'Investment period in years' },
      { name: 'compoundingFrequency', type: 'number', required: false, description: 'Times compounded per year', default: '12' },
      { name: 'monthlyContribution', type: 'number', required: false, description: 'Monthly contribution', default: '0' }
    ],
    exampleRequest: { principal: 10000, annualRate: 7, years: 10, compoundingFrequency: 12, monthlyContribution: 500 },
    exampleResponse: { principal: 10000, annualRate: 7, years: 10, finalAmount: 106725.87, totalContributions: 70000, totalInterestEarned: 36725.87, effectiveAnnualRate: 7.23 }
  },
  {
    name: 'Random Number Generator',
    endpoint: '/api-random',
    method: 'POST',
    description: 'Generate random numbers with customizable range and count',
    icon: <Shuffle className="h-5 w-5" />,
    parameters: [
      { name: 'min', type: 'number', required: false, description: 'Minimum value', default: '1' },
      { name: 'max', type: 'number', required: false, description: 'Maximum value', default: '100' },
      { name: 'count', type: 'number', required: false, description: 'Number of values (1-1000)', default: '1' },
      { name: 'type', type: 'string', required: false, description: 'integer or float', default: 'integer' }
    ],
    exampleRequest: { min: 1, max: 100, count: 5, type: 'integer' },
    exampleResponse: { numbers: [42, 17, 89, 3, 56], min: 1, max: 100, count: 5, type: 'integer', sum: 207, average: 41.4 }
  },
  {
    name: 'Percentage Calculator',
    endpoint: '/api-percentage',
    method: 'POST',
    description: 'Perform various percentage calculations',
    icon: <Percent className="h-5 w-5" />,
    parameters: [
      { name: 'operation', type: 'string', required: true, description: 'percentOf, whatPercent, increase, decrease, difference' },
      { name: 'value1', type: 'number', required: true, description: 'First value' },
      { name: 'value2', type: 'number', required: true, description: 'Second value' }
    ],
    exampleRequest: { operation: 'percentOf', value1: 25, value2: 200 },
    exampleResponse: { operation: 'percentOf', description: '25% of 200', result: 50 }
  },
  {
    name: 'Tip Calculator',
    endpoint: '/api-tip',
    method: 'POST',
    description: 'Calculate tip amount with bill splitting',
    icon: <DollarSign className="h-5 w-5" />,
    parameters: [
      { name: 'billAmount', type: 'number', required: true, description: 'Total bill amount' },
      { name: 'tipPercent', type: 'number', required: false, description: 'Tip percentage', default: '15' },
      { name: 'splitCount', type: 'number', required: false, description: 'Number of people', default: '1' }
    ],
    exampleRequest: { billAmount: 85.50, tipPercent: 18, splitCount: 4 },
    exampleResponse: { billAmount: 85.5, tipPercent: 18, tipAmount: 15.39, totalAmount: 100.89, splitCount: 4, perPerson: 25.22, tipPerPerson: 3.85 }
  },
  {
    name: 'Discount Calculator',
    endpoint: '/api-discount',
    method: 'POST',
    description: 'Calculate discounted prices with optional tax',
    icon: <TrendingUp className="h-5 w-5" />,
    parameters: [
      { name: 'originalPrice', type: 'number', required: true, description: 'Original price' },
      { name: 'discountPercent', type: 'number', required: true, description: 'Discount percentage' },
      { name: 'taxPercent', type: 'number', required: false, description: 'Tax percentage', default: '0' }
    ],
    exampleRequest: { originalPrice: 199.99, discountPercent: 30, taxPercent: 8.5 },
    exampleResponse: { originalPrice: 199.99, discountPercent: 30, discountAmount: 60, discountedPrice: 139.99, taxPercent: 8.5, taxAmount: 11.9, finalPrice: 151.89, totalSavings: 60 }
  },
  {
    name: 'Basic Calculator',
    endpoint: '/api-calculator',
    method: 'POST',
    description: 'Evaluate mathematical expressions',
    icon: <Calculator className="h-5 w-5" />,
    parameters: [
      { name: 'expression', type: 'string', required: true, description: 'Mathematical expression (supports +, -, *, /, ^, sqrt, %)' }
    ],
    exampleRequest: { expression: '(100 + 50) * 2 / 3' },
    exampleResponse: { expression: '(100 + 50) * 2 / 3', result: 100 }
  }
];

const CodeBlock = ({ code, language = 'json' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

const ApiCard = ({ api }: { api: ApiEndpoint }) => {
  const curlExample = `curl -X POST "${API_BASE}${api.endpoint}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(api.exampleRequest)}'`;

  const jsExample = `fetch("${API_BASE}${api.endpoint}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(${JSON.stringify(api.exampleRequest, null, 2)})
})
.then(res => res.json())
.then(data => console.log(data));`;

  const pythonExample = `import requests

response = requests.post(
    "${API_BASE}${api.endpoint}",
    json=${JSON.stringify(api.exampleRequest, null, 4).replace(/null/g, 'None').replace(/true/g, 'True').replace(/false/g, 'False')}
)
print(response.json())`;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {api.icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {api.name}
              <Badge variant="secondary">{api.method}</Badge>
            </CardTitle>
            <CardDescription>{api.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Endpoint</h4>
            <code className="bg-muted px-3 py-2 rounded text-sm block">
              {API_BASE}{api.endpoint}
            </code>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Parameters</h4>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Required</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {api.parameters.map((param, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3 font-mono text-primary">{param.name}</td>
                      <td className="p-3">{param.type}</td>
                      <td className="p-3">
                        {param.required ? (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Optional</Badge>
                        )}
                      </td>
                      <td className="p-3">
                        {param.description}
                        {param.default && <span className="text-muted-foreground"> (default: {param.default})</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="curl" className="mt-4">
              <CodeBlock code={curlExample} language="bash" />
            </TabsContent>
            <TabsContent value="javascript" className="mt-4">
              <CodeBlock code={jsExample} language="javascript" />
            </TabsContent>
            <TabsContent value="python" className="mt-4">
              <CodeBlock code={pythonExample} language="python" />
            </TabsContent>
          </Tabs>

          <div>
            <h4 className="font-semibold mb-2">Example Response</h4>
            <CodeBlock code={JSON.stringify(api.exampleResponse, null, 2)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DeveloperDocsPage = () => {
  return (
    <CalculatorLayout
      title="Developer API Documentation"
      description="Integrate our powerful calculator APIs into your website or application. All endpoints are free to use with CORS enabled."
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Zap className="h-4 w-4" />
          <span className="font-medium">Free API Access</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Calculator APIs for Developers</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Integrate powerful calculator functionality into your website, app, or service. 
          Our RESTful APIs are free to use with CORS enabled for easy browser integration.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Try out the BMI Calculator API right now:</p>
          <CodeBlock 
            code={`curl -X POST "${API_BASE}/api-bmi" \\
  -H "Content-Type: application/json" \\
  -d '{"weight": 70, "height": 175}'`}
            language="bash"
          />
          <div className="mt-4 p-4 bg-background rounded-lg border">
            <p className="text-sm text-muted-foreground mb-2">Response:</p>
            <code className="text-sm">
              {`{"bmi": 22.9, "category": "Normal weight", "healthyRange": {"min": 18.5, "max": 24.9}}`}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🌐 CORS Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All APIs support cross-origin requests, making them perfect for browser-based applications.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">⚡ Fast & Reliable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Built on edge infrastructure for low latency responses globally.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 Usage Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Every API call is logged for analytics. Add an x-api-key header to track your usage.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API List */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ExternalLink className="h-6 w-6" />
        Available APIs
      </h2>

      <div className="space-y-6">
        {apis.map((api, idx) => (
          <ApiCard key={idx} api={api} />
        ))}
      </div>

      {/* Rate Limits */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Rate Limits & Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Rate Limiting</h4>
            <p className="text-muted-foreground">
              Currently, there are no strict rate limits. However, we ask that you be respectful and avoid excessive requests.
              If you need high-volume access, please contact us.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">API Key (Optional)</h4>
            <p className="text-muted-foreground">
              Add an <code className="bg-muted px-1 rounded">x-api-key</code> header to track your API usage separately.
              This helps you monitor your integration's performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Error Handling</h4>
            <p className="text-muted-foreground">
              All APIs return JSON responses. Errors include a <code className="bg-muted px-1 rounded">error</code> field 
              with a descriptive message. Always check for HTTP status codes (400 for bad requests, 500 for server errors).
            </p>
          </div>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default DeveloperDocsPage;

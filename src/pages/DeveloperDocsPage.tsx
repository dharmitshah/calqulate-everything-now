import { useState } from 'react';
import { Calculator, Code2, Zap, Copy, Check, ExternalLink, TrendingUp, Percent, DollarSign, Heart, Shuffle, CreditCard, Home, PiggyBank, Calendar, Flame, Ruler, Key, Brain, Sparkles, Rocket, ChevronRight, Terminal, Globe } from 'lucide-react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const API_BASE = 'https://ctquagiotugkgvbmwdhv.supabase.co/functions/v1';

interface ApiEndpoint {
  name: string;
  endpoint: string;
  method: string;
  description: string;
  icon: React.ReactNode;
  featured?: boolean;
  isAI?: boolean;
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
    name: 'AI Calculator',
    endpoint: '/api-ai-calculator',
    method: 'POST',
    description: 'Natural language calculator powered by AI. Ask any math question in plain English!',
    icon: <Brain className="h-5 w-5" />,
    featured: true,
    isAI: true,
    parameters: [
      { name: 'query', type: 'string', required: true, description: 'Your math question in natural language' }
    ],
    exampleRequest: { query: 'If I invest $5000 at 7% annual interest for 10 years, how much will I have?' },
    exampleResponse: { 
      query: 'If I invest $5000 at 7% annual interest for 10 years, how much will I have?',
      answer: '$9,835.76',
      steps: [
        'Using compound interest formula: A = P(1 + r)^t',
        'P = $5,000 (principal)',
        'r = 0.07 (7% annual rate)',
        't = 10 years',
        'A = 5000 × (1.07)^10 = $9,835.76'
      ],
      explanation: 'Your investment will nearly double in 10 years at 7% compound interest.',
      formula: 'A = P(1 + r)^t',
      poweredBy: 'AI'
    }
  },
  {
    name: 'Password Generator',
    endpoint: '/api-password',
    method: 'POST',
    description: 'Generate cryptographically secure passwords with customizable options',
    icon: <Key className="h-5 w-5" />,
    featured: true,
    parameters: [
      { name: 'length', type: 'number', required: false, description: 'Password length (4-128)', default: '16' },
      { name: 'includeUppercase', type: 'boolean', required: false, description: 'Include uppercase letters', default: 'true' },
      { name: 'includeLowercase', type: 'boolean', required: false, description: 'Include lowercase letters', default: 'true' },
      { name: 'includeNumbers', type: 'boolean', required: false, description: 'Include numbers', default: 'true' },
      { name: 'includeSymbols', type: 'boolean', required: false, description: 'Include special characters', default: 'true' },
      { name: 'excludeAmbiguous', type: 'boolean', required: false, description: 'Exclude ambiguous chars (l,1,I,O,0)', default: 'false' },
      { name: 'count', type: 'number', required: false, description: 'Number of passwords (1-100)', default: '1' }
    ],
    exampleRequest: { length: 20, includeSymbols: true, count: 3 },
    exampleResponse: { 
      passwords: ['X9#kL@mP2$vN8!qR4&wZ', 'aB3$fG7*hJ1!kL5#mN9@', 'pQ2^rS6&tU0*vW4#xY8!'],
      length: 20, 
      entropy: 131.09, 
      strength: 'Very Strong',
      characterSet: { uppercase: true, lowercase: true, numbers: true, symbols: true, excludeAmbiguous: false },
      charsetSize: 94
    }
  },
  {
    name: 'Age Calculator',
    endpoint: '/api-age',
    method: 'POST',
    description: 'Calculate exact age with zodiac sign, days until birthday, and more',
    icon: <Calendar className="h-5 w-5" />,
    parameters: [
      { name: 'birthDate', type: 'string', required: true, description: 'Birth date in YYYY-MM-DD format' },
      { name: 'targetDate', type: 'string', required: false, description: 'Target date (defaults to today)' }
    ],
    exampleRequest: { birthDate: '1990-05-15' },
    exampleResponse: { 
      age: { years: 35, months: 7, days: 29 },
      totalDays: 13018,
      totalWeeks: 1859,
      totalMonths: 427,
      totalHours: 312432,
      nextBirthday: '2026-05-15',
      daysUntilBirthday: 122,
      zodiacSign: 'Taurus',
      dayOfBirth: 'Tuesday'
    }
  },
  {
    name: 'Calorie Calculator',
    endpoint: '/api-calorie',
    method: 'POST',
    description: 'Calculate daily calorie needs with macro breakdown',
    icon: <Flame className="h-5 w-5" />,
    parameters: [
      { name: 'weight', type: 'number', required: true, description: 'Weight in kg' },
      { name: 'height', type: 'number', required: true, description: 'Height in cm' },
      { name: 'age', type: 'number', required: true, description: 'Age in years' },
      { name: 'gender', type: 'string', required: true, description: 'male or female' },
      { name: 'activityLevel', type: 'string', required: false, description: 'sedentary, light, moderate, active, veryActive', default: 'moderate' },
      { name: 'goal', type: 'string', required: false, description: 'maintain, lose, loseFast, gain, gainFast', default: 'maintain' }
    ],
    exampleRequest: { weight: 70, height: 175, age: 30, gender: 'male', activityLevel: 'moderate', goal: 'lose' },
    exampleResponse: { 
      bmr: 1680,
      tdee: 2604,
      targetCalories: 2104,
      goal: 'Lose ~0.5kg per week',
      macros: {
        protein: { grams: 158, calories: 632 },
        carbs: { grams: 210, calories: 840 },
        fat: { grams: 70, calories: 630 }
      },
      mealsBreakdown: { threeMeals: 701, fourMeals: 526, fiveMeals: 421 }
    }
  },
  {
    name: 'Unit Converter',
    endpoint: '/api-unit-convert',
    method: 'POST',
    description: 'Convert between units: length, weight, temperature, volume, area, speed, data',
    icon: <Ruler className="h-5 w-5" />,
    parameters: [
      { name: 'value', type: 'number', required: true, description: 'Value to convert' },
      { name: 'from', type: 'string', required: true, description: 'Source unit' },
      { name: 'to', type: 'string', required: true, description: 'Target unit' },
      { name: 'category', type: 'string', required: true, description: 'length, weight, temperature, volume, area, speed, data' }
    ],
    exampleRequest: { value: 100, from: 'mile', to: 'kilometer', category: 'length' },
    exampleResponse: { 
      input: { value: 100, unit: 'mile' },
      output: { value: 160.934, unit: 'kilometer' },
      category: 'length',
      formula: '100 mile × (0.001 / 0.000621371)'
    }
  },
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
    <Card className={`mb-8 ${api.isAI ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent' : ''}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${api.isAI ? 'bg-gradient-to-br from-primary to-primary/60 text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
            {api.icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2 flex-wrap">
              {api.name}
              <Badge variant="secondary">{api.method}</Badge>
              {api.isAI && <Badge className="bg-gradient-to-r from-primary to-primary/60">✨ AI Powered</Badge>}
              {api.featured && !api.isAI && <Badge variant="outline">Popular</Badge>}
            </CardTitle>
            <CardDescription>{api.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Endpoint</h4>
            <code className="bg-muted px-3 py-2 rounded text-sm block break-all">
              {API_BASE}{api.endpoint}
            </code>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Parameters</h4>
            <div className="border rounded-lg overflow-hidden overflow-x-auto">
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

const IntegrationGuide = () => {
  const htmlExample = `<!DOCTYPE html>
<html>
<head>
  <title>BMI Calculator Widget</title>
  <style>
    .calculator { max-width: 400px; margin: 20px auto; font-family: Arial; }
    input, button { padding: 10px; margin: 5px 0; width: 100%; }
    .result { background: #f0f0f0; padding: 15px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="calculator">
    <h2>BMI Calculator</h2>
    <input type="number" id="weight" placeholder="Weight (kg)">
    <input type="number" id="height" placeholder="Height (cm)">
    <button onclick="calculateBMI()">Calculate</button>
    <div id="result" class="result" style="display:none;"></div>
  </div>

  <script>
    async function calculateBMI() {
      const weight = document.getElementById('weight').value;
      const height = document.getElementById('height').value;
      
      const response = await fetch('${API_BASE}/api-bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight: Number(weight), height: Number(height) })
      });
      
      const data = await response.json();
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').innerHTML = 
        \`<strong>BMI: \${data.bmi}</strong><br>Category: \${data.category}\`;
    }
  </script>
</body>
</html>`;

  const reactExample = `import { useState } from 'react';

const API_BASE = '${API_BASE}';

export function AICalculator() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await fetch(\`\${API_BASE}/api-ai-calculator\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">AI Calculator</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask any math question..."
        className="w-full p-2 border rounded mb-2"
      />
      <button 
        onClick={calculate}
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">{result.answer}</h3>
          <p className="text-sm mt-2">{result.explanation}</p>
          {result.steps && (
            <ul className="mt-2 text-sm">
              {result.steps.map((step, i) => (
                <li key={i}>• {step}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}`;

  const wordpressExample = `<!-- Add this to your WordPress page or widget -->
<div id="loan-calculator">
  <h3>Loan Calculator</h3>
  <label>Loan Amount: <input type="number" id="lc-principal" value="25000"></label><br>
  <label>Interest Rate (%): <input type="number" id="lc-rate" value="6.5"></label><br>
  <label>Term (months): <input type="number" id="lc-term" value="60"></label><br>
  <button onclick="calcLoan()">Calculate</button>
  <div id="lc-result"></div>
</div>

<script>
async function calcLoan() {
  const res = await fetch('${API_BASE}/api-loan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      principal: Number(document.getElementById('lc-principal').value),
      annualRate: Number(document.getElementById('lc-rate').value),
      termMonths: Number(document.getElementById('lc-term').value)
    })
  });
  const data = await res.json();
  document.getElementById('lc-result').innerHTML = 
    '<p>Monthly Payment: $' + data.monthlyPayment.toFixed(2) + '</p>' +
    '<p>Total Interest: $' + data.totalInterest.toFixed(2) + '</p>';
}
</script>`;

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Easy Integration Guide
        </CardTitle>
        <CardDescription>
          Get started in minutes! Follow these simple steps to add calculators to your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Step by step */}
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Choose Your API</h4>
                <p className="text-muted-foreground">Pick from 14+ calculator APIs below. Each one is free and ready to use!</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Copy the Code</h4>
                <p className="text-muted-foreground">Use the examples below - just copy and paste into your website!</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Customize & Deploy</h4>
                <p className="text-muted-foreground">Style it to match your brand and you're done. No API key required!</p>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="html">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Plain HTML/JavaScript (Any Website)
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-muted-foreground">
                  Copy this complete example and save as an HTML file or paste into your website:
                </p>
                <CodeBlock code={htmlExample} language="html" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="react">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  React / Next.js Component
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-muted-foreground">
                  A ready-to-use React component with the AI Calculator:
                </p>
                <CodeBlock code={reactExample} language="typescript" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wordpress">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  WordPress / Wix / Squarespace
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-muted-foreground">
                  Add this HTML snippet to any Custom HTML block or widget:
                </p>
                <CodeBlock code={wordpressExample} language="html" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

const DeveloperDocsPage = () => {
  const featuredApis = apis.filter(a => a.featured || a.isAI);
  const otherApis = apis.filter(a => !a.featured && !a.isAI);

  return (
    <CalculatorLayout
      title="Developer API Documentation | Free Calculator APIs"
      description="Free calculator APIs with AI-powered natural language support. Add BMI, loan, mortgage, and 14+ calculators to your website in minutes. No API key required."
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">Now with AI-Powered Calculators!</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Calculator APIs for Developers</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Add powerful calculators to your website in minutes. 14+ APIs including our new 
          <strong className="text-primary"> AI Calculator</strong> that understands natural language!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Zap className="h-3 w-3 mr-1" /> No API Key Required
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Globe className="h-3 w-3 mr-1" /> CORS Enabled
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Rocket className="h-3 w-3 mr-1" /> Edge Infrastructure
          </Badge>
        </div>
      </div>

      {/* Integration Guide */}
      <IntegrationGuide />

      {/* Featured APIs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Featured APIs
        </h2>
        <div className="space-y-6">
          {featuredApis.map((api, idx) => (
            <ApiCard key={idx} api={api} />
          ))}
        </div>
      </div>

      {/* All APIs */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ExternalLink className="h-6 w-6" />
        All Calculator APIs
      </h2>

      <div className="space-y-6">
        {otherApis.map((api, idx) => (
          <ApiCard key={idx} api={api} />
        ))}
      </div>

      {/* Rate Limits & Info */}
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
              All APIs return JSON responses. Errors include an <code className="bg-muted px-1 rounded">error</code> field 
              with a descriptive message. Always check for HTTP status codes (400 for bad requests, 500 for server errors).
            </p>
          </div>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default DeveloperDocsPage;

import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UtensilsCrossed, 
  Car, 
  Scissors, 
  Hotel, 
  Coffee, 
  Truck,
  Globe,
  Users,
  Lightbulb,
  HelpCircle
} from "lucide-react";

// Comprehensive FAQ covering all tipping queries users search for
const faqItems = [
  {
    question: "How much should I tip at a restaurant?",
    answer: "In the US, standard restaurant tipping is 15-20% for good service. For excellent service, tip 20-25%. For average service, 15% is acceptable. At fine dining establishments, 20% or more is expected. Always check if gratuity is already included for large parties (usually 6+ people)."
  },
  {
    question: "Should I tip before or after tax?",
    answer: "Traditionally, tipping is calculated on the pre-tax amount (subtotal). However, many people tip on the post-tax total for simplicity - the difference is usually minimal. Our calculator lets you choose either option. For a $100 bill with $8 tax, tipping 20% pre-tax = $20, post-tax = $21.60."
  },
  {
    question: "How do I split a bill with tip between friends?",
    answer: "Enter your total bill amount, select your tip percentage, and enter the number of people. Our calculator shows the tip amount, total with tip, and each person's share - perfect for group dining. For uneven splits, calculate the total first, then divide based on what each person ordered."
  },
  {
    question: "How much should I tip for delivery or takeout?",
    answer: "For food delivery (DoorDash, UberEats, etc.), tip 15-20% or at least $3-5 for small orders. During bad weather or difficult deliveries, consider 20-25%. For takeout, tipping is optional but 10-15% is appreciated - remember someone still prepared and packaged your food."
  },
  {
    question: "How much do you tip Uber or Lyft drivers?",
    answer: "For rideshare services like Uber and Lyft, 15-20% is standard. For excellent service, help with luggage, or long rides, tip 20% or more. A minimum of $2-3 is common for short rides. You can tip in the app after your ride or in cash."
  },
  {
    question: "What's the standard tip for a taxi?",
    answer: "Taxi drivers typically receive 15-20% of the fare. Add extra for help with luggage ($1-2 per bag), waiting time, or difficult traffic conditions. In some cities, rounding up to the nearest dollar is also acceptable for short rides."
  },
  {
    question: "How much should I tip my hairdresser or barber?",
    answer: "For haircuts and salon services, tip 15-25% of the service cost. For your regular stylist, 20% is standard. If the salon owner cuts your hair, tipping is optional but appreciated. Tip each person who provides a service (shampoo, color, cut) individually."
  },
  {
    question: "Do you tip at coffee shops?",
    answer: "Tipping at coffee shops is optional but appreciated. For simple drip coffee, no tip is expected. For handcrafted drinks (lattes, specialty drinks), $1-2 or 10-15% is common. Many shops have tip jars - contributing helps baristas who often earn minimum wage."
  },
  {
    question: "How much do you tip hotel housekeeping?",
    answer: "Tip hotel housekeeping $2-5 per night, left daily (different staff may clean each day). For luxury hotels or if you've made extra mess, tip $5-10. Leave the tip on the pillow or desk with a note marked 'housekeeping' to ensure it reaches the right person."
  },
  {
    question: "What about tipping in other countries?",
    answer: "Tipping varies by country: US/Canada (15-20% standard), UK (10-15%, often included), Europe (5-10% for great service), Japan (not expected, can be offensive), Australia (not expected but appreciated). Always research local customs before traveling."
  },
  {
    question: "Is 20% tip mandatory?",
    answer: "Tipping is not legally mandatory in the US, but it's a strong social expectation. Restaurant servers often earn below minimum wage and rely on tips. While 15% was once standard, 18-20% is now the norm. Only reduce tips for genuinely poor service, not kitchen issues."
  },
  {
    question: "How do I calculate a 15% or 20% tip quickly in my head?",
    answer: "For 10%: move the decimal left one place ($50 → $5). For 15%: calculate 10% and add half ($5 + $2.50 = $7.50). For 20%: double 10% ($5 × 2 = $10). For 25%: calculate 20% + 5% ($10 + $2.50 = $12.50). Or just use our tip calculator!"
  }
];

// Step-by-step guide for SEO
const howToUse = [
  { step: 1, instruction: "Select your region/country for local tipping recommendations" },
  { step: 2, instruction: "Enter your bill amount (pre-tax subtotal)" },
  { step: 3, instruction: "Optionally enter tax to choose pre-tax or post-tax tipping" },
  { step: 4, instruction: "Rate service quality or select a service type for suggested tip %" },
  { step: 5, instruction: "Use quick buttons (10%, 15%, 18%, 20%, 25%) or slider for custom %" },
  { step: 6, instruction: "Choose rounding options for cash payments" },
  { step: 7, instruction: "Enter number of people to split the bill evenly" },
  { step: 8, instruction: "View tip amount, total, and per-person breakdown instantly" }
];

// Benefits for SEO content
const benefits = [
  "Calculate tips instantly with any percentage (0-35%)",
  "Smart service quality suggestions (Poor to Exceptional)",
  "Industry-specific presets (Restaurant, Uber, Salon, Hotel, Delivery)",
  "Country/region-aware tipping recommendations for 10+ countries",
  "Tax-aware calculation - tip on pre-tax or post-tax amount",
  "Split bills evenly between any number of people",
  "Cash-friendly rounding options (up, down, nearest dollar)",
  "Shows tip per person and total per person for groups",
  "Mobile-friendly design works on any device",
  "100% free with no signup required",
  "Accessible with keyboard navigation and screen readers"
];

// Related calculators for internal linking
const relatedCalculators = [
  { 
    title: "Discount Calculator", 
    path: "/calculator/discount", 
    description: "Calculate sale prices and savings on purchases." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate any percentage quickly and easily." 
  },
  { 
    title: "Currency Converter", 
    path: "/calculator/currency", 
    description: "Convert between currencies when traveling abroad." 
  },
  { 
    title: "Loan Calculator", 
    path: "/calculator/loan", 
    description: "Calculate monthly payments and interest rates." 
  },
  { 
    title: "Basic Calculator", 
    path: "/calculator/basic", 
    description: "Simple calculator for quick everyday math." 
  },
  { 
    title: "Savings Calculator", 
    path: "/calculator/savings", 
    description: "Plan your savings goals and track progress." 
  }
];

// Tipping guide data for rich content
const tippingGuides = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant Tipping",
    tip: "15-25%",
    description: "Standard 18-20% for good service. Check if gratuity is included for large parties. Fine dining typically warrants 20%+."
  },
  {
    icon: Car,
    title: "Uber, Lyft & Taxi",
    tip: "15-20%",
    description: "Tip in-app or cash. $2-3 minimum for short rides. Add extra for luggage help or difficult conditions."
  },
  {
    icon: Truck,
    title: "Food Delivery",
    tip: "15-20%",
    description: "At least $3-5 for small orders. 20%+ for bad weather or long distances. Tip directly to your driver."
  },
  {
    icon: Scissors,
    title: "Hair & Beauty",
    tip: "15-25%",
    description: "Tip each service provider separately. 20% is standard for your regular stylist."
  },
  {
    icon: Hotel,
    title: "Hotel Staff",
    tip: "$2-5/day",
    description: "Leave daily for housekeeping. $1-2 per bag for bellhops. Concierge: $5-20 for special requests."
  },
  {
    icon: Coffee,
    title: "Coffee & Bars",
    tip: "$1-2 or 15-20%",
    description: "$1-2 per drink at bars. Optional at coffee shops but appreciated for complex orders."
  }
];

const TipCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Tip Calculator | Calculate Tips & Split Bills | Tipping Guide"
      description="Free tip calculator with bill splitting. Calculate 15%, 18%, 20% tips or custom amounts. Includes tipping guides for restaurants, Uber, delivery, hotels & more. Works in all countries."
      keywords="tip calculator, tip calculator with split, how much to tip, calculate tip, bill splitter, restaurant tip calculator, tip calculator app, gratuity calculator, 20 percent tip, tip percentage calculator, split bill calculator, uber tip calculator, delivery tip calculator, how much to tip hairdresser, hotel tipping guide, tipping in usa, tipping in europe, should i tip before or after tax, tip calculator for groups"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      {/* Main Calculator */}
      <div className="flex justify-center mb-8">
        <TipCalculator />
      </div>

      {/* Tipping Guide Cards */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          Quick Tipping Guide by Service Type
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tippingGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {guide.title}
                    <span className="ml-auto text-sm font-normal bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {guide.tip}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{guide.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* International Tipping Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          Tipping Around the World
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Countries Where Tipping is Expected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span>🇺🇸 United States</span><span className="text-muted-foreground">15-25%</span></div>
              <div className="flex justify-between"><span>🇨🇦 Canada</span><span className="text-muted-foreground">15-20%</span></div>
              <div className="flex justify-between"><span>🇲🇽 Mexico</span><span className="text-muted-foreground">10-20%</span></div>
              <div className="flex justify-between"><span>🇬🇧 United Kingdom</span><span className="text-muted-foreground">10-15%</span></div>
              <div className="flex justify-between"><span>🇮🇳 India</span><span className="text-muted-foreground">5-15%</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Countries Where Tipping is Optional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span>🇯🇵 Japan</span><span className="text-muted-foreground">Not expected</span></div>
              <div className="flex justify-between"><span>🇨🇳 China</span><span className="text-muted-foreground">Not traditional</span></div>
              <div className="flex justify-between"><span>🇦🇺 Australia</span><span className="text-muted-foreground">0-10%</span></div>
              <div className="flex justify-between"><span>🇪🇺 Most of Europe</span><span className="text-muted-foreground">Round up</span></div>
              <div className="flex justify-between"><span>🇧🇷 Brazil</span><span className="text-muted-foreground">Often included</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Common Questions Quick Answers */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          Quick Answers to Common Tipping Questions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-4">
              <p className="font-medium mb-2">How much is a 20% tip on $50?</p>
              <p className="text-2xl font-bold text-primary">$10.00</p>
              <p className="text-xs text-muted-foreground">Total: $60.00</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="font-medium mb-2">How much is a 15% tip on $100?</p>
              <p className="text-2xl font-bold text-primary">$15.00</p>
              <p className="text-xs text-muted-foreground">Total: $115.00</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="font-medium mb-2">How much is an 18% tip on $75?</p>
              <p className="text-2xl font-bold text-primary">$13.50</p>
              <p className="text-xs text-muted-foreground">Total: $88.50</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Group Dining Tips */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Tips for Splitting Bills in Groups
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                <span><strong>Check for auto-gratuity:</strong> Many restaurants add 18-20% tip automatically for groups of 6 or more.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                <span><strong>Use our bill splitter:</strong> Enter the number of people to see each person's share including tip.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                <span><strong>Round up for simplicity:</strong> Use our rounding options to make cash payments easier.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                <span><strong>One person pays, others Venmo:</strong> Often easier than splitting the check at the restaurant.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default TipCalculatorPage;

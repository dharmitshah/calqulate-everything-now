
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const InfoFaqPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Information & FAQ" 
        description="Learn more about CalcVerse calculators, how they work, and get answers to frequently asked questions."
        keywords="calculator information, calculator FAQ, online calculators, BMI calculator, loan calculator" 
      />
      
      <Header />
      
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      
      <main id="main-content" className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">About CalcVerse</h1>
              <p className="text-muted-foreground text-lg">
                Information about our calculators, how we build them, and answers to common questions.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={1}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About Our Calculators</h2>
              <p className="mb-4">
                CalcVerse is a comprehensive collection of calculators designed to help you make informed decisions in various aspects of life. Whether you need to calculate your BMI, plan your finances, or solve a mathematical problem, we have a calculator for you.
              </p>
              <p className="mb-4">
                Our calculators are built with accuracy, speed, and user experience in mind. We prioritize:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Accuracy</strong> - We implement standard formulas and methodologies used by professionals.</li>
                <li><strong>Transparency</strong> - We explain how each calculator works and the formulas it uses.</li>
                <li><strong>Privacy</strong> - All calculations happen in your browser; we don't collect or store your data.</li>
                <li><strong>Accessibility</strong> - Our calculators are designed to work across all devices and for users of all abilities.</li>
              </ul>
            </section>
          </AnimatedSection>
          
          <AnimatedSection delay={2} direction="right">
            <section className="mb-12" id="faq">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="p-5 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-medium mb-2">Are your calculators free to use?</h3>
                  <p className="text-muted-foreground">
                    Yes, all calculators on CalcVerse are completely free to use with no hidden charges or subscription requirements.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-medium mb-2">How accurate are your calculators?</h3>
                  <p className="text-muted-foreground">
                    Our calculators are designed to provide high accuracy using standard formulas and methodologies. However, they should be used as informational tools rather than professional advice, especially for financial or health decisions.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-medium mb-2">Do you collect my data when I use the calculators?</h3>
                  <p className="text-muted-foreground">
                    No, all calculations occur directly in your browser. We don't collect, store, or have access to any data you enter into our calculators.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-medium mb-2">Can I use these calculators on my mobile phone?</h3>
                  <p className="text-muted-foreground">
                    Yes, all of our calculators are fully responsive and work well on mobile phones, tablets, and desktop computers.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-medium mb-2">What if I find a mistake in a calculation?</h3>
                  <p className="text-muted-foreground">
                    We strive for accuracy, but if you believe you've found an error, please contact us with details about the issue so we can investigate and fix it.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-medium mb-2">Can I suggest a new calculator?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! We're always looking to expand our collection. Please reach out through our contact form with your suggestion.
                  </p>
                </div>
              </div>
            </section>
          </AnimatedSection>
          
          <AnimatedSection delay={3} direction="left">
            <section className="mb-12" id="privacy">
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <p className="mb-4">
                At CalcVerse, we take your privacy seriously. Here's what you should know about how we handle your data:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Calculator Data</strong> - All calculation inputs are processed entirely in your browser. We never receive, store, or have access to the data you enter.</li>
                <li><strong>Analytics</strong> - We use anonymized analytics to understand how users interact with our site. This helps us improve the user experience but doesn't track individual users.</li>
                <li><strong>Cookies</strong> - We use minimal cookies necessary for the functioning of the site and user preferences like dark/light mode.</li>
                <li><strong>Third Parties</strong> - We don't share any user data with third parties for marketing or advertising purposes.</li>
              </ul>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  🔒 <strong>Security Note:</strong> This website uses SSL encryption to protect any data transmitted between your browser and our servers.
                </p>
              </div>
            </section>
          </AnimatedSection>
          
          <AnimatedSection delay={4}>
            <section className="mb-12" id="contact">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6">
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Get In Touch</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span>Email: <a href="mailto:contact@calcverse.com" className="text-blue-500 hover:underline">contact@calcverse.com</a></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Support: <a href="mailto:support@calcverse.com" className="text-blue-500 hover:underline">support@calcverse.com</a></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span>Address: 123 Calculator Lane, Digital City, DC 12345</span>
                  </li>
                </ul>
                
                <Separator className="my-6" />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="w-full sm:w-auto">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Email Us
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto" asChild>
                    <Link to="/support">
                      Support Center
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InfoFaqPage;

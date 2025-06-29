
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Quickulus, you accept and agree to be bound by the terms and 
              provision of this agreement. These Terms of Service apply to all visitors, users, 
              and others who access or use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
            <p className="mb-4">
              Quickulus provides a comprehensive suite of online calculators for various purposes 
              including financial, health, mathematical, and conversion calculations. Our calculators 
              are designed to provide accurate results based on the inputs provided.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the service only for lawful purposes</li>
              <li>Provide accurate information when using our calculators</li>
              <li>Not attempt to interfere with the proper functioning of the service</li>
              <li>Not use the service to transmit harmful or malicious content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accuracy Disclaimer</h2>
            <p className="mb-4">
              While we strive to provide accurate calculations, Quickulus makes no warranties about 
              the accuracy, reliability, completeness, or timeliness of the information, software, 
              text, graphics, and links provided by our calculators. All calculations should be 
              verified independently for critical decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              Quickulus shall not be liable for any direct, indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of or inability to use 
              the service, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              The service and its original content, features, and functionality are and will remain 
              the exclusive property of Quickulus and its licensors. The service is protected by 
              copyright, trademark, and other laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is 
              material, we will try to provide at least 30 days notice prior to any new terms 
              taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at 
              support@quickulus.com.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;

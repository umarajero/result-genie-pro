import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Award, 
  Shield,
  Headphones,
  Clock,
  FileText,
  Download,
  Smartphone,
  Globe,
  Database,
  Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  monthlyPrice: number;
  yearlyPrice: number;
  studentLimit: string;
  features: {
    name: string;
    included: boolean;
    icon: React.ReactNode;
  }[];
  popular?: boolean;
  enterprise?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small schools and individual teachers',
    icon: <Users className="w-6 h-6" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    studentLimit: 'Up to 50 students',
    features: [
      { name: 'Excel/CSV Import', included: true, icon: <FileText className="w-4 h-4" /> },
      { name: 'Basic Certificate Templates', included: true, icon: <Award className="w-4 h-4" /> },
      { name: 'PDF Downloads', included: true, icon: <Download className="w-4 h-4" /> },
      { name: 'Parent Portal Access', included: true, icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Email Support', included: true, icon: <Headphones className="w-4 h-4" /> },
      { name: 'Custom Branding', included: false, icon: <Palette className="w-4 h-4" /> },
      { name: 'SMS Notifications', included: false, icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Advanced Templates', included: false, icon: <Star className="w-4 h-4" /> },
      { name: 'Bulk Operations', included: false, icon: <Database className="w-4 h-4" /> },
      { name: 'Priority Support', included: false, icon: <Crown className="w-4 h-4" /> }
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for medium-sized schools and institutions',
    icon: <Award className="w-6 h-6" />,
    monthlyPrice: 500,
    yearlyPrice: 3000,
    studentLimit: 'Up to 500 students',
    popular: true,
    features: [
      { name: 'Excel/CSV Import', included: true, icon: <FileText className="w-4 h-4" /> },
      { name: 'Basic Certificate Templates', included: true, icon: <Award className="w-4 h-4" /> },
      { name: 'PDF Downloads', included: true, icon: <Download className="w-4 h-4" /> },
      { name: 'Parent Portal Access', included: true, icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Email Support', included: true, icon: <Headphones className="w-4 h-4" /> },
      { name: 'Custom Branding', included: true, icon: <Palette className="w-4 h-4" /> },
      { name: 'SMS Notifications', included: true, icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Advanced Templates', included: true, icon: <Star className="w-4 h-4" /> },
      { name: 'Bulk Operations', included: true, icon: <Database className="w-4 h-4" /> },
      { name: 'Priority Support', included: false, icon: <Crown className="w-4 h-4" /> }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large schools and educational districts',
    icon: <Crown className="w-6 h-6" />,
    monthlyPrice: 2500,
    yearlyPrice: 15000,
    studentLimit: 'Unlimited students',
    enterprise: true,
    features: [
      { name: 'Excel/CSV Import', included: true, icon: <FileText className="w-4 h-4" /> },
      { name: 'Basic Certificate Templates', included: true, icon: <Award className="w-4 h-4" /> },
      { name: 'PDF Downloads', included: true, icon: <Download className="w-4 h-4" /> },
      { name: 'Parent Portal Access', included: true, icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Email Support', included: true, icon: <Headphones className="w-4 h-4" /> },
      { name: 'Custom Branding', included: true, icon: <Palette className="w-4 h-4" /> },
      { name: 'SMS Notifications', included: true, icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Advanced Templates', included: true, icon: <Star className="w-4 h-4" /> },
      { name: 'Bulk Operations', included: true, icon: <Database className="w-4 h-4" /> },
      { name: 'Priority Support', included: true, icon: <Crown className="w-4 h-4" /> }
    ]
  }
];

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();

  const handleSelectPlan = (tier: PricingTier) => {
    if (tier.id === 'starter') {
      toast({
        title: "Free Plan Selected",
        description: "You can start using ResultGenie immediately with the free plan!",
      });
    } else {
      toast({
        title: "Plan Selection",
        description: `You've selected the ${tier.name} plan. Redirecting to checkout...`,
      });
    }
  };

  const handleContactSales = () => {
    toast({
      title: "Contact Sales",
      description: "Our sales team will reach out to discuss your enterprise needs.",
    });
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - yearly;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your institution. Start free and upgrade as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={`font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={`font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </Label>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save up to 50%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => {
            const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
            const savings = isYearly && tier.monthlyPrice > 0 ? calculateSavings(tier.monthlyPrice, tier.yearlyPrice) : null;
            
            return (
              <Card 
                key={tier.id}
                className={`relative transition-all duration-300 hover:shadow-academic ${
                  tier.popular 
                    ? 'border-primary shadow-academic scale-105 bg-primary/5' 
                    : tier.enterprise
                    ? 'border-secondary bg-secondary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                {tier.enterprise && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground px-4 py-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Enterprise
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    tier.popular 
                      ? 'bg-primary text-primary-foreground' 
                      : tier.enterprise
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {tier.icon}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {tier.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        ₦{price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    
                    {savings && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Save ₦{savings.savings.toLocaleString()}/year ({savings.percentage}% off)
                        </Badge>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground mt-3">
                      {tier.studentLimit}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          {feature.icon}
                          <span className={`text-sm ${
                            feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {feature.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    {tier.enterprise ? (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="lg"
                        onClick={handleContactSales}
                      >
                        Contact Sales
                      </Button>
                    ) : (
                      <Button 
                        variant={tier.popular ? "default" : "outline"}
                        className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        size="lg"
                        onClick={() => handleSelectPlan(tier)}
                      >
                        {tier.id === 'starter' ? 'Get Started Free' : 'Start Free Trial'}
                      </Button>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="text-center text-xs text-muted-foreground pt-2">
                    {tier.id === 'starter' ? (
                      'No credit card required'
                    ) : tier.enterprise ? (
                      'Custom pricing available'
                    ) : (
                      '14-day free trial • No setup fees'
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Secure & Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Bank-level security with GDPR compliance and data encryption
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Quick Setup</h3>
              <p className="text-sm text-muted-foreground">
                Get started in under 5 minutes with our intuitive interface
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Expert Support</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated support team with education technology expertise
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Can I upgrade or downgrade my plan?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, 
                  and downgrades take effect at the next billing cycle.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Is there a free trial for paid plans?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, all paid plans come with a 14-day free trial. No credit card required 
                  to start your trial.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  What happens to my data if I cancel?
                </h4>
                <p className="text-sm text-muted-foreground">
                  You can export all your data before canceling. We keep your data for 30 days 
                  after cancellation in case you want to reactivate.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer educational discounts?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer special pricing for educational institutions and non-profits. 
                  Contact our sales team for more information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="p-8 text-center">
              <Crown className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-2xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                For large educational districts, government institutions, or organizations with 
                specific requirements, we offer custom enterprise solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={handleContactSales}
                  className="gap-2"
                >
                  <Headphones className="w-5 h-5" />
                  Contact Sales
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => toast({
                    title: "Demo Scheduled",
                    description: "We'll reach out to schedule a personalized demo.",
                  })}
                >
                  <Globe className="w-5 h-5" />
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
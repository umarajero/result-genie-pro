import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { UploadSection } from "@/components/UploadSection";
import { ParentPortal } from "@/components/ParentPortal";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { StudentDataProvider } from "@/hooks/useStudentData";
import { TemplateProvider } from "@/hooks/useTemplateCustomization";
import { StatementProvider } from "@/hooks/useStatementCustomization";
import { ProjectsProvider } from "@/hooks/useProjects";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <StudentDataProvider>
      <ProjectsProvider>
        <TemplateProvider>
          <StatementProvider>
            <div className="min-h-screen">
              <Header />
              {/* School Logo Section */}
              <div className="bg-background py-8 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                  <img 
                    src="/src/assets/school-logo.png" 
                    alt="School Logo"
                    className="h-16 w-auto mx-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <main>
                <HeroSection />
                <section id="features">
                  <FeatureSection />
                </section>
                <section id="upload">
                  <UploadSection />
                </section>
                <section id="parent-portal">
                  <ParentPortal />
                </section>
                <section id="pricing">
                  <PricingSection />
                </section>
              </main>
              <Footer />
            </div>
          </StatementProvider>
        </TemplateProvider>
      </ProjectsProvider>
    </StudentDataProvider>
  );
};

export default Index;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { UploadSection } from "@/components/UploadSection";
import { ParentPortal } from "@/components/ParentPortal";
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
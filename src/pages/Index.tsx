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

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <StudentDataProvider>
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
    </StudentDataProvider>
  );
};

export default Index;
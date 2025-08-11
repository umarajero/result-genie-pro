import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { UploadSection } from "@/components/UploadSection";
import { Footer } from "@/components/Footer";
import { StudentDataProvider } from "@/hooks/useStudentData";

const Index = () => {
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
        </main>
        <Footer />
      </div>
    </StudentDataProvider>
  );
};

export default Index;
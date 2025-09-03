import React from "react";
import { LayoutTemplate, Menu, X} from "lucide-react";
import { landingPageStyles } from "../assets/dummystyle";

const landingPage = () => {
  const [mobileMenuOpen, setmobileMenuOpen] = React.useState(false);

  return (
    <div className={landingPageStyles.container}>
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>ResumeXpert</span>
          </div>
          {/* Mobile menu button */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setmobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={landingPageStyles.mobileMenuIcon} />
            ) : (
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
            )}
          </button>
          {/* desktop Navigation Menu */}
          <div className = ' hidden md:flex items-center'>
            {}
          </div>
        </div>
      </header>
    </div>
  );
};

export default landingPage;

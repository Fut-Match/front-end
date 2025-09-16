import { useState } from "react";
import { Layout } from "@/components/Layout";
import Login from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { Home } from "@/pages/Home";
import { Matches } from "@/pages/Matches";
import { Ranking } from "@/pages/Ranking";
import { Settings } from "@/pages/Settings";
import Achievements from "@/pages/Achievements";
import { CreateMatch } from "@/pages/CreateMatch";
import { MatchDetails } from "@/pages/MatchDetails";
import ManageMatch from "@/pages/ManageMatch";
import { EditProfile } from "@/pages/EditProfile";
import { LiveMatch } from "@/pages/LiveMatch";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentView, setCurrentView] = useState<{
    type: "main" | "createMatch" | "matchDetails" | "manageMatch" | "editProfile" | "liveMatch";
    data?: {
      matchId?: string;
    };
  }>({ type: "main" });

  if (!isAuthenticated) {
    if (showForgotPassword) {
      return (
        <ForgotPassword 
          onBackToLogin={() => setShowForgotPassword(false)} 
        />
      );
    }
    
    if (showRegister) {
      return <Register onNavigateToLogin={() => setShowRegister(false)} />;
    }
    
    return (
      <Login 
        onAuth={() => setIsAuthenticated(true)} 
        onNavigateToRegister={() => setShowRegister(true)}
        onNavigateToForgotPassword={() => setShowForgotPassword(true)}
      />
    );
  }

  const renderContent = () => {
    if (currentView.type === "createMatch") {
      return <CreateMatch onBack={() => setCurrentView({ type: "main" })} />;
    }
    
    if (currentView.type === "matchDetails") {
      return (
        <MatchDetails 
          matchId={currentView.data?.matchId || "1"} 
          onBack={() => setCurrentView({ type: "main" })} 
        />
      );
    }
    
    if (currentView.type === "manageMatch") {
      return (
        <ManageMatch 
          onBack={() => setCurrentView({ type: "main" })}
          onStartMatch={(matchId) => setCurrentView({ type: "liveMatch", data: { matchId } })}
        />
      );
    }

    if (currentView.type === "liveMatch") {
      return (
        <LiveMatch 
          matchId={currentView.data?.matchId || "1"}
          onBack={() => setCurrentView({ type: "main" })}
        />
      );
    }

    if (currentView.type === "editProfile") {
      return (
        <EditProfile 
          onBack={() => setCurrentView({ type: "main" })}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <Home 
            onCreateMatch={() => setCurrentView({ type: "createMatch" })}
            onMyMatches={() => setActiveTab("matches")}
          />
        );
      case "matches":
        return (
          <Matches 
            onCreateMatch={() => setCurrentView({ type: "createMatch" })}
            onViewMatch={(matchId) => setCurrentView({ type: "matchDetails", data: { matchId } })}
            onManageMatch={(matchId) => setCurrentView({ type: "manageMatch", data: { matchId } })}
          />
        );
      case "ranking":
        return <Ranking />;
      case "achievements":
        return <Achievements />;
      case "settings":
        return (
          <Settings 
            onEditProfile={() => setCurrentView({ type: "editProfile" })}
          />
        );
      default:
        return (
          <Home 
            onCreateMatch={() => setCurrentView({ type: "createMatch" })}
            onMyMatches={() => setActiveTab("matches")}
          />
        );
    }
  };

  const getLayoutProps = () => {
    if (currentView.type === "createMatch") {
      return {
        showBackButton: true,
        onBack: () => setCurrentView({ type: "main" }),
        headerTitle: "Criar Partida"
      };
    }
    
    if (currentView.type === "matchDetails") {
      return {
        showBackButton: true,
        onBack: () => setCurrentView({ type: "main" }),
        headerTitle: "Detalhes da Partida"
      };
    }
    
    if (currentView.type === "manageMatch") {
      return {
        showBackButton: true,
        onBack: () => setCurrentView({ type: "main" }),
        headerTitle: "Gerenciar Partida"
      };
    }

    if (currentView.type === "liveMatch") {
      return {
        showBackButton: true,
        onBack: () => setCurrentView({ type: "main" }),
        headerTitle: "Partida ao Vivo"
      };
    }
    
    if (currentView.type === "editProfile") {
      return {
        showBackButton: true,
        onBack: () => setCurrentView({ type: "main" }),
        headerTitle: "Editar Perfil"
      };
    }

    return {};
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("home");
    setCurrentView({ type: "main" });
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      onLogout={handleLogout}
      {...getLayoutProps()}
    >
      {renderContent()}
    </Layout>
  );
};

export default Index;
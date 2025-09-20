import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Home, Trophy, Users, Settings, Menu, ArrowLeft, User, Award, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
  headerTitle?: string;
  onLogout?: () => void;
}

export function Layout({ children, activeTab, onTabChange, showBackButton, onBack, headerTitle, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setSidebarOpen(false);
    onLogout?.();
  };

  const getPageTitle = () => {
    if (headerTitle) return headerTitle;
    
    switch (activeTab) {
      case "home": return "Home";
      case "matches": return "Partidas";
      case "ranking": return "Ranking";
      case "achievements": return "Conquistas";
      case "settings": return "Configurações";
      default: return "Home";
    }
  };

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "matches", label: "Partidas", icon: Users },
    { id: "ranking", label: "Ranking", icon: Trophy },
    { id: "achievements", label: "Conquistas", icon: Award },
    { id: "settings", label: "Configurações", icon: Settings },
    { id: "logout", label: "Sair", icon: LogOut },
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-sport text-primary-foreground p-4 shadow-glow">
        <div className="container max-w-md mx-auto">
          <div className="flex items-center gap-3">
            {showBackButton && onBack ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  {/* Header/Title/Description invisíveis para acessibilidade (requisito do Radix) */}
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Navegação do aplicativo</SheetDescription>
                  </SheetHeader>
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-foreground">João Silva</h2>
                        <p className="text-sm text-muted-foreground">@joaosilva</p>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="p-4">
                    <div className="space-y-2">
                      {navigationItems.map((item) => (
                        <Button
                          key={item.id}
                          variant={activeTab === item.id ? "secondary" : "ghost"}
                          className={`w-full justify-start gap-3 h-12 ${
                            item.id === "logout" 
                              ? "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950" 
                              : ""
                          }`}
                          onClick={() => {
                            if (item.id === "logout") {
                              handleLogout();
                            } else {
                              onTabChange(item.id);
                              setSidebarOpen(false);
                            }
                          }}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold">
                {getPageTitle()}
              </h1>
            </div>
            
            {/* Placeholder para equilibrar o layout */}
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="container max-w-md mx-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
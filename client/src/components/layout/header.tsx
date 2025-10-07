import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Education", href: "/education" },
    { name: "Period Tracker", href: "/period-tracker" },
    { name: "Health Assessment", href: "/health-assessment" },
    { name: "Resources", href: "/resources" },
    { name: "Analysis", href: "/yearly-analysis" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Arogya Sakhi</h1>
                <p className="text-xs text-gray-600">Women's Health Companion</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <button
                  className={`text-gray-700 hover:text-pink-600 transition-colors px-3 py-2 rounded-md ${
                    isActive(item.href)
                      ? "text-pink-600 bg-pink-50 font-medium"
                      : ""
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {/* User Menu (desktop) */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/yearly-analysis">
                    <DropdownMenuItem>
                      My Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button size="sm" className="hidden md:inline-flex">Login / Register</Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <User className="h-5 w-5 text-pink-600" />
                    <span className="font-medium text-gray-900 dark:text-white">{user ? user.username : "Guest"}</span>
                  </div>
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <button
                        onClick={() => setIsOpen(false)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.name}
                      </button>
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link href="/yearly-analysis">
                        <Button
                          size="sm"
                          onClick={() => setIsOpen(false)}
                          className="w-full"
                        >
                          My Dashboard
                        </Button>
                      </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                    </>
                  ) : (
                    <Link href="/auth">
                      <Button
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                      >
                        Login / Register
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Health Education", href: "/education" },
    { name: "Period Tracker", href: "/period-tracker" },
    { name: "Health Assessment", href: "/health-assessment" },
    { name: "Find Resources", href: "/resources" },
  ];

  const healthTopics = [
    { name: "PCOD & PCOS", href: "/education" },
    { name: "Breast Cancer", href: "/education" },
    { name: "Menstrual Health", href: "/education" },
    { name: "Mental Wellness", href: "/education" },
  ];

  const support = [
    { name: "FAQ", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Arogya Sakhi</h3>
                <p className="text-sm text-gray-400">Women's Health Companion</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering women through health education and self-management tools for a healthier tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Topics */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Health Topics</h4>
            <ul className="space-y-2">
              {healthTopics.map((topic) => (
                <li key={topic.name}>
                  <Link href={topic.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                      {topic.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Arogya Sakhi. All rights reserved. Built with ❤️ for women's health empowerment.</p>
        </div>
      </div>
    </footer>
  );
}

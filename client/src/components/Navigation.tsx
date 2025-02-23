import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Camera, Home, Lightbulb } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/scan", icon: Camera, label: "Scan" },
    { href: "/did-you-know", icon: Lightbulb, label: "Did You Know?" },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">NCAL</a>
          </Link>
          
          <div className="flex gap-4">
            {links.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href}>
                <Button
                  variant={location === href ? "default" : "ghost"}
                  className={cn(
                    "gap-2",
                    location === href && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

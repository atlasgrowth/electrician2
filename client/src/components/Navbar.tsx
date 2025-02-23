import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";

export function Navbar() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Button variant="link" className="font-bold text-xl text-primary p-0">
            {business?.basic_info.name || 'Loading...'}
          </Button>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/">
            <Button variant="ghost" className="text-sm font-medium">Home</Button>
          </Link>
          <Link href="/services">
            <Button variant="ghost" className="text-sm font-medium">Services</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-sm font-medium">Contact</Button>
          </Link>
          <Button size="sm" variant="default">
            <Phone className="mr-2 h-4 w-4" />
            {business?.basic_info.phone || 'Loading...'}
          </Button>
        </div>

        <Button className="md:hidden" variant="outline" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}

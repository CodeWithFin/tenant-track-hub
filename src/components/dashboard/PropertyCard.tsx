
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-40 w-full bg-cover bg-center" 
        style={{ 
          backgroundImage: property.imageUrl 
            ? `url(${property.imageUrl})` 
            : "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2970')" 
        }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Home className="h-3 w-3" />
            {property.units} units
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Building2 className="h-4 w-4 mr-1" />
          {property.type}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to={`/properties/${property.id}`} 
          className="text-sm text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

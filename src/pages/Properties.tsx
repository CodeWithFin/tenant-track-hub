
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import PropertyCard from "@/components/dashboard/PropertyCard";
import { properties } from "@/lib/data";
import { Property } from "@/types";
import PropertyFormDialog from "@/components/property/PropertyFormDialog";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [propertiesList, setPropertiesList] = useState<Property[]>(properties);
  
  const filteredProperties = propertiesList.filter(
    (property) => 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyAdded = (property: Property) => {
    setPropertiesList([...propertiesList, property]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage your properties and units.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
        
        {filteredProperties.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No properties found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add Property Dialog */}
      <PropertyFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onPropertyAdded={handlePropertyAdded}
      />
    </div>
  );
};

export default Properties;

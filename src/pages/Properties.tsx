
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2 } from "lucide-react";
import PropertyCard from "@/components/dashboard/PropertyCard";
import { properties, deleteProperty } from "@/lib/data";
import { Property } from "@/types";
import PropertyFormDialog from "@/components/property/PropertyFormDialog";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [propertiesList, setPropertiesList] = useState<Property[]>([...properties]);
  
  // Refresh properties list whenever it changes
  useEffect(() => {
    setPropertiesList([...properties]);
  }, [properties]);
  
  const filteredProperties = propertiesList.filter(
    (property) => 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyAdded = (property: Property) => {
    setPropertiesList((prev) => [...prev, property]);
  };

  const handlePropertyUpdated = (updatedProperty: Property) => {
    setPropertiesList((prev) => 
      prev.map(property => 
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
  };

  const handlePropertyDeleted = (propertyId: string) => {
    setPropertiesList((prev) => prev.filter(property => property.id !== propertyId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage your properties and units.</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="rounded-full shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          className="pl-9 rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredProperties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onDeleted={() => handlePropertyDeleted(property.id)} 
              onUpdated={handlePropertyUpdated}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-200 rounded-xl bg-gray-50">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          {searchQuery ? (
            <>
              <h3 className="text-lg font-medium mb-1">No properties found</h3>
              <p className="text-muted-foreground text-center mb-4">
                No properties match your search criteria "{searchQuery}"
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")} 
                className="rounded-full"
              >
                Clear Search
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-1">No properties yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add your first property to get started
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </>
          )}
        </div>
      )}

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

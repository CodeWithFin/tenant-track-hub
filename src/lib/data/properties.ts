
import { Property } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock Properties Data with Kenyan locations
export const properties: Property[] = [
  {
    id: "prop-001",
    name: "Kilimani Residences",
    address: "123 Ngong Road, Kilimani, Nairobi",
    type: "Apartment Building",
    units: 8,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2835&ixlib=rb-4.0.3",
  },
  {
    id: "prop-002",
    name: "Karen Gardens",
    address: "456 Marula Lane, Karen, Nairobi",
    type: "Townhouses",
    units: 4,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
  },
  {
    id: "prop-003",
    name: "Mombasa Coastal Complex",
    address: "789 Nyali Road, Nyali, Mombasa",
    type: "Commercial Building",
    units: 6,
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
  },
  {
    id: "prop-004",
    name: "Eldoret Skyline Homes",
    address: "101 Uganda Road, Eldoret, Uasin Gishu",
    type: "Single Family Homes",
    units: 3,
    imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const addProperty = (property: Omit<Property, 'id'>): Property => {
  const newProperty = { ...property, id: `prop-${uuidv4().substr(0, 8)}` };
  properties.push(newProperty);
  return newProperty;
};

export const updateProperty = (updatedProperty: Property): Property => {
  const index = properties.findIndex(p => p.id === updatedProperty.id);
  
  if (index !== -1) {
    properties[index] = updatedProperty;
    return updatedProperty;
  }
  
  throw new Error(`Property with ID ${updatedProperty.id} not found`);
};

export const deleteProperty = (id: string): boolean => {
  const initialLength = properties.length;
  const newPropertiesList = properties.filter(property => property.id !== id);
  
  // Update the properties array by reference (important for our mock data approach)
  properties.length = 0;
  properties.push(...newPropertiesList);
  
  return properties.length < initialLength;
};

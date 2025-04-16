
import { properties } from "./properties";
import { tenants } from "./tenants";

// Utility functions that combine data from multiple sources
export const getVacancyRate = (): number => {
  const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
  const occupiedUnits = tenants.filter(tenant => tenant.status === 'active').length;
  return totalUnits > 0 ? ((totalUnits - occupiedUnits) / totalUnits) * 100 : 0;
};

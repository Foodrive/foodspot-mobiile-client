export enum EventType {
  foodDrive = "FoodDrive",
}

export interface EventCreateData {
  // Basic details
  type: EventType;
  location?: string; // TODO extend this to be location type
  startDate?: string;
  endDate?: string;
  // Event description
  name?: string;
  description?: string;
  allergens?: string[]; // This is converted to food item
  // Planning details
  autoAccept?: boolean;
  maxCapacity?: number;
  // TODO extend to support number of volunteers
  // Contact details
  contactNumber?: string;
  email?: string;
  facebookPage?: string;
  // TODO extend to support facebook page
}

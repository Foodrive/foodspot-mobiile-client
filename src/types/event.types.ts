export enum EventType {
  foodDrive = "FOODDRIVE",
}

export interface EventCreateData {
  // Basic details
  type: EventType;
  location?: string;
  startDate?: string;
  endDate?: string;
  // Event description
  name?: string;
  description?: string;
  allergens?: string[]; // This is converted to food item
  // Planning details
  maxCapacity?: number;
  // TODO extend to support number of volunteers
  // Contact details
  contactNumber?: string;
  email?: string;
  // TODO extend to support facebook page
}

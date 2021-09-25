import { EventType } from "@app/types/event.types";

export interface UserInfo {
  username: string;
  id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  allergies: string[];
  password: string;
}

export interface Food {
  name: string;
  description?: string;
  servings: number;
  allergens: string[];
}

export interface Location {
  address: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface FoodDrive {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  type: EventType;
  location: Partial<Location>;
  email: string;
  contactNumber: string;
  food: Partial<Food>[];
  facebookPage: string;
  maxCapacity: number;
  autoAccept: boolean;
}

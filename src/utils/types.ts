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

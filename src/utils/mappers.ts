import { FoodDrive } from "@app/utils/types";
import { EventCreateData, EventType } from "@app/types/event.types";

export const convertFoodDriveToCreateData = (
  foodDrive: Partial<FoodDrive>,
): EventCreateData => ({
  // Basic details
  type: foodDrive.type || EventType.foodDrive,
  location: foodDrive.location?.address,
  startDate: foodDrive.startDate,
  endDate: foodDrive.endDate,
  // Event description
  name: foodDrive.name,
  description: foodDrive.description,
  allergens:
    foodDrive.food && foodDrive.food.length > 0
      ? foodDrive.food[0].allergens
      : undefined,
  // Planning details
  autoAccept: foodDrive.autoAccept,
  maxCapacity: foodDrive.maxCapacity,
  // Contact details
  contactNumber: foodDrive.contactNumber,
  email: foodDrive.email,
  facebookPage: foodDrive.facebookPage,
});

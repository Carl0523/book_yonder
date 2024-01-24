import { alternative, apartment, home, hotel } from "../assets";

const propertyType = [
  {
    type: "Apartment",
    icon: apartment,
    description: "Offers a more compact and communal living experience",
  },
  {
    type: "House",
    icon: home,
    description:
      "Suited for family or individual desiring a single-family living experience",
  },
  {
    type: "Hotel",
    icon: hotel,
    description:
      "Ideal for travelers seeking comfort, convenience, and hospitality",
  },
  {
    type: "Alternative Place",
    icon: alternative,
    description: "Appeals to adventurous individuals seeking to embrace nature",
  },
];

export { propertyType };

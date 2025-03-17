export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    suite: string;
    street: string;
    city: string;
    zipcode: number;
  }
}
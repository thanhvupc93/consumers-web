
export class AddressType {
  number: string;
  street: string;
  district: string;
  city: string;
  full: string;

  constructor(number: string, street: string, district: string, city: string) {
    this.number = number;
    this.street = street;
    this.district = district;
    this.city = city;
    this.full = `${number} ${street} ${district} ${city}`;
  }
}

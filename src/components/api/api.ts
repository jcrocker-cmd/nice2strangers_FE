export class ApiRoutes {
  private static readonly baseUrl = 'https://localhost:7095/api';

  static readonly createCheckout = `${this.baseUrl}/Payments/create-checkout`;
  static readonly getProducts = `${this.baseUrl}/Payments/products`;
}
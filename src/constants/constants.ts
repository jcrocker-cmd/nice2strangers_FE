export class ApiRoutes {
  static readonly baseUrlApi = "https://localhost:7095/api";
  static readonly baseUrl = "https://localhost:7095";

  static readonly Payments = {
    createCheckout: `${this.baseUrlApi}/Payments/create-checkout`,

    getTransactions: `${this.baseUrlApi}/Payments/transactions`,
    getProducts: `${this.baseUrlApi}/Payments/products`,
    getTransactionStats: `${this.baseUrlApi}/Payments/transactions/summary`,
    getStripeBalance: `${this.baseUrlApi}/Payments/balance`,

    postRefund: `${this.baseUrlApi}/Payments/refund`,
  };
}

export class CardBrands {
  static readonly VISA = "visa";
  static readonly MASTERCARD = "mastercard";
  static readonly AMEX = "amex";
  static readonly JCB = "jcb";
  static readonly DISCOVER = "discover";
  static readonly DINERS = "diners";
}

export class SWAL {
  static readonly ICON = {
    success: "success" as const,
    error: "error" as const,
    warning: "warning" as const,
  };

  // static readonly TITLE = {

  // }
}

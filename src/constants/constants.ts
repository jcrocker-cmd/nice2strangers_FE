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

  static readonly Product = {
    getProducts: `${this.baseUrlApi}/Product/products`,
    addProduct: `${this.baseUrlApi}/Product/addProduct`,
    updateProduct: `${this.baseUrlApi}/Product/updateProduct`,
    getProduct: `${this.baseUrlApi}/Product/updateProduct`,
    softDelete: `${this.baseUrlApi}/Product/softDeleteProduct`,
    recoverProduct: `${this.baseUrlApi}/Product/recoverProduct`,
    countActiveProducts: `${this.baseUrlApi}/Product/countActiveProducts`,
  };

  static readonly Newsletter = {
    postNewsletter: `${this.baseUrlApi}/Email/post-newsletter`,
    getNewsletter: `${this.baseUrlApi}/Email/get-newsletter`,
    sendNewsletter: `${this.baseUrlApi}/Email/sendNewsLetter`,
  };

  static readonly ContactUs = {
    postNewsletter: `${this.baseUrlApi}/Email/post-newsletter`,
    getContactUs: `${this.baseUrlApi}/Email/get-contact-us`,
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

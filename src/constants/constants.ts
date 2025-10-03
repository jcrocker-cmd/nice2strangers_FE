export class ApiRoutes {
  static readonly baseUrlApi = "https://api.nice2strangers.org/api";
  static readonly baseUrl = "https://api.nice2strangers.org/";

  //static readonly baseUrlApi = "https://localhost:7095/api";
  //static readonly baseUrl = "https://localhost:7095";

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
    postNewsletter: `${this.baseUrlApi}/Newsletter/post-newsletter`,
    getNewsletter: `${this.baseUrlApi}/Newsletter/get-newsletter`,
    sendNewsletter: `${this.baseUrlApi}/Newsletter/sendNewsLetter`,
  };

  static readonly ContactUs = {
    postContact: `${this.baseUrlApi}/Inquiry/post-contact-us`,
    getContactUs: `${this.baseUrlApi}/Inquiry/get-contact-us`,
    sendReply: `${this.baseUrlApi}/Inquiry/send-reply`,
  };

    static readonly Auth = {
    SignUp: `${this.baseUrlApi}/Auth/register`,
    login: `${this.baseUrlApi}/Auth/login`,
    forgotPassword: `${this.baseUrlApi}/Auth/forgot-password`,
    resetPassword: `${this.baseUrlApi}/Auth/reset-password`,
    googleLogin: `${this.baseUrlApi}/Auth/google-login`,
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
}
export class Roles {
  static readonly ADMIN = "Admin";
  static readonly USER = "User";
}

export class Google {
  static readonly clientId = "1013492537917-9f6aste276raiebf39vm5vmv61o16765.apps.googleusercontent.com";
}



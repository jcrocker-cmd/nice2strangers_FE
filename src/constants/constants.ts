export class ApiRoutes {
  private static readonly baseUrl = 'https://localhost:7095/api';

    static readonly Payments = {
      createCheckout : `${this.baseUrl}/Payments/create-checkout`,

      getTransactions : `${this.baseUrl}/Payments/transactions`,
      getProducts : `${this.baseUrl}/Payments/products`,
      getTransactionStats: `${this.baseUrl}/Payments/transactions/summary`,

      postRefund : `${this.baseUrl}/Payments/refund`

    }
}

export class CardBrands {
  static readonly VISA = 'visa';
  static readonly MASTERCARD = 'mastercard';
  static readonly AMEX = 'amex';
  static readonly JCB = 'jcb';
  static readonly DISCOVER = 'discover';
  static readonly DINERS = 'diners';
}

export class SWAL {
  static readonly ICON = {
    success : 'success' as const,
    error : 'error' as const,
    warning : 'warning' as const,
  }

  // static readonly TITLE = {

  // }
}
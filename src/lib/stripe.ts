// src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  'pk_test_51Ri8gRFaZmRsvFDw8PzY9qFEEq5zvPU25GBiZ5vuQPGk1Lzm8SRZO6RIgmykcu5rGK2WyYdWHLq9UbHVdhFpLa8300Jau49AvB'
);

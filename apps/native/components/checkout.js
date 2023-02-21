// https://stripe.com/docs/payments/payment-links/api
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const paymentLink = await stripe.paymentLinks.create({
  line_items: [
    {
      price: 'price_1HKiSf2eZvKYlo2CxjF9qwbr',
      quantity: 1,
    },
  ],
});

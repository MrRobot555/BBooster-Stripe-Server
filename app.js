import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe"

import pkg from 'apollo-client';
const { ApolloClient } = pkg;
import { fetch } from 'cross-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { 
  UPDATE_STRIPE_ID,
  EXTEND_USER,
  ADD_LIST
} from './queries.js'


/* import gql from 'graphql-tag';
const ApolloClient = require('apollo-boost').ApolloClient;
const fetch = require('cross-fetch/polyfill').fetch;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache; */

const client = new ApolloClient({
    link: createHttpLink({
        uri: "https://bbooster.herokuapp.com/",
        fetch: fetch
    }),
    cache: new InMemoryCache()
});


function timeConverter(timeStamp){
  let a = new Date(timeStamp * 1000);
  let year = a.getFullYear();
  let month = ("0" + (a.getMonth() + 1)).slice(-2);
  let date = a.getDate();
  let time = year + '-' + month + '-' + date;
  return time;
}

function updateStripeId(setStripeIdObj) {
  client.mutate({
      mutation: UPDATE_STRIPE_ID,
      variables: {
          userID: setStripeIdObj.userID,
          stripeID: setStripeIdObj.stripeID,
          jokerToken : process.env.JOKER_TOKEN
      },
  })
  .then(data => {
  
  })
  .catch(err => {
      console.log('ERROR: ', err);
  });
}


function extendUser(userData) {
  userData['jokerToken'] = process.env.JOKER_TOKEN;
  client.mutate({
      mutation: EXTEND_USER,
      variables: userData,
  })
  .then(data => {
    return true;
  })
  .catch(err => {
      console.log('ERROR: ', err);
      return false;
  });
}

function addList(listData) {
  listData['jokerToken'] = process.env.JOKER_TOKEN;
  client.mutate({
      mutation: ADD_LIST,
      variables: listData,
  })
  .then(data => {
    return true;
  })
  .catch(err => {
      /* console.log('ERROR: ', err); */
      return false;
  });
}


async function stripeDeleteTaxNumber(stripeID) {
  const taxIds = await stripe.customers.listTaxIds(
    stripeID,
  );
  taxIds.data.forEach( (element)=> {
    stripe.customers.deleteTaxId(
      stripeID,
      element.id
    ); 
  });
}

const app = express();
app.use(cors());
dotenv.config();

/* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
/* const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; */
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE;

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;
  console.log('request body: ', request.body);

  try {
        event = stripe.webhooks.constructEvent(
        request.body, 
        sig, 
        endpointSecret
    );
  } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
  }

  // Handle the event
  switch (event.type) {
    case 'account.updated':
      const account_updated = event.data.object;
      console.log('account_updated: ');
      // Then define and call a function to handle the event account.updated
      break;
    case 'account.external_account.created':
      const account_external_account_created = event.data.object;
      console.log('account_external_account_created: ');
      // Then define and call a function to handle the event account.external_account.created
      break;
    case 'account.external_account.deleted':
      const account_external_account_deleted = event.data.object;
      console.log('account_external_account_deleted: ');
      // Then define and call a function to handle the event account.external_account.deleted
      break;
    case 'account.external_account.updated':
      const account_external_account_updated = event.data.object;
      console.log('account_external_account_updated: ');
      // Then define and call a function to handle the event account.external_account.updated
      break;
    case 'balance.available':
      const balance_available = event.data.object;
      console.log('balance_available: ');
      // Then define and call a function to handle the event balance.available
      break;
    case 'billing_portal.configuration.created':
      const billing_portal_configuration_created = event.data.object;
      console.log('billing_portal_configuration_created: ');
      // Then define and call a function to handle the event billing_portal.configuration.created
      break;
    case 'billing_portal.configuration.updated':
      const billing_portal_configuration_updated = event.data.object;
      console.log('billing_portal_configuration_updated: ');
      // Then define and call a function to handle the event billing_portal.configuration.updated
      break;
    case 'capability.updated':
      const capability_updated = event.data.object;
      console.log('capability_updated: ');
      // Then define and call a function to handle the event capability.updated
      break;
    case 'charge.captured':
      const charge_captured = event.data.object;
      console.log('charge_captured: ');
      // Then define and call a function to handle the event charge.captured
      break;
    case 'charge.expired':
      const charge_expired = event.data.object;
      console.log('charge_expired: ');
      // Then define and call a function to handle the event charge.expired
      break;
    case 'charge.failed':
      const charge_failed = event.data.object;
      console.log('charge_failed: ');
      // Then define and call a function to handle the event charge.failed
      break;
    case 'charge.pending':
      const charge_pending = event.data.object;
      console.log('charge_pending: ');
      // Then define and call a function to handle the event charge.pending
      break;
    case 'charge.refunded':
      const charge_refunded = event.data.object;
      console.log('charge_refunded: ');
      // Then define and call a function to handle the event charge.refunded
      break;
    case 'charge.succeeded':
      const charge_succeeded = event.data.object;
      console.log('charge_succeeded: ');
      // Then define and call a function to handle the event charge.succeeded
      break;
    case 'charge.updated':
      const charge_updated = event.data.object;
      console.log('charge_updated: ');
      // Then define and call a function to handle the event charge.updated
      break;
    case 'charge.dispute.closed':
      const charge_dispute_closed = event.data.object;
      console.log('charge_dispute_closed: ');
      // Then define and call a function to handle the event charge.dispute.closed
      break;
    case 'charge.dispute.created':
      const charge_dispute_created = event.data.object;
      console.log('charge_dispute_created: ');
      // Then define and call a function to handle the event charge.dispute.created
      break;
    case 'charge.dispute.funds_reinstated':
      const charge_dispute_funds_reinstated = event.data.object;
      console.log('charge_dispute_funds_reinstated: ');
      // Then define and call a function to handle the event charge.dispute.funds_reinstated
      break;
    case 'charge.dispute.funds_withdrawn':
      const charge_dispute_funds_withdrawn = event.data.object;
      console.log('charge_dispute_funds_withdrawn: ');
      // Then define and call a function to handle the event charge.dispute.funds_withdrawn
      break;
    case 'charge.dispute.updated':
      const charge_dispute_updated = event.data.object;
      console.log('charge_dispute_updated: ');
      // Then define and call a function to handle the event charge.dispute.updated
      break;
    case 'charge.refund.updated':
      const charge_refund_updated = event.data.object;
      console.log('charge_refund_updated: ');
      // Then define and call a function to handle the event charge.refund.updated
      break;
    case 'checkout.session.async_payment_failed':
      const checkout_session_async_payment_failed = event.data.object;
      console.log('checkout_session_async_payment_failed: ');
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkout_session_async_payment_succeeded = event.data.object;
      console.log('checkout_session_async_payment_succeeded: ');
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkout_session_completed = event.data.object;
      console.log('checkout_session_completed: ');
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkout_session_expired = event.data.object;
      console.log('checkout_session_expired: ');
      // Then define and call a function to handle the event checkout.session.expired
      break;
    case 'coupon.created':
      const coupon_created = event.data.object;
      console.log('coupon_created: ');
      // Then define and call a function to handle the event coupon.created
      break;
    case 'coupon.deleted':
      const coupon_deleted = event.data.object;
      console.log('coupon_deleted: ');
      // Then define and call a function to handle the event coupon.deleted
      break;
    case 'coupon.updated':
      const coupon_updated = event.data.object;
      console.log('coupon_updated: ');
      // Then define and call a function to handle the event coupon.updated
      break;
    case 'credit_note.created':
      const credit_note_created = event.data.object;
      console.log('credit_note_created: ');
      // Then define and call a function to handle the event credit_note.created
      break;
    case 'credit_note.updated':
      const credit_note_updated = event.data.object;
      console.log('credit_note_updated: ');
      // Then define and call a function to handle the event credit_note.updated
      break;
    case 'credit_note.voided':
      const credit_note_voided = event.data.object;
      console.log('credit_note_voided: ');
      // Then define and call a function to handle the event credit_note.voided
      break;
    case 'customer.created':
      const customer_created = event.data.object;
      console.log('customer_created: ');
      // Then define and call a function to handle the event customer.created
      break;
    case 'customer.deleted':
      const customer_deleted = event.data.object;
      console.log('customer_deleted: ');
      // Then define and call a function to handle the event customer.deleted
      break;
    case 'customer.updated':
      const customer_updated = event.data.object;
      console.log('customer_updated: ');
      // Then define and call a function to handle the event customer.updated
      break;
    case 'customer.discount.created':
      const customer_discount_created = event.data.object;
      console.log('customer_discount_created: ');
      // Then define and call a function to handle the event customer.discount.created
      break;
    case 'customer.discount.deleted':
      const customer_discount_deleted = event.data.object;
      console.log('customer_discount_deleted: ');
      // Then define and call a function to handle the event customer.discount.deleted
      break;
    case 'customer.discount.updated':
      const customer_discount_updated = event.data.object;
      console.log('customer_discount_updated: ');
      // Then define and call a function to handle the event customer.discount.updated
      break;
    case 'customer.source.created':
      const customer_source_created = event.data.object;
      console.log('customer_source_created: ');
      // Then define and call a function to handle the event customer.source.created
      break;
    case 'customer.source.deleted':
      const customer_source_deleted = event.data.object;
      console.log('customer_source_deleted: ');
      // Then define and call a function to handle the event customer.source.deleted
      break;
    case 'customer.source.expiring':
      const customer_source_expiring = event.data.object;
      console.log('customer_source_expiring: ');
      // Then define and call a function to handle the event customer.source.expiring
      break;
    case 'customer.source.updated':
      const customer_source_updated = event.data.object;
      console.log('customer_source_updated: ');
      // Then define and call a function to handle the event customer.source.updated
      break;
    case 'customer.subscription.created':
      const customer_subscription_created = event.data.object;
      console.log('customer_subscription_created: ');
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.deleted':
      const customer_subscription_deleted = event.data.object;
      console.log('customer_subscription_deleted: ');
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case 'customer.subscription.pending_update_applied':
      const customer_subscription_pending_update_applied = event.data.object;
      console.log('customer_subscription_pending_update_applied: ');
      // Then define and call a function to handle the event customer.subscription.pending_update_applied
      break;
    case 'customer.subscription.pending_update_expired':
      const customer_subscription_pending_update_expired = event.data.object;
      console.log('customer_subscription_pending_update_expired: ');
      // Then define and call a function to handle the event customer.subscription.pending_update_expired
      break;
    case 'customer.subscription.trial_will_end':
      const customer_subscription_trial_will_end = event.data.object;
      console.log('customer_subscription_trial_will_end: ');
      // Then define and call a function to handle the event customer.subscription.trial_will_end
      break;
    case 'customer.subscription.updated':
      const customer_subscription_updated = event.data.object;
      console.log('customer_subscription_updated: ');
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case 'customer.tax_id.created':
      const customer_tax_id_created = event.data.object;
      console.log('customer_tax_id_created: ');
      // Then define and call a function to handle the event customer.tax_id.created
      break;
    case 'customer.tax_id.deleted':
      const customer_tax_id_deleted = event.data.object;
      console.log('customer_tax_id_deleted: ');
      // Then define and call a function to handle the event customer.tax_id.deleted
      break;
    case 'customer.tax_id.updated':
      const customer_tax_id_updated = event.data.object;
      console.log('customer_tax_id.updated: ');
      // Then define and call a function to handle the event customer.tax_id.updated
      break;
    case 'file.created':
      const file_created = event.data.object;
      console.log('file_created: ');
      // Then define and call a function to handle the event file.created
      break;
    case 'identity.verification_session.canceled':
      const identity_verification_session_canceled = event.data.object;
      console.log('identity_verification_session_canceled: ');
      // Then define and call a function to handle the event identity.verification_session.canceled
      break;
    case 'identity.verification_session.created':
      const identity_verification_session_created = event.data.object;
      console.log('identity_verification_session_created: ');
      // Then define and call a function to handle the event identity.verification_session.created
      break;
    case 'identity.verification_session.processing':
      const identity_verification_session_processing = event.data.object;
      console.log('identity_verification_session_processing: ');
      // Then define and call a function to handle the event identity.verification_session.processing
      break;
    case 'identity.verification_session.redacted':
      const identity_verification_session_redacted = event.data.object;
      console.log('identity_verification_session_redacted: ');
      // Then define and call a function to handle the event identity.verification_session.redacted
      break;
    case 'identity.verification_session.requires_input':
      const identity_verification_session_requires_input = event.data.object;
      console.log('identity_verification_session_requires_input: ');
      // Then define and call a function to handle the event identity.verification_session.requires_input
      break;
    case 'identity.verification_session.verified':
      const identity_verification_session_verified = event.data.object;
      console.log('identity_verification_session_verified: ');
      // Then define and call a function to handle the event identity.verification_session.verified
      break;
    case 'invoice.created':
      const invoice_created = event.data.object;
      console.log('invoice_created: ');

      // Then define and call a function to handle the event invoice.created
      break;
    case 'invoice.deleted':
      const invoice_deleted = event.data.object;
      console.log('invoice_deleted: ');
      // Then define and call a function to handle the event invoice.deleted
      break;
    case 'invoice.finalization_failed':
      const invoice_finalization_failed = event.data.object;
      console.log('invoice_finalization_failed: ');
      // Then define and call a function to handle the event invoice.finalization_failed
      break;
    case 'invoice.finalized':
      const invoice_finalized = event.data.object;
      console.log('invoice_finalized: ');
      // Then define and call a function to handle the event invoice.finalized
      break;
    case 'invoice.marked_uncollectible':
      const invoice_marked_uncollectible = event.data.object;
      console.log('invoice_marked_uncollectible: ');
      // Then define and call a function to handle the event invoice.marked_uncollectible
      break;
    case 'invoice.paid':
      const invoice_paid = event.data.object;
      console.log('invoice_paid: ');
      // Then define and call a function to handle the event invoice.paid
      break;
    case 'invoice.payment_action_required':
      const invoice_payment_action_required = event.data.object;
      console.log('invoice_payment_action_required: ');
      // Then define and call a function to handle the event invoice.payment_action_required
      break;
    case 'invoice.payment_failed':
      const invoice_payment_failed = event.data.object;
      console.log('invoice_payment_failed: ');
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    case 'invoice.payment_succeeded':
      const invoice_payment_succeeded = event.data.object;

      console.log('invoice_payment_succeeded: ', invoice_payment_succeeded);
      /* console.log('invoice_payment_succeeded: ', invoice_payment_succeeded); */

      // Then define and call a function to handle the event invoice.payment_succeeded
         const invoiceData =
        {
          data: {
            language: "en",
            order: invoice_payment_succeeded.id,
            addr_bus_name: invoice_payment_succeeded.customer_name,
            addr_bus_streetnr: invoice_payment_succeeded.customer_address.line1,
            addr_bus_city: invoice_payment_succeeded.customer_address.city,
            addr_bus_zip: invoice_payment_succeeded.customer_address.postal_code,
            addr_bus_state: invoice_payment_succeeded.customer_address.country,
            description: 'online marketing service',
            date: timeConverter(invoice_payment_succeeded.created),
            vat_state: 'SK',
            date_payment_term: timeConverter(invoice_payment_succeeded.created),
            payment_type: 'karta',
            currency: 'EUR',
            additional_text: 'PAID',
            items:
              {
                  "0" : 
                {
                  itemdescription : invoice_payment_succeeded.lines.data[0].description,
                  amount: 1,
                  price: Number(invoice_payment_succeeded.lines.data[0].price.unit_amount) / 100,
                  vat_rate: invoice_payment_succeeded.lines.data[0].tax_rates[0].percentage
                }
              }
          }
        };

        if (invoice_payment_succeeded.customer_tax_exempt === 'exempt') {
          invoiceData.data['accounting_type'] = 'serviceEU';
          invoiceData.data['addr_vat_nr'] = invoice_payment_succeeded.customer_tax_ids[0].value;
          invoiceData.data.items['0']['price_type'] = 'b';
        } else {
          invoiceData.data['accounting_type'] = 'serviceSK';
          invoiceData.data.items['0']['price_type'] = 's';
        }

        try {
          const response = await fetch("https://s4.mufis.sk/app/prg.php?code=invoice&id=1&idf=2050&h=3db5b5d0bb87aa2af890&test=1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(invoiceData)
          });
          const res = await response.json()
          console.log('invoice answer: ', res)
        } catch (error) {
          console.log('error creating invoice: ', error)
        }

        const stripeCustomer = await stripe.customers.retrieve(
          invoice_payment_succeeded.customer
        );

/*         const subscriptionOfInvoice = await stripe.subscriptions.retrieve(
          invoice_payment_succeeded.subscription
        );

        console.log('subscriptionOfInvoice: ', subscriptionOfInvoice); */

        const listDataSend = {
          userID : stripeCustomer.metadata._id,
/*           order_quantity : subscriptionOfInvoice.metadata.entry_number,
          network_id : subscriptionOfInvoice.metadata.net_id, */
          order_quantity: "20",
          network_id: "0",
          invoice_url : invoice_payment_succeeded.hosted_invoice_url,
        };

        /* console.log('listDataSend: ', listDataSend); */

        addList(listDataSend);
        
      break;
    case 'invoice.sent':
      const invoice_sent = event.data.object;
      console.log('invoice_sent: ');
      // Then define and call a function to handle the event invoice.sent
      break;
    case 'invoice.upcoming':
      const invoice_upcoming = event.data.object;
      console.log('invoice_upcoming: ');
      // Then define and call a function to handle the event invoice.upcoming
      break;
    case 'invoice.updated':
      const invoice_updated = event.data.object;
      console.log('invoice_updated: ');
      // Then define and call a function to handle the event invoice.updated
      break;
    case 'invoice.voided':
      const invoice_voided = event.data.object;
      console.log('invoice_voided: ');
      // Then define and call a function to handle the event invoice.voided
      break;
    case 'invoiceitem.created':
      const invoiceitem_created = event.data.object;
      console.log('invoiceitem_created: ');
      // Then define and call a function to handle the event invoiceitem.created
      break;
    case 'invoiceitem.deleted':
      const invoiceitem_deleted = event.data.object;
      console.log('invoiceitem_deleted: ');
      // Then define and call a function to handle the event invoiceitem.deleted
      break;
    case 'invoiceitem.updated':
      const invoiceitem_updated = event.data.object;
      console.log('invoiceitem_updated: ');
      // Then define and call a function to handle the event invoiceitem.updated
      break;
    case 'issuing_authorization.created':
      const issuing_authorization_created = event.data.object;
      console.log('issuing_authorization_created: ');
      // Then define and call a function to handle the event issuing_authorization.created
      break;
    case 'issuing_authorization.request':
      const issuing_authorization_request = event.data.object;
      console.log('issuing_authorization_request: ');
      // Then define and call a function to handle the event issuing_authorization.request
      break;
    case 'issuing_authorization.updated':
      const issuing_authorization_updated = event.data.object;
      console.log('issuing_authorization_updated: ');
      // Then define and call a function to handle the event issuing_authorization.updated
      break;
    case 'issuing_card.created':
      const issuing_card_created = event.data.object;
      console.log('issuing_card_created: ');
      // Then define and call a function to handle the event issuing_card.created
      break;
    case 'issuing_card.updated':
      const issuing_card_updated = event.data.object;
      console.log('issuing_card_updated: ');
      // Then define and call a function to handle the event issuing_card.updated
      break;
    case 'issuing_cardholder.created':
      const issuing_cardholder_created = event.data.object;
      console.log('issuing_cardholder_created: ');
      // Then define and call a function to handle the event issuing_cardholder.created
      break;
    case 'issuing_cardholder.updated':
      const issuing_cardholder_updated = event.data.object;
      console.log('issuing_cardholder_updated: ');
      // Then define and call a function to handle the event issuing_cardholder.updated
      break;
    case 'issuing_dispute.closed':
      const issuing_dispute_closed = event.data.object;
      console.log('issuing_dispute_closed: ');
      // Then define and call a function to handle the event issuing_dispute.closed
      break;
    case 'issuing_dispute.created':
      const issuing_dispute_created = event.data.object;
      console.log('issuing_dispute_created: ');
      // Then define and call a function to handle the event issuing_dispute.created
      break;
    case 'issuing_dispute.funds_reinstated':
      const issuing_dispute_funds_reinstated = event.data.object;
      console.log('issuing_dispute_funds_reinstated: ');
      // Then define and call a function to handle the event issuing_dispute.funds_reinstated
      break;
    case 'issuing_dispute.submitted':
      const issuing_dispute_submitted = event.data.object;
      console.log('issuing_dispute_submitted: ');
      // Then define and call a function to handle the event issuing_dispute.submitted
      break;
    case 'issuing_dispute.updated':
      const issuing_dispute_updated = event.data.object;
      console.log('issuing_dispute_updated: ');
      // Then define and call a function to handle the event issuing_dispute.updated
      break;
    case 'issuing_transaction.created':
      const issuing_transaction_created = event.data.object;
      console.log('issuing_transaction_created: ');
      // Then define and call a function to handle the event issuing_transaction.created
      break;
    case 'issuing_transaction.updated':
      const issuing_transaction_updated = event.data.object;
      console.log('issuing_transaction_updated: ');
      // Then define and call a function to handle the event issuing_transaction.updated
      break;
    case 'mandate.updated':
      const mandate_updated = event.data.object;
      console.log('mandate_updated: ');
      // Then define and call a function to handle the event mandate.updated
      break;
    case 'order.created':
      const order_created = event.data.object;
      console.log('order_created: ');
      // Then define and call a function to handle the event order.created
      break;
    case 'order.payment_failed':
      const order_payment_failed = event.data.object;
      console.log('order_payment_failed: ');
      // Then define and call a function to handle the event order.payment_failed
      break;
    case 'order.payment_succeeded':
      const order_payment_succeeded = event.data.object;
      console.log('order_payment_succeeded: ');
      // Then define and call a function to handle the event order.payment_succeeded
      break;
    case 'order.updated':
      const order_updated = event.data.object;
      console.log('order_updated: ');
      // Then define and call a function to handle the event order.updated
      break;
    case 'order_return.created':
      const order_return_created = event.data.object;
      console.log('order_return_created: ');
      // Then define and call a function to handle the event order_return.created
      break;
    case 'payment_intent.amount_capturable_updated':
      const payment_intent_amount_capturable_updated = event.data.object;
      console.log('payment_intent_amount_capturable_updated: ');
      // Then define and call a function to handle the event payment_intent.amount_capturable_updated
      break;
    case 'payment_intent.canceled':
      const payment_intent_canceled = event.data.object;
      console.log('payment_intent_canceled: ');
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case 'payment_intent.created':
      const payment_intent_created = event.data.object;
      console.log('payment_intent_created: ');
      // Then define and call a function to handle the event payment_intent.created
      break;
    case 'payment_intent.payment_failed':
      const payment_intent_payment_failed = event.data.object;
      console.log('payment_intent_payment_failed: ');
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case 'payment_intent.processing':
      const payment_intent_processing = event.data.object;
      console.log('payment_intent_processing: ');
      // Then define and call a function to handle the event payment_intent.processing
      break;
    case 'payment_intent.requires_action':
      const payment_intent_requires_action = event.data.object;
      console.log('payment_intent_requires_action: ');
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case 'payment_intent.succeeded':
      const payment_intent_succeeded = event.data.object;
      console.log('payment_intent_succeeded: ');
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case 'payment_method.attached':
      const payment_method_attached = event.data.object;
      console.log('payment_method_attached: ');
      // Then define and call a function to handle the event payment_method.attached
      break;
    case 'payment_method.automatically_updated':
      const payment_method_automatically_updated = event.data.object;
      console.log('payment_method_automatically_updated: ');
      // Then define and call a function to handle the event payment_method.automatically_updated
      break;
    case 'payment_method.detached':
      const payment_method_detached = event.data.object;
      console.log('payment_method_detached: ');
      // Then define and call a function to handle the event payment_method.detached
      break;
    case 'payment_method.updated':
      const payment_method_updated = event.data.object;
      console.log('payment_method_updated: ');
      // Then define and call a function to handle the event payment_method.updated
      break;
    case 'payout.canceled':
      const payout_canceled = event.data.object;
      console.log('payout_canceled: ');
      // Then define and call a function to handle the event payout.canceled
      break;
    case 'payout.created':
      const payout_created = event.data.object;
      console.log('payout_created: ');
      // Then define and call a function to handle the event payout.created
      break;
    case 'payout.failed':
      const payout_failed = event.data.object;
      console.log('payout_failed: ');
      // Then define and call a function to handle the event payout.failed
      break;
    case 'payout.paid':
      const payout_paid = event.data.object;
      console.log('payout_paid: ');
      // Then define and call a function to handle the event payout.paid
      break;
    case 'payout.updated':
      const payout_updated = event.data.object;
      console.log('payout_updated: ');
      // Then define and call a function to handle the event payout.updated
      break;
    case 'person.created':
      const person_created = event.data.object;
      console.log('person_created: ');
      // Then define and call a function to handle the event person.created
      break;
    case 'person.deleted':
      const person_deleted = event.data.object;
      console.log('person_deleted: ');
      // Then define and call a function to handle the event person.deleted
      break;
    case 'person.updated':
      const person_updated = event.data.object;
      console.log('person_updated: ');
      // Then define and call a function to handle the event person.updated
      break;
    case 'plan.created':
      const plan_created = event.data.object;
      console.log('plan_created: ');
      // Then define and call a function to handle the event plan.created
      break;
    case 'plan.deleted':
      const plan_deleted = event.data.object;
      console.log('plan_deleted: ');
      // Then define and call a function to handle the event plan.deleted
      break;
    case 'plan.updated':
      const plan_updated = event.data.object;
      console.log('plan_updated: ');
      // Then define and call a function to handle the event plan.updated
      break;
    case 'price.created':
      const price_created = event.data.object;
      console.log('price_created: ');
      // Then define and call a function to handle the event price.created
      break;
    case 'price.deleted':
      const price_deleted = event.data.object;
      console.log('price_deleted: ');
      // Then define and call a function to handle the event price.deleted
      break;
    case 'price.updated':
      const price_updated = event.data.object;
      console.log('price_updated: ');
      // Then define and call a function to handle the event price.updated
      break;
    case 'product.created':
      const product_created = event.data.object;
      console.log('product_created: ');
      // Then define and call a function to handle the event product.created
      break;
    case 'product.deleted':
      const product_deleted = event.data.object;
      console.log('product_deleted: ');
      // Then define and call a function to handle the event product.deleted
      break;
    case 'product.updated':
      const product_updated = event.data.object;
      console.log('product_updated: ');
      // Then define and call a function to handle the event product.updated
      break;
    case 'promotion_code.created':
      const promotion_code_created = event.data.object;
      console.log('promotion_code_created: ');
      // Then define and call a function to handle the event promotion_code.created
      break;
    case 'promotion_code.updated':
      const promotion_code_updated = event.data.object;
      console.log('promotion_code_updated: ');
      // Then define and call a function to handle the event promotion_code.updated
      break;
    case 'quote.accepted':
      const quote_accepted = event.data.object;
      console.log('quote_accepted: ');
      // Then define and call a function to handle the event quote.accepted
      break;
    case 'quote.canceled':
      const quote_canceled = event.data.object;
      console.log('quote_canceled: ');
      // Then define and call a function to handle the event quote.canceled
      break;
    case 'quote.created':
      const quote_created = event.data.object;
      console.log('quote_created: ');
      // Then define and call a function to handle the event quote.created
      break;
    case 'quote.finalized':
      const quote_finalized = event.data.object;
      console.log('quote_finalize: ');
      // Then define and call a function to handle the event quote.finalized
      break;
    case 'radar.early_fraud_warning.created':
      const radar_early_fraud_warning_created = event.data.object;
      console.log('radar_early_fraud_warning_created: ');
      // Then define and call a function to handle the event radar.early_fraud_warning.created
      break;
    case 'radar.early_fraud_warning.updated':
      const radar_early_fraud_warning_updated = event.data.object;
      console.log('radar_early_fraud_warning_updated: ');
      // Then define and call a function to handle the event radar.early_fraud_warning.updated
      break;
    case 'recipient.created':
      const recipient_created = event.data.object;
      console.log('recipient_created: ');
      // Then define and call a function to handle the event recipient.created
      break;
    case 'recipient.deleted':
      const recipient_deleted = event.data.object;
      console.log('recipient_deleted: ');
      // Then define and call a function to handle the event recipient.deleted
      break;
    case 'recipient.updated':
      const recipient_updated = event.data.object;
      console.log('recipient_updated: ');
      // Then define and call a function to handle the event recipient.updated
      break;
    case 'reporting.report_run.failed':
      const reporting_report_run_failed = event.data.object;
      console.log('reporting_report_run_failed: ');
      // Then define and call a function to handle the event reporting.report_run.failed
      break;
    case 'reporting.report_run.succeeded':
      const reporting_report_run_succeeded = event.data.object;
      console.log('reporting_report_run_succeeded: ');
      // Then define and call a function to handle the event reporting.report_run.succeeded
      break;
    case 'reporting.report_type.updated':
      const reporting_report_type_updated = event.data.object;
      console.log('reporting_report_type_updated: ');
      // Then define and call a function to handle the event reporting.report_type.updated
      break;
    case 'review.closed':
      const review_closed = event.data.object;
      console.log('review_closed: ');
      // Then define and call a function to handle the event review.closed
      break;
    case 'review.opened':
      const review_opened = event.data.object;
      console.log('review_opened: ');
      // Then define and call a function to handle the event review.opened
      break;
    case 'setup_intent.canceled':
      const setup_intent_canceled = event.data.object;
      console.log('setup_intent_canceled: ');
      // Then define and call a function to handle the event setup_intent.canceled
      break;
    case 'setup_intent.created':
      const setup_intent_created = event.data.object;
      console.log('setup_intent_created: ');
      // Then define and call a function to handle the event setup_intent.created
      break;
    case 'setup_intent.requires_action':
      const setup_intent_requires_action = event.data.object;
      console.log('setup_intent_requires_action: ');
      // Then define and call a function to handle the event setup_intent.requires_action
      break;
    case 'setup_intent.setup_failed':
      const setup_intent_setup_failed = event.data.object;
      console.log('setup_intent_setup_failed: ');
      // Then define and call a function to handle the event setup_intent.setup_failed
      break;
    case 'setup_intent.succeeded':
      const setup_intent_succeeded = event.data.object;
      console.log('setup_intent_succeeded: ');
      // Then define and call a function to handle the event setup_intent.succeeded
      break;
    case 'sigma.scheduled_query_run.created':
      const sigma_scheduled_query_run_created = event.data.object;
      console.log('sigma_scheduled_query_run_created: ');
      // Then define and call a function to handle the event sigma.scheduled_query_run.created
      break;
    case 'sku.created':
      const sku_created = event.data.object;
      console.log('sku_created: ');
      // Then define and call a function to handle the event sku.created
      break;
    case 'sku.deleted':
      const sku_deleted = event.data.object;
      console.log('sku_deleted: ');
      // Then define and call a function to handle the event sku.deleted
      break;
    case 'sku.updated':
      const sku_updated = event.data.object;
      console.log('sku_updated: ');
      // Then define and call a function to handle the event sku.updated
      break;
    case 'source.canceled':
      const source_canceled = event.data.object;
      console.log('source_canceled: ');
      // Then define and call a function to handle the event source.canceled
      break;
    case 'source.chargeable':
      const source_chargeable = event.data.object;
      console.log('source_chargeable: ');
      // Then define and call a function to handle the event source.chargeable
      break;
    case 'source.failed':
      const source_failed = event.data.object;
      console.log('source_failed: ');
      // Then define and call a function to handle the event source.failed
      break;
    case 'source.mandate_notification':
      const source_mandate_notification = event.data.object;
      console.log('source_mandate_notification: ');
      // Then define and call a function to handle the event source.mandate_notification
      break;
    case 'source.refund_attributes_required':
      const source_refund_attributes_required = event.data.object;
      console.log('source_refund_attributes_required: ');
      // Then define and call a function to handle the event source.refund_attributes_required
      break;
    case 'source.transaction.created':
      const source_transaction_created = event.data.object;
      console.log('source_transaction_created: ');
      // Then define and call a function to handle the event source.transaction.created
      break;
    case 'source.transaction.updated':
      const source_transaction_updated = event.data.object;
      console.log('source_transaction_updated: ');
      // Then define and call a function to handle the event source.transaction.updated
      break;
    case 'subscription_schedule.aborted':
      const subscription_schedule_aborted = event.data.object;
      console.log('subscription_schedule_aborted: ');
      // Then define and call a function to handle the event subscription_schedule.aborted
      break;
    case 'subscription_schedule.canceled':
      const subscription_schedule_canceled = event.data.object;
      console.log('subscription_schedule_canceled: ');
      // Then define and call a function to handle the event subscription_schedule.canceled
      break;
    case 'subscription_schedule.completed':
      const subscription_schedule_completed = event.data.object;
      console.log('subscription_schedule_completed: ');
      // Then define and call a function to handle the event subscription_schedule.completed
      break;
    case 'subscription_schedule.created':
      const subscription_schedule_created = event.data.object;
      console.log('subscription_schedule_created: ');
      // Then define and call a function to handle the event subscription_schedule.created
      break;
    case 'subscription_schedule.expiring':
      const subscription_schedule_expiring = event.data.object;
      console.log('subscription_schedule_expiring: ');
      // Then define and call a function to handle the event subscription_schedule.expiring
      break;
    case 'subscription_schedule.released':
      const subscription_schedule_released = event.data.object;
      console.log('subscription_schedule_released: ');
      // Then define and call a function to handle the event subscription_schedule.released
      break;
    case 'subscription_schedule.updated':
      const subscription_schedule_updated = event.data.object;
      console.log('subscription_schedule_updated: ');
      // Then define and call a function to handle the event subscription_schedule.updated
      break;
    case 'tax_rate.created':
      const tax_rate_created = event.data.object;
      console.log('tax_rate_created: ');
      // Then define and call a function to handle the event tax_rate.created
      break;
    case 'tax_rate.updated':
      const tax_rate_updated = event.data.object;
      console.log('tax_rate_updated: ');
      // Then define and call a function to handle the event tax_rate.updated
      break;
    case 'topup.canceled':
      const topup_canceled = event.data.object;
      console.log('topup_canceled: ');
      // Then define and call a function to handle the event topup.canceled
      break;
    case 'topup.created':
      const topup_created = event.data.object;
      console.log('topup_created: ');
      // Then define and call a function to handle the event topup.created
      break;
    case 'topup.failed':
      const topup_failed = event.data.object;
      console.log('topup_failed: ');
      // Then define and call a function to handle the event topup.failed
      break;
    case 'topup.reversed':
      const topup_reversed = event.data.object;
      console.log('topup_reversed: ');
      // Then define and call a function to handle the event topup.reversed
      break;
    case 'topup.succeeded':
      const topup_succeeded = event.data.object;
      console.log('topup_succeeded: ');
      // Then define and call a function to handle the event topup.succeeded
      break;
    case 'transfer.created':
      const transfer_created = event.data.object;
      console.log('transfer_created: ');
      // Then define and call a function to handle the event transfer.created
      break;
    case 'transfer.failed':
      const transfer_failed = event.data.object;
      console.log('transfer_failed: ');
      // Then define and call a function to handle the event transfer.failed
      break;
    case 'transfer.paid':
      const transfer_paid = event.data.object;
      console.log('transfer_paid: ');
      // Then define and call a function to handle the event transfer.paid
      break;
    case 'transfer.reversed':
      const transfer_reversed = event.data.object;
      console.log('transfer_reversed: ');
      // Then define and call a function to handle the event transfer.reversed
      break;
    case 'transfer.updated':
      const transfer_updated = event.data.object;
      console.log('transfer_updated: ');
      // Then define and call a function to handle the event transfer.updated
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("Stripe server running!");
});


app.use(express.json());

app.post("/createorupdatecustomer", async (request, response) => {
  const {data} = request.body;
/*   response.send(); - not yet*/

  let addressData = null;
  let isTaxExempt = null;
  let isTaxIdTrue = false;
  let taxFreeCustomer = null;
  let name = null;

  if (data.is_company) {
    name = data.company_name;
    addressData = {
      country: data.company_country,
      city: data.company_city,
      line1: data.company_street + ' ' + data.company_housenumber,
      postal_code: data.company_ZIP
    }
  } else {
    name = data.first_name + ' ' + data.last_name,
    addressData = {
      country: data.user_country,
      city: data.user_city,
      line1: data.user_street + ' ' + data.user_housenumber,
      postal_code: data.user_ZIP
    }
  }

const customerDetails = {
    name : name,
    email: data.email,
    address: addressData,
    metadata: {
      _id : data._id,
    }
}

  try {
    let customer = null;
    let customerWithTax = null;
    let isNewCustomer = null;

    if (data.stripe_id && data.stripe_id !== "") {
      isNewCustomer = false;
      customer = await stripe.customers.update(
        data.stripe_id,
        customerDetails
      );


    } else {
      isNewCustomer = true;
      customer = await stripe.customers.create(customerDetails);
      data["stripe_id"] = customer.id;
    }

    customerWithTax = await stripe.customers.retrieve(
      customer.id, {
        expand: ['tax_ids'],
    });

    // if customer is corporate, check tax number
    if (data.tax_number && data.is_company) {
        stripe.customers.createTaxId(
          customer.id,
          {
            type: 'eu_vat',
            value: data.tax_number,
          },
          function(error, taxId) {
            console.log('taxId: ', taxId);
            console.log('taxId error: ', error);
            if (error) {
              stripe.customers.update(
                customer.id,
                {
                  tax_exempt: "none",
                }
              );
              stripeDeleteTaxNumber(customer.id);
              data['tax_number'] = "";
              console.log('deleting tax number from data and stripe.');
            }
            if (taxId) {
              isTaxIdTrue = true;
               stripe.customers.update(
                customer.id,
                {
                  tax_exempt: "exempt",
                }
              );
            }
              response.send({
              newStripeCustomerCreated: isNewCustomer,
              taxNumberResponse: isTaxIdTrue
            });
            const isUserUpdated = extendUser(data);
          }
        );
    } else {
      //clear private person's tax exempt status EU VAT number if neccessary

      console.log('customerWithTax.tax_ids.total_count: ', customerWithTax.tax_ids.total_count);
      if (customerWithTax.tax_ids.total_count > 0) {
        customerWithTax.tax_ids.data.forEach( oneTaxEntry => {
          stripe.customers.deleteTaxId(
            customerWithTax.id,
            oneTaxEntry.id
          );
        });

        stripe.customers.update(
          customerWithTax.id,
          {
            tax_exempt: "none",
          }
        );
      }

      response.send({
        newStripeCustomerCreated: isNewCustomer,
        taxNumberResponse: 'no operation'
      });
      const isUserUpdated = extendUser(data);
    }
    // tax number entry process ends

  } catch (error) {
/*     console.error("error: ", error); */
    response.status(400).send(error);
  }
});


app.post("/createsession", async (request, response) => {
  const {data} = await request.body;

  const session = await stripe.checkout.sessions.create({
    success_url : 'https://app.bbooster.net/#/neworder',
    cancel_url : 'https://app.bbooster.net/#/neworder',
    mode : 'subscription',
    line_items: [
      {
        price: data.price,
        quantity: data.amount,
        /* dynamic_tax_rates: ['txr_1K7jFwBC6X0caFm9J4rWo8bO', 'txr_1K7jFEBC6X0caFm9SaIXinnN', 'txr_1K7h96BC6X0caFm9EViEot83'] */
        dynamic_tax_rates: ['txr_1KFbpnBC6X0caFm9QCQzDxE1', 'txr_1KFbpcBC6X0caFm9RVDRMKct', 'txr_1KFbpRBC6X0caFm9a1lt5eVW']
      },
    ],
    customer: data.customer_id,
    metadata: data.metadata
  });

  response.send({id: session.id});
});

app.post("/setsubscriptionrenew", async (request, response) => {
  const {data} = request.body;
  const newState = await stripe.subscriptions.update(data.subscription_id, {cancel_at_period_end: data.newState});
  response.send(newState);
});

app.get('/retrievesession', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id, {
    expand: ['line_items']
  });
  res.json(session);
});


app.get('/retrievecustomer', async (req, res) => {
  const customer = await stripe.customers.retrieve(req.query.id, {
    expand: ['subscriptions']
  });
  res.json(customer);
});


app.listen(port, () => {
    console.log('running on ' + port);
});
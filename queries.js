import { gql } from "graphql-tag"

export const UPDATE_STRIPE_ID = gql`
      mutation addStripeId($userID: String!) {
          updateStripeId(userID: $userID, stripeID: $stripeID) {
              _id
              stripe_id
          }
      }
`

export const EXTEND_USER = gql`
mutation($userID: ID!, $is_company: Boolean!, $first_name: String!, $last_name: String!, $company_name: String, $tax_number: String, $user_country: String!, $user_city: String!, $user_street: String!, $user_housenumber: String!, $user_ZIP: String,
        $company_country: String, $company_city: String, $company_street: String, $company_housenumber: String, $company_ZIP: String, $stripe_id: String) {
    extendUser(userID: $userID, is_company: $is_company, first_name: $first_name, last_name: $last_name, company_name: $company_name, tax_number: $tax_number, user_country: $user_country, user_city: $user_city, user_street: $user_street, 
    user_housenumber: $user_housenumber, user_ZIP: $user_ZIP, company_country: $company_country, company_city: $company_city, company_street: $company_street, company_housenumber: $company_housenumber, company_ZIP: $company_ZIP, stripeID: $stripe_id) {
		  _id
    }
}
`

export const ADD_LIST = gql`
      mutation addList($userID: ID!, $order_quantity: String!, $network_id: String!, $invoice_url: String!) {
        addList(userID: $userID, order_quantity: $order_quantity, network_id: $network_id, invoice_url: $invoice_url) {
              _id
          }
      }
`
import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
query getAllProducts {
    category {
    name
    products {
        id,
        name,
        inStock,
        gallery,
        category,
        prices {
            currency {
                label,
                symbol
            }
            amount
        }
    }
   }
}
`

export const GET_CURRENCIES = gql`
    query getCurrencies {
        currencies {
        label,
        symbol
        }
    }
`

export const GET_ONE_PRODUCT = gql`
query GET_ONE_PRODUCT($id: String!) {
    product(id: $id) {
        name,
        id,
          inStock,
        gallery,
        description,
          attributes {
          name,
          type,
          items {
            displayValue,
            value
          }
        }
        prices {
            currency {
            label,
            symbol
            }
            amount
        }
        brand
    }
}
`

export const GET_CURRENT_CURRENCY = gql`
query getCurrency {
  currency @client
}
`;

export const GET_CURRENT_CART = gql`
query getCart {
    cartItems @client
}
`;

export const GET_CURRENT_SUMMARY = gql`
query getSummary {
    summary @client
}
`;


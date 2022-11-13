import { gql } from "@apollo/client";

export const getAllProducts = gql`
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

export const getCurrencies = gql`
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
      id
    }
}
`


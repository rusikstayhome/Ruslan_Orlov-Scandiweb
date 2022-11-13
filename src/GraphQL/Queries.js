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


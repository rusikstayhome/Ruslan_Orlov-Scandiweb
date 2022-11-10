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
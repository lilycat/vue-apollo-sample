import gql from 'graphql-tag'

// すべての顧客を取得
export const ALL_MENUS = gql`
query allMenus {
  menus( stage: DRAFT) {
      id
      name
      description
      imageUrl
      shop {
        id
        name
        address
      }
  }
}
`
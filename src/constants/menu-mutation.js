import gql from 'graphql-tag'

// menuの新規追加
export const CREATE_MENU = gql`
    mutation createMenu($name: String,$imageUrl: String) {
        createMenu(data: { name: $name, imageUrl: $imageUrl}) {
            name
        }
    }
`
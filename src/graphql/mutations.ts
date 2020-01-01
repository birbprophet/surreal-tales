import gql from "graphql-tag"

export const ADD_USER_ENTRY = gql`
  mutation addUserEntry(
    $username: String!
    $display_name: String!
    $email: String!
    $stream_token: String!
  ) {
    insert_users(
      objects: {
        username: $username
        display_name: $display_name
        email: $email
        stream_token: $stream_token
      }
    ) {
      affected_rows
    }
  }
`

export const ADD_SESSION_RETURN_ID = gql`
  mutation addSession($user_id: String!, $room_code: String!) {
    insert_sessions(objects: { room_code: $room_code, user_id: $user_id }) {
      returning {
        id
      }
    }
  }
`

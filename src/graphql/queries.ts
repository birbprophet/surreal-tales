import gql from "graphql-tag"

export const GET_USERNAME_FROM_USERNAME = gql`
  query getUsername($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`
export const GET_USERNAME_FROM_EMAIL = gql`
  query getUserEntry($email: String!) {
    users(where: { email: { _eq: $email } }) {
      username
    }
  }
`

export const GET_USER_ENTRY_FROM_UID = gql`
  query getUserEntry($user_id: String!) {
    users(where: { id: { _eq: $user_id } }) {
      username
      email
      display_name
      profile_picture_url
      bio
      stream_token
    }
  }
`

export const GET_CURRENT_SESSION_FROM_UID = gql`
  query getCurrentSession($user_id: String!) {
    sessions(
      limit: 1
      where: {
        in_progress: { _eq: true }
        cancelled: { _eq: false }
        user_sessions: { user_id: { _eq: $user_id } }
      }
    ) {
      user {
        username
        display_name
      }
      setting {
        prompt
        title
        user {
          username
          display_name
        }
      }
      user_sessions {
        character {
          bio
          name
        }
        user {
          username
          display_name
        }
      }
      interactions {
        text
        type
        selected_option {
          text
          is_user_input
          user {
            username
            display_name
          }
        }
      }
    }
  }
`

export const GET_ALL_OPEN_SESSION_ROOM_CODE = gql`
  query getSessionRoomCodes {
    sessions(
      where: {
        in_progress: { _eq: true }
        started: { _eq: false }
        cancelled: { _eq: false }
      }
    ) {
      room_code
    }
  }
`

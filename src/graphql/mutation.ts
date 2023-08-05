import { gql } from "@apollo/client"

 export const ADD_TO_COLLECTION = gql`
    mutation AddToCollection($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry (mediaId: $mediaId, status: $status) {
        id
        media {
          id
          title {
            romaji
            english
            native
          }
        }
        status
        customLists
    }
}
`;

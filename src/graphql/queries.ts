import { gql } from "@apollo/client"

 export const GET_ALL_DATA = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media(id: $id, search: $search) {
            id
            title {
            romaji
            }
            type
            coverImage {
              medium
            }
          }
        }
    }
 `
export const GET_DATA_BY_ID = gql`
  query ($id: Int) { 
    Media (id: $id, type: ANIME) { 
        id
        title {
          english
          native
        }
        status
        genres
        episodes
        duration
        bannerImage
        description
        countryOfOrigin
        startDate {
          day
          month
          year
        }
        coverImage {
          medium
        }
      }
    }
 `
import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import DataTable from "../../component/datatable-componet"
import { GET_ALL_DATA } from "../../graphql/queries";
import styled from '@emotion/styled'
import { ButtonSm } from '../../constant/component-styles/components';

interface SortType {
    [key: string]: { [key: string]: any}
}

export interface VariablesProps {
    page: number;
    perPage: number;
    sort_by?: string;
    sort_order?: string;
    offset?: number;
    sort?: SortType
  }

interface RouteProps {
    displayName: string,
    route: string
}

function IndexScreen (props: RouteProps) {
    const {displayName, route} = props
    const [variables, setVariables] = useState<VariablesProps>({
        page: 1,
        perPage: 10,
        sort_by: 'id',
        sort_order: 'ID_DESC',
        offset: 0
    })

    const [data, setData] = useState({
        data: [],
        total: 0
    })
    const { loading, error, data: queryData } = useQuery(GET_ALL_DATA,{variables: {
        ...variables,
        sort: [{ [variables.sort_by!]: variables.sort_order}]
    },})
   
    useEffect(() => {
        setData({
            data: queryData?.Page?.media?.map((item: any) => {
            return {
                image: item.coverImage?.medium,
                id: item.id,
                title: item.title.romaji,
                type: item.type,
                format: item.format,
                episodes: item.episodes,
                duration: item.duration,
                genres: item.genres,
            }
        }),
        total: queryData?.Page?.pageInfo.total || 0
    })
    }, [queryData])

    return (
        <>
        <DataTable 
          dataaa={data.data}
          total={data.total}
          to={route.split('/')[1]}
          setVariables={setVariables}
          withoutHeader
          toolbar={{
            action: {
                add: true
            }
          }}
          columns={[
            { header: '', value: 'image', copy: true, type: 'img', width: 500 },
            { header: '', 
              value: 'title', 
              copy: true, 
              type: 'multi-value-link', 
              secondValue: 'genres',
              obj: 'genres'},
            { 
              header: '', 
              value: 'format', 
              copy: true, 
              type: 'multi-value',
              obj: 'episodes',
              obj2: 'duration'
             },
            ]}
        //   checkbox
        />
        </>
    )
}

export default IndexScreen
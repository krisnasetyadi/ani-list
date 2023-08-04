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
    console.log('propsIndexScreen', props)
    const [variables, setVariables] = useState<VariablesProps>({
        page: 1,
        perPage: 10,
        sort_by: 'id',
        sort_order: 'ID_DESC',
        offset: 0
    })

    console.log('variables', variables)
    const [data, setData] = useState({
        data: [],
        total: 0
    })
    const { loading, error, data: queryData } = useQuery(GET_ALL_DATA,{variables: {
        ...variables,
        sort: [{ [variables.sort_by!]: variables.sort_order}]
    },})


    console.log('queryData', queryData, error)
   
    useEffect(() => {
        setData({
            data: queryData?.Page?.media?.map((item: any) => {
            return {
                id: item.id,
                title: item.title.romaji,
                type: item.type
            }
        }),
        total: queryData?.Page?.pageInfo.total || 0
    })
    }, [queryData])
    console.log('route', route.split('/')  )
    
    return (
        <>
        <DataTable 
          dataaa={data.data}
          total={data.total}
          to={route.split('/')[1]}
          setVariables={setVariables}
          columns={[
            { header: 'Id', value: 'id', copy: true },
            { header: 'TITLE', value: 'title', copy: true, type: 'link' },
            { header: 'TYPE', value: 'type', copy: true },
            ]}
          checkbox
        />
        </>
    )
}

export default IndexScreen
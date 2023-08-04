import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GET_DATA_BY_ID } from '../../graphql/queries'
import { useQuery } from '@apollo/client';
import InputSummaryDetailComponent from '../../component/input-summary-detail-component';
import { ButtonSm } from '../../constant/component-styles/components';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import LoadingHoverComponent from '../../component/loading-hover-component';

interface QueryResponse {
    loading: boolean;
    error?: any;
    data?: any;
  }

function ShowScreen(props: any) {
    console.log('propsss show', props)
    const {displayName} = props
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [queryData, setQueryData] = useState<any>({})
    console.log('iddddddata', location, id)
    // console.log('state', state)
    // console.log('anime_type', anime_type)
    // if (id) {
      const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
        variables: {
          id: id,
          // type: state?.anime_type,
        } 
      });
      useEffect(() => {
        setQueryData(data?.Media)
      },[data])
 
      console.log('datauseQuery', queryData)
    // }


    console.log('loading', loading)
    console.log('error', error)
  

    return (
      <div style={{marginTop: '6px'}}>
      <div style={{ display: 'flex', marginBottom: '6px' }}>
        <button type="button">
          <ChevronLeftIcon style={{ height: '1rem', stroke: '2px', pointerEvents: 'auto' }} onClick={() => navigate(-1)} />
        </button>
        <h1 className="font-bold text-xl max-[640px]:text-xs max-[640px]:mr-2">{displayName}</h1>
        <div className="flex-1" />
        {/* <DeleteButton api={CategoryApi} id={id} redirectTo="master/category" /> */}
        <ButtonSm
          onClick={() => {
            navigate(`/master/category/${id}/edit`);
            // store.setIsLoadEdit(true);
          }}
          // px={8}
          // size="sm"
          type="submit"
          className="ml-4 rounded-full bg-[#184D47] drop-shadow-md text-[#fff] font-bold hover:text-[#E4E4E4]"
        >
          Edit
        </ButtonSm>
      </div>

      <div className="grid items-start justify-items-center w-full gap-y-12 grid-cols-2 bg-white py-8 px-8 rounded-[30px] drop-shadow-md">
        <InputSummaryDetailComponent
          value={queryData?.id}
          label="Code"
          customStyleLabel="text-md"
          customStyleSpan="text-md font-bold"
        />
        <InputSummaryDetailComponent
          value={queryData?.status}
          label="Category"
          customStyleLabel="text-md"
          customStyleSpan="text-md font-bold"
        />
      </div>
      {loading && <LoadingHoverComponent />}
    </div>
    )
}

export default ShowScreen
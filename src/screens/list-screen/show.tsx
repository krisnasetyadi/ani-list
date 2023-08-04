import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GET_DATA_BY_ID } from '../../graphql/queries'
import { useQuery } from '@apollo/client';
import InputSummaryDetailComponent from '../../component/input-summary-detail-component';
import { Button, DivContainer, DivwithGrid, H1Bold, Tag, Title } from '../../constant/component-styles/components';
import LoadingHoverComponent from '../../component/loading-hover-component';
import { StyledChevronLeftIcon } from '../../constant/component-styles/icon-components';
import { COLORS } from '../../constant/theme';
import { SpanBold } from '../../constant/component-styles/datatable-component-style';

function ShowScreen(props: any) {
    const { displayName } = props
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [queryData, setQueryData] = useState<any>({})

    const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
      variables: {
        id: id,
        // type: state?.anime_type,
      } 
    });

    useEffect(() => {
      setQueryData(data?.Media)
    },[data])

      console.log('error', error)
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '6px', alignItems: 'center', borderBottom: `0.5px solid ${COLORS.light}` }}>
          <StyledChevronLeftIcon 
            onClick={() => navigate(-1)} 
          />
          <H1Bold>{displayName}</H1Bold>
          <div style={{ flex: 1 }} />
          {/* will be delete button in this section*/}
          <Button
            onClick={() => navigate(`/master/category/${id}/edit`)}
            type="submit"
          >
            Edit
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <img src={queryData?.bannerImage} style={{
            width: '90%',
            height: '30%',
            borderRadius: '10px',
            marginBottom: '20px'
          }} />
        </div>
   
        {loading && <LoadingHoverComponent />}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '20px'}}>
          <div>
            {!queryData?.title?.english.includes(queryData?.title?.native) && (
            <Title>{queryData?.title?.native}</Title>
             )}
            <Title>{queryData?.title?.english}</Title>
          </div>
          <div>
            <SpanBold>{`${queryData?.countryOfOrigin}`}</SpanBold>
            <Tag color={COLORS.success}>{queryData?.status}</Tag>
          </div>
        </div>
      
        <DivContainer>
          <DivwithGrid>
            <InputSummaryDetailComponent
              label="Episodes"
              value={queryData?.episodes}
            />
            <InputSummaryDetailComponent
              label="Genres"
              value={queryData?.genres?.join(', ')}
            />
            <InputSummaryDetailComponent
              label="Duration"
              value={`${queryData?.duration} minutes`}
            />
            <InputSummaryDetailComponent
              label="Description"
              value={queryData?.description}
            />
          </DivwithGrid>
        </DivContainer>
    </div>
    )
}

export default ShowScreen
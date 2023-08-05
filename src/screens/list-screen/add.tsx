import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_DATA_BY_ID } from '../../graphql/queries'
import { useQuery } from '@apollo/client';
import { ButtonDefault, DivContainer, DivwithGrid, H1Bold, Tag, Title } from '../../constant/component-styles/components';
import LoadingHoverComponent from '../../component/loading-hover-component';
import { StyledChevronLeftIcon } from '../../constant/component-styles/icon-components';
import { COLORS } from '../../constant/theme';
import { SpanBold } from '../../constant/component-styles/datatable-component-style';
import InputComponent from '../../component/input-component';

function AddScreen(props: any) {
    const { id } = useParams()
    const { displayName } = props
    const navigate = useNavigate()
    const [queryData, setQueryData] = useState<any>({})
    const [errors, setErrors] = useState({})

    const {loading, error, data} = useQuery(GET_DATA_BY_ID, {
        variables: {
            id: id
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
    } 

    return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', marginBottom: '6px', alignItems: 'center', borderBottom: `0.5px solid ${COLORS.light}` }}>
          <StyledChevronLeftIcon 
            onClick={() => navigate(-1)} 
          />
          <H1Bold>{displayName}</H1Bold>
          <div style={{ flex: 1 }} />
          {/* will be delete button in this section*/}
          <ButtonDefault
            type="submit"
          >
            Add
          </ButtonDefault>
        </div>
        {/* {loading && <LoadingHoverComponent />} */}
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
            <InputComponent name='name' label='Label' errors={errors} />
          </DivwithGrid>
        </DivContainer>
        
    </form>
    )
}

export default AddScreen
import React from 'react'
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CCol, CCardHeader, CRow } from '@coreui/react'
import img from '../../assets/img/icon/add.png'
export default function card() {
    return (
        <div>
            <CCard style={{ width: '20rem' }}>
                <CCardBody>
                    <CCardTitle>Card title</CCardTitle>
                    <CCardText>
                    {/* <CIcon  icon={icon.cilChevronTop} size="lg"/>                */}
                    <CCardImage src={img}/>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                </CCardBody>
            </CCard>
        </div>
    )
}

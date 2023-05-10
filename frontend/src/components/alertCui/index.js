import React from "react";
import { useNavigate } from "react-router-dom";
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
  } from "@coreui/react";
export default function index({ title,content,label,link,confirm,setconfirm }) {
  const navigate = useNavigate();
  return (
    <>
      <CModal
        alignment="center"
        visible={confirm}
        onClose={() => {setconfirm(false);navigate(link)}}
      >
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {content}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => {setconfirm(false);navigate(link)}}>
            {label}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

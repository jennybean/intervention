import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import TextButton from "../library/text-button";

const CreateProjectButton = ({ onClick }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(Actions.getUser({ id }));
  // }, [dispatch, id]);

  return (
    <TextButton onClick={onClick} label="Create new project +" size="small" />
  );
};

export default CreateProjectButton;

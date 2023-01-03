import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { initData } from "../stores/ReduxStore";
import Title from "./Title";

function UiSelect(props: { title?: string; showMore?: boolean | undefined }) {
  const dispatch = useDispatch();

  // url  => call API => options
  // useEffect(() => {
  //   dispatch(initData({ title: props.title }));
  // }, [dispatch, props.title]);

  return <Title {...props} />;
}

export default UiSelect;

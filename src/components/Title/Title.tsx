import type { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTitle } from "../../stores/ReduxStore";
import { st, classes } from "./Title.st.css";

function Title(props: { showMore?: boolean }) {
  const { showMore = false } = props;
  const dispatch = useDispatch();

  const title = useSelector(
    (state: { mainStore: initDataType }) => state.mainStore.title
  );

  const handleChangeTitle = (e?: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTitle({ title: e?.target.value }));
  };

  return (
    <div className={st(classes.root)}>
      Hello <input value={title} onChange={handleChangeTitle} />
      <h1 className={classes.title}>Hello {title}</h1>
      {showMore && (
        <p>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown ..
        </p>
      )}
    </div>
  );
}

export default Title;

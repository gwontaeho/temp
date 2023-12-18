import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeTodo, checkTodo } from "../../redux/todos/actions";
import "./list.css";

export const List = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const onClickRemove = useCallback((id) => {
    dispatch(removeTodo(id));
  }, []);

  const onClickCheck = useCallback((id) => {
    dispatch(checkTodo(id));
  }, []);

  const drawLine = useCallback((e, check) => {
    const listItemTextLine = e.currentTarget.parentNode.getElementsByClassName(
      "list-item-text-line"
    )[0];
    const listItemCheckLine = e.currentTarget.getElementsByClassName(
      "list-item-check-line"
    );

    let maxWidth;
    let color;

    if (!check) {
      maxWidth = "100%";
      color = "gray";
    } else {
      maxWidth = 0;
      color = "black";
    }

    listItemTextLine.style.maxWidth = maxWidth;
    listItemTextLine.parentNode.style.color = color;
    for (let i = 0; i < listItemCheckLine.length; i++) {
      listItemCheckLine[i].style.maxWidth = maxWidth;
    }
  }, []);

  return (
    <div className="list">
      {!!todos.length &&
        todos.map((todo) => {
          return (
            <div key={todo.id} className="list-item">
              <div
                onClick={(e) => {
                  onClickCheck(todo.id);
                  drawLine(e, todo.check);
                }}
                className="list-item-check"
              >
                <div>
                  안함
                  <div className="list-item-check-line-one">
                    <div className="list-item-check-line" />
                  </div>
                  <div className="list-item-check-line-two">
                    <div className="list-item-check-line" />
                  </div>
                </div>
              </div>
              <div className="list-item-text">
                <div>{todo.text}</div>
                <div className="list-item-text-line" />
              </div>
              <div
                onClick={() => onClickRemove(todo.id)}
                className="list-item-remove"
              >
                삭제
              </div>
            </div>
          );
        })}
    </div>
  );
};

import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { addTodo } from "../../redux/todos/actions";
import "./add.css";

export const Add = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const [text, setText] = useState("");

  useEffect(() => {
    inputRef.current.style.animation = "";
  }, [text]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickAdd = useCallback(() => {
    if (!text) {
      inputRef.current.style.animation = "translate 0.1s 3";
      setTimeout(() => {
        inputRef.current.style.animation = "";
      }, 300);
      return;
    }
    dispatch(addTodo({ id: new Date().getTime(), text }));
    setText("");
  }, [text]);

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") onClickAdd();
    },
    [onClickAdd]
  );

  return (
    <div className="Add">
      <input
        ref={inputRef}
        className="Add-input"
        value={text}
        onChange={onChangeText}
        maxLength={20}
        onKeyPress={onKeyPress}
      />
      <div className="Add-button" onClick={onClickAdd}>
        추가
      </div>
    </div>
  );
};

import { CHAR_LIST } from "./miyeonshi.const";
import { SelectItem } from "./selectItem";
import { useRef, useEffect } from "react";
import "./miyeonshi.css";

export const SelectModal = ({ setModalOpen }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setModalOpen]);

  const modalRef = useRef();
  return (
    <div id="modal" className="char" ref={modalRef}>
      <h4>어떤 남자와 만나볼까?</h4>
      <div id="char-list">
        {CHAR_LIST.map(({ id, name, score, description }) => (
          <SelectItem
            id={id}
            name={name}
            score={score}
            description={description}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

import { CHAR_LIST } from "./miyeonshi.const";
import { SelectItem } from "./selectItem";
import "./miyeonshi.css";

export const SelectModal = () => {
  return (
    <div id="modal" class="char">
      <h4>어떤 남자와 만나볼까?</h4>
      <div id="char-list">
        {CHAR_LIST.map(({ id, name, score, description }) => (
          <SelectItem
            id={id}
            name={name}
            score={score}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

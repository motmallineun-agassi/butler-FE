import { CHAR_LIST } from "./miyeonshi.const";
import { SelectItem } from "./selectItem";

export const SelectModal = () => {
  return (
    <div>
      {CHAR_LIST.map(({ id, name, score, description }) => (
        <SelectItem
          id={id}
          name={name}
          score={score}
          description={description}
        />
      ))}
    </div>
  );
};

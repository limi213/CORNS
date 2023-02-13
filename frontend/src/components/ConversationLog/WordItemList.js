import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditWordButton from "./EditWordButton";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import { toStringDate } from "store/reducers/roomFilterReducer";
import useAxios from "auth/useAxios";
import { useEffect } from "react";

function WordListItem({
  item,
  setBaseTime,
  reload,
  setReload,
  handleToggle,
  checked,
}) {
  const { status: deleteWordStatus, sendRequest: deleteWordRequest } =
    useAxios();

  // 삭제 버튼 클릭 - [DELETE] 단어 삭제
  const clickedDeleteButton = (word) => async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteWordRequest({
        url: `${process.env.REACT_APP_HOST}/word/${word.wordSq}`,
        method: "DELETE",
      });
    }
  };

  useEffect(() => {
    if (deleteWordStatus === 200) {
      console.log(
        `[delete word] wordSq: ${item.wordSq}, wordEng: ${item.wordEng}, wordKor: ${item.wordKor}`
      );
      setBaseTime(toStringDate(new Date()));
      setReload(!reload);
    }
  }, [deleteWordStatus]);

  return (
    <ListItem
      key={item.wordSq}
      onClick={handleToggle(item)}
      secondaryAction={[
        <EditWordButton
          word={item}
          setBaseTime={setBaseTime}
          reload={reload}
          setReload={setReload}
        />,
        <IconButton onClick={clickedDeleteButton(item)}>
          <DeleteIcon color="error" className="deleteButton"></DeleteIcon>
        </IconButton>,
      ]}
      disablePadding
    >
      <ListItemButton role="listitem">
        <ListItemIcon>
          <Checkbox
            checked={checked.indexOf(item) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{
              "aria-labelledby": item.wordSq,
            }}
            sx={{
              color: "#111",
              "&.Mui-checked": {
                color: "#1766C3",
              },
            }}
          />
        </ListItemIcon>
        <ListItemText primary={`${item.wordEng}`} sx={{ width: "50%" }} />
        <ListItemText primary={`${item.wordKor}`} sx={{ width: "50%" }} />
        <ListItemIcon></ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}

export default WordListItem;

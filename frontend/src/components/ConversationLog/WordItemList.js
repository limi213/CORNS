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

function WordListItem({
  item,
  id,
  setBaseTime,
  reload,
  setReload,
  handleToggle,
  checked,
}) {
  // 삭제 버튼 클릭 - [DELETE] 단어 삭제
  const clickedDeleteButton = (word) => async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_HOST}/word/${word.wordSq}`
        );
        if (response.status === 200) {
          setBaseTime(toStringDate(new Date()));
          setReload(!reload);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ListItem
      key={id}
      secondaryAction={[
        <IconButton>
          <EditWordButton
            word={item}
            setBaseTime={setBaseTime}
            reload={reload}
            setReload={setReload}
          />
        </IconButton>,
        <IconButton>
          <DeleteIcon
            color="error"
            className="deleteButton"
            onClick={clickedDeleteButton(item)}
          ></DeleteIcon>
        </IconButton>,
      ]}
      disablePadding
    >
      <ListItemButton role="listitem" onClick={handleToggle(item)}>
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
        <ListItemText
          id={`${item.wordEng}-ListItemText`}
          primary={`${item.wordEng}`}
          sx={{ width: "50%" }}
        />
        <ListItemText
          id={`${item.wordEng}-ListItemText`}
          primary={`${item.wordKor}`}
          sx={{ width: "50%" }}
        />
        <ListItemIcon></ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}

export default WordListItem;

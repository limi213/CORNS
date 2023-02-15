import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import { toStringDate } from "store/reducers/roomFilterReducer";

import { GetDoneWord, GetTodoWord } from "./GetWord";
import WordListItem from "./WordItemList";
import AddWordButton from "./AddWordButton";
import getRefreshToken from "auth/getRefreshToken";
import Logout from "auth/Logout";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const [baseTime, setBaseTime] = useState(toStringDate(new Date()));
  const [reload, setReload] = useState(true);
  const [todoLoading, setTodoLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    if (baseTime) {
      GetTodoWord(baseTime, setTodoWords, setTodoLoading);
      GetDoneWord(baseTime, setDoneWords, setDoneLoading);
    }
  }, [reload]);

  const [checked, setChecked] = useState([]);
  const [todoWords, setTodoWords] = useState([]);
  const [doneWords, setDoneWords] = useState([]);

  const leftChecked = intersection(checked, todoWords);
  const rightChecked = intersection(checked, doneWords);

  // 체크박스
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // 외운 단어로 상태 변경 (좌 -> 우)
  const handleCheckedRight = () => {
    let request = leftChecked.map(function (value) {
      return { status: 2, wordSq: value.wordSq };
    });
    updateWordStatus(request);

    setTodoWords(not(todoWords, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  // 외워야할 단어로 상태 변경 (우 -> 좌)
  const handleCheckedLeft = () => {
    let request = rightChecked.map(function (value) {
      return { status: 1, wordSq: value.wordSq };
    });
    updateWordStatus(request);

    setDoneWords(not(doneWords, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  // [PATCH] 단어 상태 변경
  const updateWordStatus = async (body) => {
    const sendRequest = async () => {
      console.log(`[patch] update word status`);
      const response = await axios.patch(
        `${process.env.REACT_APP_HOST}/word`,
        body
      );
      if (response.status === 401) {
        console.log("unauthorized!-> refresh!");
        const refreshResponse = await getRefreshToken();

        if (refreshResponse === 200) {
          return sendRequest();
        } else {
          alert("세션이 만료되었습니다.");
          Logout();
          return false;
        }
      } else if (response.status === 200) {
        return response;
      }
    };

    try {
      const updateWord = await sendRequest();
      if (updateWord.status === 200) {
        setBaseTime(toStringDate(new Date()));
        setReload(!reload);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid
      container
      sx={{ mt: "32px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={5.5}
        sx={{
          boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
          border: "3px solid #111",
        }}
      >
        <Grid sx={{ ml: "16px", mr: "16px" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>외워야할 쫑알단어</h3>
            <AddWordButton
              setBaseTime={setBaseTime}
              reload={reload}
              setReload={setReload}
            />
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", height: "600px", overflow: "auto" }}>
          <List aria-labelledby="todo-word-list">
            {todoLoading && (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="inherit" />
              </Grid>
            )}
            {!todoLoading &&
              todoWords.length > 0 &&
              todoWords.map((item, id) => {
                return (
                  <div key={id}>
                    <WordListItem
                      item={item}
                      setBaseTime={setBaseTime}
                      reload={reload}
                      setReload={setReload}
                      handleToggle={handleToggle}
                      checked={checked}
                    />
                  </div>
                );
              })}
            {!todoLoading && todoWords.length === 0 && (
              <Grid sx={{ ml: "16px" }}>
                <p>쫑알단어를 등록하고 학습해보세요!</p>
              </Grid>
            )}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={1}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            sx={{
              my: 0.5,
              border: "3px solid #111",
              borderRadius: "0",
              backgroundColor: "#3C90F2",
              color: "#111",
              "&:hover": {
                backgroundColor: "#1766C3",
              },
              ":disabled": {
                color: "#111",
              },
            }}
            variant="contained"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            {/* &gt; */}
            <p css={css`margin: 0; font-weight: bold; font-size: 20px;`}> {`>`} </p>
          </Button>
          <Button
            sx={{
              my: 0.5,
              border: "3px solid #111",
              borderRadius: "0",
              backgroundColor: "#3C90F2",
              color: "#111",
              "&:hover": {
                backgroundColor: "#1766C3",
              },
              ":disabled": {
                color: "#111",
              },
            }}
            variant="contained"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            {/* &lt; */}
            <p css={css`margin: 0; font-weight: bold; font-size: 20px;`}> {`<`} </p>
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={5.5}
        sx={{
          boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
          border: "3px solid #111",
        }}
      >
        <Grid sx={{ ml: "16px" }}>
          <h3>외운 쫑알단어</h3>
        </Grid>
        <Paper sx={{ width: "100%", height: "600px", overflow: "auto" }}>
          {doneLoading && (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="inherit" />
            </Grid>
          )}
          {!doneLoading && (
            <List aria-labelledby="done-word-list">
              {doneWords.length > 0 &&
                doneWords.map((item, id) => {
                  return (
                    <div key={id}>
                      <WordListItem
                        item={item}
                        setBaseTime={setBaseTime}
                        reload={reload}
                        setReload={setReload}
                        handleToggle={handleToggle}
                        checked={checked}
                      />
                    </div>
                  );
                })}
              {doneWords.length === 0 && (
                <Grid sx={{ ml: "16px" }}>
                  <p>쫑알단어를 학습하고 외운 단어로 옮겨보세요!</p>
                </Grid>
              )}
            </List>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

import { Dispatch, SetStateAction } from "react";
import { Marks } from "../util/dataTypes";

export async function getHttp(
  url: string,
  setError: Dispatch<SetStateAction<string>>,
) {
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    setError("Error in getHttp function.");
  }
}

export async function postMarks(
  url: string,
  marks: Marks,
  setError: Dispatch<SetStateAction<string>>,
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(marks),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    setError("Error in postMarks function.");
  }
}

export async function postHttp(
  url: string,
  data: number,
  playerMark: string,
  setError: Dispatch<SetStateAction<string>>,
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data,
        playerMark: playerMark,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    setError("Error in postHttp function.");
  }
}

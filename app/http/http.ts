import { Marks } from "../index";

export async function getHttp(url: string) {
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) throw new Error("Response not ok");
    return data;
  } catch (error) {
    console.error("Failed to retrive data: ", error);
  }
}

export async function postMarks(url: string, marks: Marks) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(marks),
    });
    if (!response.ok) throw new Error("Response not ok");
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Failed in postMarks: ", error);
  }
}

export async function postHttp(url: string, data: number, playerMark: string) {
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
    if (!response.ok) throw new Error("Error in postHttp");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Failed to post data: ", error);
  }
}

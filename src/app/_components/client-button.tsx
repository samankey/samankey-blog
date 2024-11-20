"use client";
import { updateAllPosts } from "@/lib/updatePostDates";

export default function ClientButton() {
  return <button onClick={() => updateAllPosts()}>테스트</button>;
}

"use client";
import { useSearchParams } from "next/navigation";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <>
      <div>this is new Template : {id}</div>
    </>
  );
}

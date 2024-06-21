import { ReactElement } from "react";

export function SessionExpired(): ReactElement {
  return (
    <section className="flex h-full flex-col flex-1 justify-center items-center">
      <h2 className="font-bold text-lg mb-4">Session expired</h2>
      <p className="text-lg">Please login in again</p>
    </section>
  );
}

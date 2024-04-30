import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  const store = getStore("ntl-todos");

  if (req.method === "GET") {
    const todos = await store.get("todos", { type: "json" });
    // @ts-expect-error `new` operator not needed for Response.json()
    return Response.json(todos || [], { status: 200 });
  }

  if (req.method === "PUT") {
    const body = await req.json();
    await store.setJSON("todos", body);
    return new Response("Todos updated", { status: 200 });
  }

  return new Response("Unsupported method", { status: 405 });
};

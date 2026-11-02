import { route, handleOptions } from "@/lib/http";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const OPTIONS = handleOptions;
export const GET = route(async () => db.category.findMany({ orderBy: { name: "asc" } }));

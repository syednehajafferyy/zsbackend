import { route } from "@/lib/http";
import { saveProduct } from "@/lib/products";
export const POST = route(async (req) => ({ ok: true, id: (await saveProduct(await req.formData())).id }), { admin: true });

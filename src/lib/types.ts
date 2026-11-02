export type Category = { id: string; name: string; slug: string; description: string | null };
export type Product = { id: string; name: string; slug: string; description: string; image: string | null; published: boolean; categoryId: string | null; category?: Category | null };
export type InquiryStatus = "PENDING" | "READ" | "RESOLVED";
export type Inquiry = { id: string; name: string; email: string; phone: string; subject: string; message: string; status: InquiryStatus; createdAt: string };
export type Stats = { products: number; published: number; inquiries: number; pending: number };

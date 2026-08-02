import { NextResponse } from "next/server";
import { z } from "zod";
import { getPayloadClient } from "@/lib/payload";
import { isUIReviewMode } from "@/lib/review-mode";

const bodySchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  company: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  city: z.string().trim().min(1),
  country: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  cellPhone: z.string().trim().min(1),
  fax: z.string().trim().optional().default(""),
  email: z.string().trim().min(1).email(),
  website: z.string().trim().optional().default(""),
  interestedIn: z.string().trim().optional().default(""),
  omegaLineProduct: z.string().trim().optional().default(""),
  saltType: z.string().trim().optional().default(""),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
  locale: z.string().optional().default("en"),
});

export async function POST(request: Request) {
  if (isUIReviewMode) {
    return NextResponse.json(
      { success: false, error: "This form is disabled in the client review preview." },
      { status: 200 },
    );
  }

  try {
    const body = await request.json();
    const parsed = bodySchema.parse(body);

    const payload = await getPayloadClient();

    await payload.create({
      collection: "inquiries",
      data: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        company: parsed.company,
        address: parsed.address,
        city: parsed.city,
        country: parsed.country,
        phone: parsed.phone,
        cellPhone: parsed.cellPhone,
        fax: parsed.fax,
        email: parsed.email,
        website: parsed.website,
        interestedIn: parsed.interestedIn,
        omegaLineProduct: parsed.omegaLineProduct,
        saltType: parsed.saltType,
        message: parsed.message,
        consent: parsed.consent,
        locale: parsed.locale,
        status: "new",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    console.error("Inquiry submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

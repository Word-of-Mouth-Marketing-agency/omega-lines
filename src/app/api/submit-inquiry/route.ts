import { NextResponse } from "next/server";
import { z } from "zod";
import { getPayloadClient } from "@/lib/payload";

const phoneRegex = /^[+\d][\d\s\-()]*$/;
const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  company: z.string().trim().max(200).optional().default(""),
  address: z.string().trim().max(300).optional().default(""),
  city: z.string().trim().min(1).max(100),
  country: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(1).max(50).regex(phoneRegex),
  cellPhone: z.string().trim().min(1).max(50).regex(phoneRegex),
  fax: z.string().trim().max(50).refine((value) => value === "" || phoneRegex.test(value)).optional().default(""),
  email: z.string().trim().min(1).max(254).email(),
  website: z.string().trim().max(300).refine((value) => value === "" || /^https?:\/\/.+/i.test(value)).optional().default(""),
  interestedIn: z.string().trim().max(200).optional().default(""),
  omegaLineProduct: z.string().trim().max(200).optional().default(""),
  saltType: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
  locale: z.enum(["en", "fr", "de"]).optional().default("en"),
  companyWebsite: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Content type must be application/json" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 64_000) {
    return NextResponse.json({ error: "Request is too large" }, { status: 413 });
  }

  try {
    const body = await request.json();
    const parsed = bodySchema.parse(body);

    if (parsed.companyWebsite) {
      return NextResponse.json({ success: true });
    }

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
    return NextResponse.json(
      { error: "We could not submit your inquiry right now. Please try again shortly." },
      { status: 503 },
    );
  }
}

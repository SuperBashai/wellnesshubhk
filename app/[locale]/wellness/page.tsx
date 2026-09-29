import { notFound, permanentRedirect } from "next/navigation";
export default async function LegacyGuide({ params }: { params: Promise<{ locale: string }> }) {
const { locale } = await params;
if (locale !== "en" && locale !== "zh-hk") notFound();
permanentRedirect(`/${locale}/editorial`);
}

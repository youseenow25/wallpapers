/**
 * Outbound links to ExamEscape carry UTM params so Vercel Analytics on the
 * receiving end can attribute the visit to Outbbo, and to the specific
 * placement it came from.
 */
export function examEscapeUrl(placement: string) {
  const params = new URLSearchParams({
    utm_source: "outbbo",
    utm_medium: "referral",
    utm_campaign: "outbbo-site",
    utm_content: placement,
  });
  return `https://examescape.com/?${params.toString()}`;
}

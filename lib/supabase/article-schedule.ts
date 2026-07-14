/** ISO timestamp for filtering articles visible on the public blog (scheduled publish). */
export function publishedBeforeNow(): string {
  return new Date().toISOString();
}

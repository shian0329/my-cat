export async function fetchCats(count: number): Promise<string[]> {
  const urls: string[] = []
  for (let i = 0; i < count; i++) {
    urls.push(`https://cataas.com/cat?${Date.now()}-${i}`)
  }
  return urls
}
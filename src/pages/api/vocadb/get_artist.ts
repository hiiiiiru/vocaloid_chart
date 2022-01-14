import got from "got/dist/source"
import { NextApiRequest, NextApiResponse } from "next"

export default async function artist_with_youtube_channels(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = req.query
    console.log(query)

    try {
      const response = await got("https://vocadb.net/api/artists?allowBaseVoicebanks=true&maxResults=100&getTotalCount=true&sort=AdditionDate&fields=WebLinks")

      if (response.statusCode === 200) {
        const body = JSON.parse(response.body)
        const items = body.items
        const length= items.length

        res.status(200).json({
          length, items
        })
      } else {
        res.status(204).json([])
      }
    } catch (error) {
      return res.status(500).json({ error: "internal server error" })
    }
  } else {
    res.status(405).end()
  }
}

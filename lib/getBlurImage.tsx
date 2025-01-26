import { getPlaiceholder } from "plaiceholder"

export default async function getBlurImage(img: string) {
    const imgUrl=`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails/${img}`;
    const buffer = await fetch(imgUrl).then(async (res) => Buffer.from(await res.arrayBuffer()))
    const { base64 } = await getPlaiceholder(buffer)
    return {base64,imgUrl};
}

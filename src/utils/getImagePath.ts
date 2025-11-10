export function getImgPath(params: GetImgPathParams) {
  return `/images/${params.category}/${params.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
}

interface GetImgPathParams {
  category: string;
  name: string;
}

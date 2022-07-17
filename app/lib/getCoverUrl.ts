function getCoverUrl(cover: Cover | undefined) {
  if (cover) {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg`;
  }
  return "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png";
}

export default getCoverUrl;

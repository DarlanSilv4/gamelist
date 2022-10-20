function getCoverUrl(cover: Cover | undefined) {
  if (cover) {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg`;
  }
  return "/img/cover_missing.png";
}

export default getCoverUrl;

import HeadNext from "next/head";

interface HeadProps {
  title: string;
  description?: string;
}

function Head({ title, description }: HeadProps) {
  return (
    <HeadNext>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#131520" />
    </HeadNext>
  );
}

export default Head;

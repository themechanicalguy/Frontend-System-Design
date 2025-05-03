import { useEffect, useState } from "react";
import MemeCard from "./meme-card";
import Shimmer from "./shimmer";

export interface Meme {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
}

const Body = () => {
  const [meme, setMeme] = useState<Meme[] | null>(null);
  const fetchMemes = async () => {
    const getMemes = await fetch("https://meme-api.com/gimme/50");
    const data = await getMemes.json();
    setMeme(data?.memes);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  console.log(meme);
  return (
    <div className="container">
      <div className="grid grid-cols-5 gap-4">
        {!meme ? <Shimmer /> : meme?.map((item) => <MemeCard data={item} />)}
      </div>
    </div>
  );
};

export default Body;

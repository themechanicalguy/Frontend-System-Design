interface MemeData {
  title: string;
  url: string;
  subreddit: string;
}

const MemeCard = ({ data }: { data: MemeData }) => {
  console.log("hello");
  const { title, url, subreddit } = data;
  return (
    <div className="border-2 border-b-black ">
      <img src={url} alt={subreddit} className="h-56 w-56 p-2 m-auto" />
      <p className="text-center p-2">{title}</p>
    </div>
  );
};

export default MemeCard;

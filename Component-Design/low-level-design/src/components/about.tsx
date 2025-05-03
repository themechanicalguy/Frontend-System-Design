import { Translate, Lang, LangKey } from "../utils/langConstants";

const About = ({ lang }: { lang: LangKey }) => {
  console.log(lang);

  const data: Lang = Translate[lang];
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
    </div>
  );
};

export default About;

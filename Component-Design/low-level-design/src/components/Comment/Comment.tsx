import CommentBox from "./CommentBox";

const Comment = () => {
  const data = [
    {
      username: "Akshay Saini",
      comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
      replies: [
        {
          username: "Deepika Padukone",
          comment:
            "Lorem ipsum dolor sit amet consectetur adip occurence velit",
        },
      ],
    },
    {
      username: "Elon Musk",
      comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
      replies: [
        {
          username: "Deepika Padukone",
          comment:
            "Lorem ipsum dolor sit amet consectetur adip occurence velit",
          replies: [
            {
              username: "Deepika Padukone",
              comment:
                "Lorem ipsum dolor sit amet consectetur adip occurence velit",
              replies: [
                {
                  username: "Deepika Padukone",
                  comment:
                    "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                  replies: [
                    {
                      username: "Deepika Padukone",
                      comment:
                        "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                      replies: [
                        {
                          username: "Deepika Padukone",
                          comment:
                            "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                          replies: [
                            {
                              username: "Deepika Padukone",
                              comment:
                                "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              username: "Deepika Padukone",
              comment:
                "Lorem ipsum dolor sit amet consectetur adip occurence velit",
            },
          ],
        },
        {
          username: "Deepika Padukone",
          comment:
            "Lorem ipsum dolor sit amet consectetur adip occurence velit",
        },
      ],
    },
    {
      username: "Sachin Tendulkar",
      comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
    },
  ];
  return (
    <div>
      <CommentBox data={data} />
    </div>
  );
};

export default Comment;

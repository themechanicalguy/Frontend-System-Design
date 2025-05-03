const CommentBox = ({ data }) => {
  return data.map((item, ind) => (
    <div className="flex flex-col p-2" key={ind}>
      <div className="flex w-75">
        <div>
          <img
            className="w-16 p-2 rounded-full"
            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
            alt="user"
          />
        </div>
        <div className=" p-2 rounded-lg">
          <p className="text-sm font-bold">{item.username}</p>
          <p className="text-sm">{item.comment}</p>
        </div>
      </div>
      <div className="mx-10">
        {item?.replies && <CommentBox data={item.replies} />}
      </div>
    </div>
  ));
};

export default CommentBox;

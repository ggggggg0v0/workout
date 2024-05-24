const Home = ({ exerciseType }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-3xl">
        {exerciseType ? `選擇的運動類型: ${exerciseType}` : "請選擇運動類型"}
      </h1>
    </div>
  );
};

export default Home;

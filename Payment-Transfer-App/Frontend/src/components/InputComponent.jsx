export const InputComponent = () => {
    return (
      <div className="py-6 w-11/12 m-auto font-bold">
        Users
        <div className="w-full mt-4 font-thin rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 rounded-md bg-white border-2 border-transparent focus:outline-none"
            style={{
              borderImage: "linear-gradient(to right, #6b46c1, #f56565, #fbd38d) 1",
            }}
          />
        </div>
      </div>
    );
  };
  
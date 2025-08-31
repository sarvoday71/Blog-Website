import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      {console.log("Into the loading component")}
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-50"></div>
      </div>
    </>
  );
};

export default Loader;

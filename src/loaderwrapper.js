export default function LoaderWrapper({ children }) {
  setTimeout(() => {
    const loader = document.getElementById("pre-loader");
    loader.classList.add("fade");
  }, 1000);

  return (
    <div className="wrapper" id="pre-loader">
      {children}
    </div>
  );
}

LoaderWrapper.loadingAnimation = function Loading({ Loaded = true }) {
  return (
    <div className="loader">
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  );
};

import tagsLogos from "./Logos"; // Make sure the path is correct

// Function to find the closest logo based on the script ID key
function findLogo(key) {
  const lowerKey = key.toLowerCase();
  const matchedLogo = Object.keys(tagsLogos).find((logoKey) =>
    lowerKey.includes(logoKey.toLowerCase())
  );
  return tagsLogos[matchedLogo];
}

function DetectedScripts({ scriptIDs }) {
  const ScriptChip = ({ logoSrc, value }) =>
    // Only render the ScriptChip if there is a value
    value ? (
      <div className="m-1 flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-frost/50">
        {logoSrc && <img className="w-4 h-4 mr-2" src={logoSrc} alt="" />}
        <span className={`text-xs ${value ? "text-ocean" : "text-cherry"}`}>
          {value}
        </span>
      </div>
    ) : null;

  return (
    <div className="flex flex-wrap justify-start items-center bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 rounded-md text-xs p-2 my-2 shadow-lg shadow-frost/40">
      <h3 className="w-full text-sm font-normal text-ocean mb-2 px-2">
        IDs dos Pixels
      </h3>
      {Object.entries(scriptIDs).flatMap(([key, values]) =>
        []
          .concat(values) // Ensure values is an array
          .filter((value) => value) // Filter out falsy values
          .map((value, index) => (
            <ScriptChip
              key={`${key}-${index}`}
              logoSrc={findLogo(key)}
              value={value}
            />
          ))
      )}
    </div>
  );
}

export default DetectedScripts;

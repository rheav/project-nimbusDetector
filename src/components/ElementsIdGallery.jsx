import Chip from "./Chip"; // Make sure the import path is correct

function ElementsIdGallery({ elementIDs, elementType }) {
  // Notice the prop change to 'elementIDs' and addition of 'type'
  // Determine the title based on the type prop
  const title =
    elementType === "pixels" ? "IDs dos Pixels" : "ID das Meta Tags";
  const warningMsg =
    elementType === "pixels"
      ? "⚠️ Detecção de IDs ainda em beta!"
      : " 💡 Existem outras maneiras de verificar o domínio além de meta-tags!";

  return (
    <div className="flex flex-wrap justify-start items-center bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 rounded-md text-xs p-2 my-2 shadow-lg shadow-frost/40">
      <h3 className="w-full text-sm font-normal text-ocean mb-2 px-2">
        {title}
      </h3>
      {Object.entries(elementIDs).flatMap(([key, ids]) =>
        ids.length > 0
          ? ids.map((id, index) => (
              <Chip key={`${key}-${index}`} logoKey={key} value={id} />
            ))
          : null
      )}
      <div className="m-1 flex items-center bg-cream rounded-md px-2 py-1 shadow-sm border border-frost/50 text-xs text-jade/80">
        {warningMsg}
      </div>
    </div>
  );
}

export default ElementsIdGallery;

import React from "react";
import tagsLogos from "./Logos";

function DetectedMetaTags({ metaTagIDs }) {
  const keyToLogoName = {
    Google: "Google",
    Pinterest: "Pinterest",
  };

  const MetaChip = ({ logoSrc, value }) =>
    value ? (
      <div className="m-1 flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-frost/50">
        {logoSrc && <img className="w-4 h-4 mr-2" src={logoSrc} alt="" />}
        <span className="text-xs text-ocean">{value}</span>
      </div>
    ) : null;

  return (
    <div className="flex flex-wrap justify-start items-center bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 rounded-md text-xs p-2 my-2 shadow-lg shadow-frost/40">
      <h3 className="w-full text-sm font-normal text-ocean mb-2 px-2">
        IDs das Meta Tags
      </h3>
      {Object.entries(metaTagIDs).flatMap(
        ([key, ids]) =>
          ids.length > 0
            ? ids.map((id, index) => {
                // Use the keyToLogoName mapping to get the correct logo name
                const logoName = keyToLogoName[key] || key;
                const logoSrc = tagsLogos[logoName];
                return (
                  <MetaChip
                    key={`${key}-${index}`}
                    logoSrc={logoSrc}
                    value={id}
                  />
                );
              })
            : null // If there are no IDs, do not render any chips
      )}
      <div className="m-1 flex items-center bg-cream/30 rounded-md px-2 py-1 shadow-sm border border-frost/50 text-xs text-jade/80">
        💡 Existem outras maneiras de verificar o domínio além de meta-tags!
      </div>
    </div>
  );
}

export default DetectedMetaTags;

import { useState } from "react";
import MetaTagDetector from "./components/MetaTagDetector";
import ScriptDetector from "./components/ScriptDetector";
import Table from "./components/Table";
import Tab from "./components/Tab";
import SvgNimbusLogo from "./components/SvgNimbusLogo";
import StoreDetector from "./components/StoreDetector";
import ScriptIdGetter from "./components/ScriptIdGetter";
import MetaIdGetter from "./components/MetaIdGetter";
import ElementsIdGallery from "./components/ElementsIdGallery";

function App() {
  const [scripts, setScripts] = useState([]);
  const [scriptIDs, setScriptIDs] = useState([]);
  const [metaTags, setMetaTags] = useState([]);
  const [metaTagIDs, setMetaTagIDs] = useState({});

  const handleScriptsDetected = (detectedScripts) => {
    // Transform detectedScripts into an array and set it in state
    const scriptsArray = Object.entries(detectedScripts).map(
      ([name, occurrences]) => ({
        name,
        status: occurrences > 0 ? "Online" : "Offline",
        occurrences, // include the count of occurrences
      })
    );
    const sortedScriptsArray = scriptsArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setScripts(sortedScriptsArray);
  };

  const handleMetaTagsDetected = (ShowMetaTagIDs) => {
    const metaTagsArray = Object.entries(ShowMetaTagIDs).map(
      ([name, occurrences]) => ({
        name,
        status: occurrences > 0 ? "Online" : "Offline",
        occurrences, // include the count of occurrences
      })
    );
    const sortedMetaTagsArray = metaTagsArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setMetaTags(sortedMetaTagsArray);
  };

  const handleScriptIDsDetected = (detectedIDs) => {
    setScriptIDs(detectedIDs);
  };

  const handleMetaTagIDsDetected = (detectedIDs) => {
    setMetaTagIDs(detectedIDs);
  };

  return (
    <div className="overflow-hidden shadow-lg w-[480px] bg-gradient-to-b from-snow to-frost/50 border border-frost rounded-lg py-4 ">
      <div className="px-6 flex flex-col items-center">
        <div className="font-black text-xl font-geist-var text-midnight flex items-center gap-2">
          <SvgNimbusLogo />
          <h1 className="text-transparent font-light bg-clip-text bg-gradient-to-r from-frost to-ocean">
            nimbusDetector
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <Tab
            tabs={[
              {
                title: "Scripts (Pixels)",
                content: (
                  <>
                    <Table dataType={scripts} />
                    <div className="mt-3">
                      <ElementsIdGallery
                        elementIDs={scriptIDs}
                        elementType="pixels"
                      />
                    </div>
                  </>
                ),
                explanation: (
                  <span>
                    Essa aba exibe informações dos scripts (pixels) carregados
                    na página.{" "}
                    <div className="text-ocean">
                      ⚠️ Bloqueadores de anúncios podem afetar a funcionalidade!
                    </div>
                  </span>
                ),
              },
              /*  {
                title: "Outros Scripts",
                content: <Table dataType={metaTags} />,
                explanation:
                  "Aqui são exibidas as meta-tags para verificação de domínios. Caso indique mais de 1 ocorrência da mesma tag, o ideal é checar a instalação da mesma.",
              }, */
              {
                title: "Tags de Verificação de Domínio",
                content: (
                  <>
                    <Table dataType={metaTags} />{" "}
                    <div className="mt-3">
                      <ElementsIdGallery
                        elementIDs={metaTagIDs}
                        elementType="metaTags"
                      />
                    </div>
                  </>
                ),
                explanation: (
                  <span>
                    Aqui são exibidas as meta-tags para verificação do domínio.
                    <div className="text-ocean">
                      ⚠️ Caso indique mais de 1 ocorrência da mesma tag,
                      <span> verifique a instalação</span>.
                    </div>
                  </span>
                ),
              },
            ]}
          />
          <span className=" bg-frost rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 text-xs text-snow px-4 mt-2 border border-ocean/40 shadow-lg shadow-ocean/30">
            v1.0j
          </span>
        </div>
      </div>
      <ScriptDetector onDetect={handleScriptsDetected} />
      <MetaTagDetector onDetect={handleMetaTagsDetected} />
      <StoreDetector />

      <ScriptIdGetter onDetect={handleScriptIDsDetected} />
      <MetaIdGetter onDetect={handleMetaTagIDsDetected} />
    </div>
  );
}

export default App;

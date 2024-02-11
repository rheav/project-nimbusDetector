/* eslint-disable react/prop-types */
import tagsLogos from "./Logos"; // Update the path accordingly

function Table({ dataType }) {
  return (
    <div className="w-[450px]">
      <table className="text-sm text-left rtl:text-right text-gray-500 border border-frost bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 rounded-md overflow-hidden shadow-lg shadow-frost/40 w-full">
        <thead className="text-sm text-ocean border-b border-frost/20 shadow-md shadow-sky/40">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 font-normal text-center rounded-t-md"
            >
              Tag
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal text-center rounded-t-md"
              style={{ width: "23.33%" }} // Adjust the width as needed
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal text-center rounded-t-md"
              style={{ width: "33.33%" }} // Adjust the width as needed
            >
              Quantas vezes?
            </th>
          </tr>
        </thead>
        <tbody className="rounded-b-md">
          {dataType.map((dataItem) => (
            <tr
              key={dataItem.name}
              className="hover:bg-sky hover:bg-opacity-70 transition duration-200 cursor-pointer items-center "
            >
              <td className="pl-6 py-3 flex  gap-x-2">
                {tagsLogos[dataItem.name] && (
                  <img
                    className="w-5 h-5"
                    src={tagsLogos[dataItem.name]}
                    alt={dataItem.name}
                  />
                )}
                <span className="font-normal  text-[0.8rem] text-deepSea">
                  {dataItem.name}
                </span>
              </td>
              <td className="px-6 py-3 text-center">
                <div className="flex items-center justify-center">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      dataItem.status === "Online"
                        ? "bg-emerald pulseLiveGRN animate-pulseLiveGRN"
                        : "bg-red-500"
                    } me-2`}
                  ></div>
                  <span
                    className={`${
                      dataItem.status === "Online"
                        ? "text-forest/70"
                        : "text-pebble/70"
                    }`}
                  >
                    {dataItem.status}
                  </span>
                </div>
              </td>

              <td
                className={`px-6 py-3 flex  justify-center gap-x-2 ${
                  dataItem.occurrences > 1 ? "items-center" : ""
                }`}
              >
                {dataItem.occurrences > 1 ? (
                  <div className="bg-sandy h-2 w-2 rounded-full pulseLiveYLW animate-pulseLiveYLW "></div>
                ) : (
                  <div className="bg-transparent w-2"></div>
                )}
                {dataItem.occurrences}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

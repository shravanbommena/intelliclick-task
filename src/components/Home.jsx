import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async (offset = 0) => {
    setLoading(true);
    const response = await axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`
    );
    // console.log(data);
    setTimeout(() => {
      setData((prev) => {
        // console.log(prev);
        // prev.push.apply(prev, response.data.results);
        return [...prev, ...response.data.results];
      });
      setLoading(false);
    }, 1500);

    // console.log(response.data.results);
  };

  useEffect(() => {
    getData();
  }, [offset]);
  const onScrollEnd = (scroll) => {
    // console.log(scroll.target.scrollHeight);
    // console.log(scroll.target.scrollTop);
    // console.log(scroll.target.scrollWidth);
    // console.log(scroll.target.scrollLeft);
    // console.log(scroll.target.clientHeight);
    // console.log(
    //   scroll.target.scrollHeight - Math.round(scroll.target.scrollTop),
    //   scroll.target.clientHeight
    // );
    if (
      scroll.target.scrollHeight - Math.round(scroll.target.scrollTop) ===
      scroll.target.clientHeight
    ) {
      setOffset((prev) => prev + 20);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl text-[#6b7280] font-bold my-4">
        City Table
      </h1>

      <div
        className="relative overflow-hidden shadow-md rounded-lg max-h-[80vh] overflow-y-auto border"
        onScroll={onScrollEnd}
      >
        <table className="table-fixed w-full text-left">
          <thead
            className="uppercase bg-[#6b7280] text-[#e5e7eb]"
            // style="background-color: #6b7280; color: #e5e7eb;"
          >
            <tr>
              <td className="py-2 border text-center font-bold p-4">
                City Name
              </td>
              <td className="py-2 border text-center font-bold p-4">Country</td>
              <td className="py-2 border text-center font-bold p-4">
                TimeZone
              </td>
            </tr>
          </thead>
          <tbody
            className="bg-[#FFFFFF] text-[#6b7280]"
            // style="background-color: #FFFFFF; color: #6b7280;"
          >
            {data.length !== 0 &&
              data.map((city) => {
                return (
                  <tr
                    className="py-3"
                    key={`lat:${city.coordinates.lat},lon:${city.coordinates.lon}`}
                  >
                    <td className="py-3 border text-center  p-4">
                      <Link to={`/weather/${city.name}`}>{city.name}</Link>
                    </td>
                    <td className="py-3 border text-center  p-4">
                      {city.cou_name_en}
                    </td>
                    <td className="py-3 border text-center  p-4">
                      {city.timezone}
                    </td>
                  </tr>
                );
              })}
            {loading && (
              <div className="flex justify-center w-full flex-grow">
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;

import axios from "axios";

export default defineEventHandler(async (event) => {
  const pageName = getQuery(event)?.page;

  const fetchPage = await axios.get("https://wiki.ria.red/api.php", {
    params: {
      action: "parse",
      page: pageName,
      disableeditsection: true,
      format: "json",
      disabletoc: true,
    },
  });

  if (fetchPage.status === 200) {
    return fetchPage.data;
  } else {
    return {};
  }
});

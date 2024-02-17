export default defineEventHandler(async (event) => {
  const pageName = getQuery(event)?.page;

  const fetchPage = await $fetch("https://wiki.ria.red/api.php", {
    params: {
      action: "parse",
      page: pageName,
      disableeditsection: true,
      format: "json",
      disabletoc: true,
    },
  });

  if (fetchPage) {
    return fetchPage;
  } else {
    return {};
  }
});

<template>
  <NSpin :show="fetchPage.pending.value">
    <div v-if="fetchPage.pending.value">
      <FakeArticle />
    </div>
    <NEmpty v-else-if="empty"></NEmpty>
    <div v-else class="mediawiki-article">
      <h1 v-text="title"></h1>
      <article v-html="html"></article>
    </div>
  </NSpin>
</template>

<script lang="ts" setup>
import "~/assets/min.scss";
import { parseSrcset, stringifySrcset } from "srcset";

const props = defineProps({
  page: {
    type: String,
  },
});

const pageId = toRef(() => props.page);

watch(pageId, async (newPage) => {
  await buildPage();
});

const fetchPage = await useFetch("/api/parse", {
  query: {
    page: pageId,
  },
});

const empty = ref(false);

const html = ref("");
const title = ref("");

// const fetchPage = await useFetch("https://wiki.ria.red/api.php", {
//   query: {
//     action: "parse",
//     page: props.page,
//     disableeditsection: true,
//     format: "json",
//     disabletoc: true,
//   },
// });

async function buildPage() {
  empty.value = false;

  const data = fetchPage.data.value as APIReturn;

  if (data?.parse?.text["*"] === undefined) {
    empty.value = true;
  }

  html.value = domParser(data?.parse?.text["*"]);
  title.value = data?.parse?.title;
}

buildPage();

function updateRoute() {}

function domParser(domHTML: string) {
  const dom = new DOMParser().parseFromString(domHTML, "text/html");

  // 调整所有 a 标签
  dom.querySelectorAll("a").forEach((a) => {
    // 调整所有 a 标签为新标签页打开，且 no-referrer
    a.setAttribute("target", "_blank");
    a.setAttribute("referrerpolicy", "no-referrer");

    const href = a.getAttribute("href");
    if (href !== null) {
      // 如果链接是相对链接, 那么 URL 类会将其使用第二个参数为 base 进行合并
      const url = new URL(href, "https://wiki.ria.red");
      a.setAttribute("href", url.href);
    }
  });

  // 调整所有 img 标签
  dom.querySelectorAll("img").forEach((img) => {
    img.setAttribute("referrerpolicy", "no-referrer");

    const src = img.getAttribute("src");
    if (src !== null) {
      const url = new URL(src, "https://wiki.ria.red");
      img.setAttribute("src", url.href);
    }

    const srcSet = img.getAttribute("srcset");
    if (srcSet !== null) {
      const parsed = parseSrcset(srcSet);
      const newSet = [];

      for (let set of parsed) {
        const url = new URL(set.url, "https://wiki.ria.red").href;
        newSet.push({ ...set, url });
      }

      img.setAttribute("srcset", stringifySrcset(newSet));
    }
  });

  return dom.documentElement.outerHTML;
}

type APIReturn = {
  parse: {
    title: string;
    pageid: number;
    revid: number;
    text: {
      "*": string;
    };
    langlinks: Array<any>;
    categories: Array<{
      sortkey: string;
      "*": string;
    }>;
    links: Array<{
      ns: number;
      exists?: string;
      "*": string;
    }>;
    templates: Array<{
      ns: number;
      exists: string;
      "*": string;
    }>;
    images: Array<string>;
    externallinks: Array<string>;
    sections: Array<{
      toclevel: number;
      level: string;
      line: string;
      number: string;
      index: string;
      fromtitle: string;
      byteoffset: number;
      anchor: string;
    }>;
    showtoc: string;
    parsewarnings: Array<any>;
    displaytitle: string;
    iwlinks: Array<{
      prefix: string;
      url: string;
      "*": string;
    }>;
    properties: Array<any>;
  };
};
</script>

<style lang="scss">
.mediawiki-article {
  /**
    标题和普通正文
  */

  font-size: 16px;
  line-height: 28px;
  color: rgb(67, 60, 60);

  br {
    display: block; /* 让 <br> 元素变为块级元素 */
    margin-top: 0.25em; /* 设置上外边距为你想要的间距 */
    content: ""; /* 添加空内容，确保样式生效 */
  }

  hr {
    margin: 16px 0;
    border: none;
    border-top: 1px solid #ddd;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600 !important;
    padding-bottom: 0px !important;
    padding-top: 0px !important;
    color: rgb(67, 60, 60) !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  p {
    overflow-wrap: break-word;
  }

  p,
  summary {
    margin: 8px 0;
  }

  /* 正常情况下, h1 只是页首标题 */
  h1 {
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 28px;
    border-bottom: 0px !important;

    @media (min-width: 768px) {
      font-size: 32px;
    }
  }

  /* 主要标题 */
  h2 {
    margin: 48px 0 16px !important;
    padding-top: 24px !important;
    border-bottom: 0px !important;
    border-top: 1px solid #ddd !important;
    line-height: 32px !important;
    font-size: 24px !important;
    letter-spacing: -0.02em !important;
  }

  h3 {
    margin: 32px 0 0 !important;
    line-height: 28px !important;
    font-size: 20px !important;
    letter-spacing: -0.01em !important;
  }

  h4 {
    margin: 16px 0 0 !important;
    line-height: 24px !important;
    font-size: 16px !important;
  }

  /**
    链接
  */

  a {
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s, opacity 0.2s;
  }

  /**
    列表
  */

  ul,
  ol {
    padding-left: 1.25rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  li {
    ol,
    ul {
      margin: 8px 0 0;
    }
  }
  /**
    其他修复
  */

  .gallerybox {
    .thumb {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      border-radius: 4px;
      margin: 8px 0;
      padding: 4px;
    }
  }
}
</style>

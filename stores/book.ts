import { defineStore } from "pinia";
import type { MenuMixedOption } from "naive-ui/es/menu/src/interface";

export const useBookStore = defineStore({
  id: "bookStore",
  state: () => ({
    currentBookKey: "手册",
    currentArticleKey: "新人引导页",
    books: <Book[]>[
      {
        key: "了解RIA",
        label: "了解 RIA",
        articles: [
          {
            type: "group",
            label: "加入 RIA 之前",
            key: "加入 RIA 之前",
            children: [
              { label: "新人引导页", key: "新人引导页" },
              { label: "申请表审核规则", key: "申请表审核规则" },
              { label: "申请信审核规则", key: "申请信审核规则" },
              { label: "审核记录页", key: "审核记录页" },
              { label: "担保制度", key: "担保制度" },
            ],
          },
          {
            type: "group",
            label: "文化与世界",
            children: [
              { label: "共鸣系统", key: "共鸣系统" },
              { label: "经济系统", key: "经济系统" },
              { label: "零洲", key: "零洲" },
              { label: "奈落洲", key: "奈落洲" },
              { label: "后土洲", key: "后土洲" },
            ],
          },
          {
            type: "group",
            label: "制度与规定",
            children: [
              { label: "行为规范", key: "行为规范" },
              { label: "风纪规则", key: "风纪规则" },
              { label: "第三方软件使用引导", key: "第三方软件使用引导" },
              { label: "补偿制度", key: "补偿制度" },
            ],
          },
          {
            type: "group",
            label: "常见申请",
            children: [
              { label: "非自然死亡补偿申请", key: "补偿制度" },
              { label: "拆迁搬迁申请", key: "拆迁搬迁申请" },
              { label: "开锁破箱申请", key: "开锁破箱申请" },
              { label: "物品定制申请", key: "物品定制申请" },
              { label: "ID 修改申请", key: "ID修改申请" },
              { label: "担保入服申请", key: "担保制度" },
              { label: "WIKI 注册申请", key: "WIKI注册申请" },
              { label: "社团、同好会注册申请", key: "社团、同好会注册申请" },
              {
                label: "社团、同好会官号认证申请",
                key: "官号认证",
              },
            ],
          },
        ],
      },
    ],
  }),
  actions: {
    setCurrentBookKey(key: string) {
      this.currentBookKey = key;
    },
    setCurrentArticleKey(key: string) {
      this.currentArticleKey = key;
    },
  },
  getters: {
    currentBook: (state) => {
      for (let book of state.books) {
        if (book.key == state.currentBookKey) {
          return book;
        }
      }
    },
  },
});

type Book = {
  key: string;
  label: string;
  articles: MenuMixedOption[];
};

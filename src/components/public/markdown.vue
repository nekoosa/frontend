<template>
  <div class="md-wrap">
    <!-- 文章内容 -->
    <div class="md-content markdown github">
      <div v-html="content"></div>
    </div>
    <!-- 文章目录 -->
    <div class="md-menus"></div>
  </div>
</template>
<script>
  import "../../assets/css/markdown.css"
  import "../../assets/css/github.css"
  import content from '../markdown/网页桌面通知实现.md'
  export default {
    name: 'home',
    data() {
      return {
        content: ''
      }
    },
    created() {
      this.content = content
    },
    methods: {
      /**
       * 获取markdown目录下的文档列表
       * @return {[type]} [description]
       */
      getArticles() {}
    }
  }
</script>
<style scoped>
  .md-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .md-menus {
    width: 200px;
    background-color: #e5e5e5;
  }
  .md-content {
    flex-grow: 1;
    flex-basis: 0;
  }
</style>
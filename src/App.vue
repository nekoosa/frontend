<template>
  <div>
    <!-- 头部菜单 -->
    <div class="header-container">
      <h1 class="logo"></h1>
      <ul class="menu">
        <li class="menu-item active">资源</li>
      </ul>
    </div>
    
    <!-- 主题内容 -->
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import "./assets/theme/style.scss"
export default {
  name: 'app'
}
</script>
<style>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .2s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0);
    }
  }
</style>

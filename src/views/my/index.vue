<template>
  <div class="my-container">
    <div class="user-info">
      <van-cell-group v-if="user" class="my-info">
        <van-cell class="base-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            fit="cover"
            round
            :src="currentUser.photo"
          />
          <div class="name" slot="title">{{ currentUser.name }}</div>
          <van-button class="update-btn" size="small" round
            >编辑资料</van-button
          >
        </van-cell>
        <van-grid :border="false" class="data-info">
          <van-grid-item
            ><div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.art_count }}</div>
              <div class="text">头条</div>
            </div></van-grid-item
          >
          <van-grid-item
            ><div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.follow_count }}</div>
              <div class="text">关注</div>
            </div></van-grid-item
          >
          <van-grid-item
            ><div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.fans_count }}</div>
              <div class="text">粉丝</div>
            </div></van-grid-item
          >
          <van-grid-item
            ><div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.like_count }}</div>
              <div class="text">获赞</div>
            </div></van-grid-item
          >
        </van-grid>
      </van-cell-group>
      <!-- 未登录时显示这个 -->
      <div v-else class="not-login" @click="$router.push('/login')">
        <div class="nologinava">
          <span class="text">登录/注册</span>
        </div>
      </div>
      <van-grid class="nav-info" :column-num="2">
        <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
        <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
      </van-grid>
      <van-cell title="消息通知" is-link to="" />
      <van-cell title="小智同学" class="mb-4" is-link to="" />
      <van-cell
        title="退出登录"
        class="logout-cell"
        @click="onLogout"
        v-if="user"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      currentUser: ''
    }
  },
  created() {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser() {
      const { data } = await getUserInfo()
      this.currentUser = data.data
    },
    onLogout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出登录吗？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.my-info {
  background-color: #3296fa;
  .base-info {
    padding-top: 38px;
    padding-bottom: 11px;
    box-sizing: border-box;
    height: 115px;
    background-color: unset;
    .avatar {
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
      margin-right: 11px;
    }
    .name {
      font-size: 15px;
      color: #ffffff;
    }
    .update-btn {
      // width: 68px;
      height: 17px;
      border-radius: 8px;
      .van-button__content {
        font-size: 10px;
      }
    }
  }
  .data-info {
    height: 65px;
    .van-grid-item {
      color: #fff;

      .text-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 11px;
      }
    }
  }

  :deep(.van-grid-item__content) {
    background-color: unset;
  }
}
:deep(.nav-info) {
  margin-bottom: 4px;
  height: 71px;
  .toutiao {
    font-size: 23px;
  }
  .toutiao-shoucang {
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
  .van-grid-item {
    height: 71px;
  }
  .van-grid-item__text {
    font-size: 14px;
    color: #333;
  }
}
.logout-cell {
  text-align: center;
  color: #d86262;
}

.mb-4 {
  margin-bottom: 5px;
}
.not-login {
  background-color: #3296fa;
  height: 180px;
  display: flex;

  .nologinava {
    display: flex;
    margin: auto;
    align-items: center;
    width: 66px;
    height: 66px;
    background-color: #fff;
    border-radius: 66px;
    .text {
      align-items: center;
      font-size: 14px;
      margin: auto;
    }
  }
}
</style>

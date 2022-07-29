<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="登录/注册" left-arrow @click-left="$router.back()" />
    <!-- 输入表单 -->
    <van-form :show-error="false" :show-error-message="false" validate-first ref="login-form" @submit="onLogin" @failed="onFailed">
      <van-field v-model="user.mobile" name="mobile" icon-prefix="toutiao" left-icon="shouji" placeholder="请输入手机号" :rules="formRules.mobile" />
      <van-field v-model="user.code" name="code" clearable icon-prefix="toutiao" left-icon="yanzhengma" placeholder="请输入验证码" :rules="formRules.code">
        <template #button>
          <van-count-down :time="1000 * 3" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false" />
          <van-button size="small" round class="send-btn" @click.prevent="onSendSms" :loading="isSendSmsLoading" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 控制验证码倒计时
      isCountDownShow: false,
      // 点击发送按钮之后禁用按钮，防止重复发送
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止点击其他位置
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功！')

        // 将后端返回的用户登录状态token 状态放入vuex中
        this.$store.commit('setUser', data.data)
      } catch (error) {
        this.$toast.fail('登录失败，手机号或验证码错误！')
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms() {
      try {
        await this.$refs['login-form'].validate('mobile')
        //  验证通过，请求发送验证码,先禁用按钮
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        // console.log(res)

        // 发送成功后，显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        let message = ''
        // 发送短信失败的提示
        if (error && error.response && error.response.status === 429) {
          message = '发送过于频繁，请稍后重试！'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试！'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }

      this.isSendSmsLoading = false

      // 校验手机号
      // 验证通过->请求验证码-接受短信
      // 请求发送验证码-显示倒计时-倒计时结束，显示发送按钮
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 27px 14px;
    .login-btn {
      background-color: #6db4fb;
      border-radius: 5px;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
.send-btn {
  width: 78px;
  height: 23px;
  background-color: #ededed;
  border-radius: 12px;
  .van-button__text {
    font-size: 11px;
    color: #666;
  }
}
</style>

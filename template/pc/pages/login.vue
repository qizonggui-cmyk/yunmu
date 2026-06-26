<template>
  <div class="login">
    <div class="wrapper_1200">
      <div class="header acea-row row-between-wrapper" v-show="isShow">
        <div class="acea-row row-middle">
          <div class="icon" @click="goHome">
            <img :src="info.logoUrl" />
          </div>
          <div class="name" @click="goHome">云牧臻和</div>
        </div>
        <div class="acea-row row-middle">
          <div class="item">
            <span class="iconfont icon-pinzhongqiquan font-color"></span
            >高原甄选
          </div>
          <div class="item">
            <span class="iconfont icon-dijiachangxuan font-color"></span
            >绿色有机
          </div>
          <div class="item">
            <span class="iconfont icon-zhengpinhanghuo font-color"></span
            >源头直供
          </div>
        </div>
      </div>
    </div>
    <div class="loginBg min_wrapper_1200">
      <div class="brandPanel">
        <div class="eyebrow">YUNMU PREMIUM SELECTION</div>
        <h1>源自高原的绿色臻选</h1>
        <p>
          严选高原生态好物，坚持源头甄选、绿色健康、品质可溯，
          把天然好味道送到您的餐桌与礼赠场景。
        </p>
        <div class="brandTags acea-row row-middle">
          <span>高原生态</span>
          <span>绿色有机</span>
          <span>品质礼赠</span>
          <span>源头直供</span>
        </div>
      </div>
      <div class="wrapper" v-show="current === 1">
        <div class="title">
          快速登录/注册
          <span
            @click="ewmLogin"
            v-if="appidNum"
            class="iconfont icon-weixindenglu1"
          ></span>
        </div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input type="text" placeholder="请输入手机号" v-model="account" />
        </div>
        <div class="item verificat acea-row row-between-wrapper">
          <input type="text" placeholder="请输入验证码" v-model="captcha" />
          <button
            class="code font-color"
            :disabled="disabled"
            :class="disabled === true ? 'on' : ''"
            @click="getVerify"
          >
            {{ text }}
          </button>
        </div>
        <div class="isAgree">
          <el-checkbox v-model="agreement"></el-checkbox
          ><span class="agree"
            >我已阅读并同意<span class="agreement" @click="agreementTap(4)"
              >《用户协议》</span
            >和<span class="agreement" @click="agreementTap(3)"
              >《隐私协议》</span
            ></span
          >
        </div>
        <div class="signIn bg-color" @click="loginMobile">登录/注册</div>
        <div class="fastLogin font-color" @click="current = 2">账号登录</div>
        <div class="wechatLogin" v-if="appidNum" @click="ewmLogin">
          <span class="iconfont icon-weixin4"></span>
          微信扫码登录
        </div>
      </div>
      <div class="wrapper" v-show="current === 2">
        <div class="title">
          账号登录
          <span
            @click="ewmLogin"
            v-if="appidNum"
            class="iconfont icon-weixindenglu1"
          ></span>
        </div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input
            type="text"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="account"
          />
        </div>
        <div class="item pwd">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="isAgree">
          <el-checkbox v-model="agreement"></el-checkbox
          ><span class="agree"
            >我已阅读并同意<span class="agreement" @click="agreementTap(4)"
              >《用户协议》</span
            >和<span class="agreement" @click="agreementTap(3)"
              >《隐私协议》</span
            ></span
          >
        </div>
        <div class="signIn bg-color" @click="loginH5">登录</div>
        <div class="fastLogin font-color" @click="current = 1">
          快速登录/注册
        </div>
        <div class="wechatLogin" v-if="appidNum" @click="ewmLogin">
          <span class="iconfont icon-weixin4"></span>
          微信扫码登录
        </div>
      </div>
    </div>
    <div class="footer wrapper_1200">
      <div>
        <span v-if="info.contact_number">联系电话：{{ info.contact_number }}</span>
        <span class="line" v-if="info.contact_number && info.company_address">|</span>
        <span class="adress" v-if="info.company_address">地址：{{ info.company_address }}</span>
      </div>
      <div class="record">
        <span>2026-2028 云牧臻和</span>
        <span class="line" v-if="info.record_No">|</span>
        <span v-if="info.record_No">
          备案号：<a href="https://beian.miit.gov.cn/" target="_blank" class="num">{{
            info.record_No
          }}</a>
        </span>
      </div>
    </div>
    <el-dialog
      class="detail-bd"
      :title="agreementTitle"
      :visible.sync="userAgreement"
      :show-close="false"
      width="900px"
      center
    >
      <div class="userAgree" v-html="agreementCon"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreementClose">确 定</el-button>
      </span>
    </el-dialog>
    <Verify
      v-if="verifyModal"
      @success="success"
      captchaType="blockPuzzle"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    ></Verify>
  </div>
</template>

<script>
import sendVerifyCode from "@/mixins/SendVerifyCode";
import Verify from "@/components/verifition/Verify";

export default {
  name: "login",
  auth: false,
  mixins: [sendVerifyCode],
  components: { Verify },
  data() {
    return {
      verifyModal: false,
      current: 1,
      account: "",
      password: "",
      captcha: "",
      keyCode: "",
      info: "",
      isShow: true,
      appidNum: "",
      hosts: "",
      codes: "",
      fromPath: "",
      agreement: false,
      userAgreement: false,
      agreementCon1: "",
      agreementCon2: "",
      agreementCon: "",
      agreementTitle: ""
    };
  },
  async asyncData({ $axios, query }) {
    const keyCode = await $axios.$get("/verify_code");
    const companyInfo = await $axios.$get("/pc/get_company_info");
    const appidNum = await $axios.$get("/pc/get_appid");
    const agreement1 = await $axios.$get("/get_agreement/4");
    const agreement2 = await $axios.$get("/get_agreement/3");
    return {
      keyCode: keyCode.key,
      info: companyInfo,
      appidNum: appidNum.appid,
      codes: query.code || "",
      agreementCon1: agreement1.content,
      agreementCon2: agreement2.content
    };
  },
  fetch({ store }) {
    store.commit("isHeader", false);
    store.commit("isFooter", false);
  },
  head() {
    return {
      title: this.$store.state.titleCon
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
    this.hosts = location.origin + location.pathname;
    this.fromPath = this.$cookies.get("fromPath");
    if (this.codes) {
      this.loginCode();
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  methods: {
    keyDown(e) {
      if (e.keyCode === 13) {
        if (this.current === 1) {
          this.loginMobile();
        } else if (this.current === 2) {
          this.loginH5();
        }
      }
    },
    ewmLogin() {
      if (!this.appidNum) return this.$message.error("暂未配置微信扫码登录");
      if (!this.agreement) return this.$message.error("请确认阅读用户协议");
      let hosts = encodeURIComponent(this.hosts);
      window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${this.appidNum}&redirect_uri=${hosts}&response_type=code&scope=snsapi_login&state=EqMkUDWh8F3euWlt23jHJ8ZJuaTAVPZyiKEoq5U0`;
    },
    agreementTap(type) {
      if (type == 4) {
        this.agreementTitle = "用户协议";
        this.agreementCon = this.agreementCon1;
      } else {
        this.agreementTitle = "隐私协议";
        this.agreementCon = this.agreementCon2;
      }
      this.userAgreement = true;
    },
    agreementClose() {
      this.userAgreement = false;
      this.agreement = true;
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    async loginCode() {
      let that = this;
      await that.$auth
        .loginWith("local3", { params: { code: this.codes } })
        .then(() => {
          that.isShow = false;
          if (this.fromPath) {
            let path = this.fromPath.split(that.$router.history.base);
            let fromPath = path.join("");
            that.$router.push(fromPath);
          } else {
            that.$router.push("/");
          }
          that.$cookies.remove("fromPath");
        })
        .catch(err => {
          // that.$layer.msg('登录失败');
        });
    },
    async loginH5() {
      let that = this;
      if (!that.agreement) return that.$message.error("请确认阅读用户协议");
      if (!that.account) return that.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$message.error("请输入正确的手机号码");
      if (!that.password) return that.$message.error("请填写密码");
      let userInfo = {
        account: that.account,
        password: that.password
      };
      await that.$auth
        .loginWith("local1", { data: userInfo })
        .then(() => {
          that.isShow = false;
          if (this.fromPath) {
            let path = this.fromPath.split(that.$router.history.base);
            let fromPath = path.join("");
            that.$router.push(fromPath);
          } else {
            that.$router.push("/");
          }
          that.$cookies.remove("fromPath");
        })
        .catch(err => {
          that.$message.error(err);
        });
    },
    getVerify() {
      if (!this.account) return this.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.account))
        return this.$message.error("请输入正确的手机号码");
      if (!this.agreement) return this.$message.error("请确认阅读用户协议");
      this.verifyModal = true;
      this.$nextTick(e => {
        this.$refs.verify.show();
      });
    },
    success(params) {
      this.closeModel(params);
    },
    // 关闭模态框
    closeModel(params) {
      this.code(params);
    },
    async loginMobile() {
      let that = this;
      if (!that.agreement) return that.$message.error("请确认阅读用户协议");
      if (!that.account) return that.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$message.error("请输入正确的手机号码");
      if (!that.captcha) return that.$message.error("请填写验证码");
      if (!/^[\w\d]+$/i.test(that.captcha))
        return that.$message.error("请输入正确的验证码");
      let userInfo = {
        phone: that.account,
        captcha: that.captcha
      };
      await that.$auth
        .loginWith("local2", { data: userInfo })
        .then(() => {
          that.isShow = false;
          if (this.fromPath) {
            let path = this.fromPath.split(that.$router.history.base);
            let fromPath = path.join("");
            that.$router.push(fromPath);
          } else {
            that.$router.push("/");
          }
          that.$cookies.remove("fromPath");
        })
        .catch(err => {
          that.$message.error("验证码错误");
        });
    },
    async code(data) {
      let that = this;
      if (!that.agreement) return that.$message.error("请确认阅读用户协议");
      if (!that.account) return that.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$message.error("请输入正确的手机号码");
      await this.$axios
        .post("/register/verify", {
          phone: that.account,
          type: "mobile",
          key: that.keyCode,
          captchaType: "blockPuzzle",
          captchaVerification: data.captchaVerification
        })
        .then(res => {
          that.$message.success(res.msg);
          that.sendCode();
        })
        .catch(err => {
          that.$message.error(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
  .header {
    height: 110px;
    .icon {
      cursor: pointer;
      width: 112px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 30px;
      margin-left: 15px;
      cursor: pointer;
      color: #200e32;
      font-weight: 600;
      letter-spacing: 2px;
    }
    .item {
      margin-left: 40px;
      font-size: 16px;
      color: #3e6b4d;
      .iconfont {
        margin-right: 6px;
        font-size: 20px;
        color: #c8a35b !important;
      }
    }
  }
  .loginBg {
    width: 100%;
    height: 640px;
    background:
      radial-gradient(circle at 16% 18%, rgba(200, 163, 91, 0.12) 0, rgba(200, 163, 91, 0) 24%),
      radial-gradient(circle at 78% 76%, rgba(62, 107, 77, 0.1) 0, rgba(62, 107, 77, 0) 32%),
      linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(230, 220, 205, 0.7);
    border-bottom: 1px solid rgba(230, 220, 205, 0.7);
    &:before {
      content: "";
      position: absolute;
      left: -8%;
      bottom: -38%;
      width: 68%;
      height: 70%;
      background: rgba(15, 47, 40, 0.035);
      border-radius: 50% 50% 0 0;
      transform: rotate(6deg);
    }
    &:after {
      content: "";
      position: absolute;
      right: 8%;
      top: 56px;
      width: 360px;
      height: 360px;
      border: 1px solid rgba(200, 163, 91, 0.16);
      border-radius: 50%;
      box-shadow: 0 0 0 80px rgba(200, 163, 91, 0.025), 0 0 0 150px rgba(62, 107, 77, 0.025);
    }
    .brandPanel {
      position: absolute;
      left: 50%;
      top: 122px;
      width: 520px;
      margin-left: -590px;
      color: #200e32;
      z-index: 2;
      .eyebrow {
        display: inline-block;
        padding: 8px 14px;
        border: 1px solid rgba(200, 163, 91, 0.55);
        border-radius: 18px;
        color: #a9823b;
        font-size: 12px;
        letter-spacing: 2px;
        background: rgba(200, 163, 91, 0.06);
      }
      h1 {
        margin-top: 28px;
        font-size: 50px;
        line-height: 1.18;
        font-weight: 600;
        letter-spacing: 3px;
        color: #200e32;
      }
      p {
        width: 470px;
        margin-top: 22px;
        font-size: 17px;
        line-height: 1.9;
        color: #5c554e;
      }
      .brandTags {
        margin-top: 34px;
        span {
          margin-right: 12px;
          padding: 8px 15px;
          border-radius: 18px;
          background: rgba(62, 107, 77, 0.08);
          border: 1px solid rgba(62, 107, 77, 0.16);
          color: #3e6b4d;
          font-size: 13px;
        }
      }
    }
    .wrapper {
      width: 430px;
      min-height: 430px;
      background: #ffffff;
      border: 1px solid rgba(200, 163, 91, 0.22);
      border-radius: 22px;
      box-shadow: 0 24px 66px rgba(15, 47, 40, 0.12);
      position: absolute;
      top: 86px;
      right: 50%;
      margin-right: -590px;
      text-align: center;
      padding: 58px 0 46px;
      z-index: 3;
      .title {
        font-size: 22px;
        font-weight: 600;
        color: #200e32;
        position: relative;
        letter-spacing: 1px;
        .iconfont {
          position: absolute;
          top: -59px;
          right: 18px;
          font-size: 50px;
          color: #3e6b4d;
          cursor: pointer;
        }
      }
      .item {
        width: 342px;
        height: 50px;
        border: 1px solid #e6dccd;
        border-radius: 8px;
        margin: 0 auto;
        background: #fffdf8;
        transition: all 0.2s ease;
        &:focus-within {
          border-color: #c8a35b;
          box-shadow: 0 0 0 3px rgba(200, 163, 91, 0.12);
        }
        &.phone {
          margin-top: 34px;
          .number {
            width: 65px;
            height: 100%;
            line-height: 50px;
            color: #3e6b4d;
            border-right: 1px solid #e6dccd;
          }
          input {
            width: 275px;
          }
        }
        &.pwd {
          margin-top: 20px;
          input {
            width: 100%;
          }
        }
        &.verificat {
          margin-top: 20px;
          input {
            width: 230px;
          }
          .code {
            width: 110px;
            height: 100%;
            border: 0;
            background-color: transparent;
            border-left: 1px solid #e6dccd;
            color: #3e6b4d !important;
            &.on {
              color: #b9b2a8 !important;
            }
          }
        }
        input {
          padding-left: 15px;
          height: 100%;
          border: 0;
          outline: none;
          color: #241f1a;
          background: transparent;
        }
      }
      .signIn {
        width: 342px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        margin: 24px auto 0 auto;
        color: #fffaf2;
        cursor: pointer;
        border-radius: 8px;
        background: linear-gradient(135deg, #200e32, #3b1b56) !important;
        box-shadow: 0 12px 28px rgba(32, 14, 50, 0.24);
        letter-spacing: 2px;
      }
      .fastLogin {
        margin-top: 14px;
        cursor: pointer;
        color: #3e6b4d !important;
      }
      .wechatLogin {
        width: 342px;
        height: 44px;
        line-height: 44px;
        margin: 14px auto 0;
        border: 1px solid rgba(62, 107, 77, 0.28);
        border-radius: 8px;
        color: #3e6b4d;
        background: rgba(62, 107, 77, 0.05);
        cursor: pointer;
        transition: all 0.2s ease;
        .iconfont {
          margin-right: 6px;
          font-size: 17px;
          color: #3e6b4d;
        }
        &:hover {
          color: #fff;
          background: #3e6b4d;
          border-color: #3e6b4d;
          .iconfont {
            color: #fff;
          }
        }
      }
    }
  }
  .isAgree {
    width: 342px;
    margin: 12px auto 0 auto;
    text-align: left;
    .agree {
      margin-left: 6px;
      color: #7a7166;
      cursor: pointer;
      .agreement {
        color: #c8a35b;
      }
    }
  }
  .footer {
    text-align: center;
    font-size: 12px;
    color: #5c554e;
    margin-top: 42px;
    padding-bottom: 38px;
    .line {
      margin: 0 10px;
    }
    .adress {
      margin-left: 0;
    }
    .record {
      margin-top: 6px;
      .num {
        margin-left: 0;
        &:hover {
          color: #3e6b4d;
        }
      }
    }
  }
}
</style>

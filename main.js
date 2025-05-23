(function ($) {
  $.extend({
    silence: (options) => {
      var silence = new Silence();
      silence.init(options);
    },
  });
  class Silence {
    // 参数初始化
    constructor() {
      this.defaluts = {
        profile: {
          enable: false,
          avatar: null,
          favicon: null,
        },
        catalog: {
          enable: false,
          move: false,
          index: true,
          level1: "h1",
          level2: "h2",
          level3: "h3",
        },
        signature: {
          author: null,
          enable: false,
          home: "https://www.cnblogs.com",
          license: "CC BY 4.0",
          link: "https://creativecommons.org/licenses/by/4.0",
        },
        sponsor: {
          enable: true,
          paypal: null,
          // 修改处
          wechat:
            "https://i.mij.rip/2023/11/01/2367aa0957f868d417ead827d7cf92a9.png",
          alipay:
            "https://i.mji.rip/2023/11/01/9bb559d3c589d7182497010b13006c94.jpeg",
        },
        github: {
          enable: false,
          color: "#fff",
          fill: null,
          link: null,
        },
        topImg: {
          homeTopImg: ["https://s2.loli.net/2024/11/11/KYx9X1eUjaNFcCI.png"],
          notHomeTopImg: ["https://s2.loli.net/2024/11/11/KYx9X1eUjaNFcCI.png"],
        },
        topInfo: {
          title: "Here, I am.",
          text: "Life is bitter.",
          github: "https://github.com/OldSaltFish",
          weibo: "",
          telegram: "",
          music: "https://music.163.com/#/user/home?id=3811342727",
          twitter: "",
          zhihu: "",
          mail: "oldsaltfish233@outlook.com",
        },
      };
      this.version = "1.0.0";
    }

    get cnblogs() {
      return {
        header: "#header",
        blogTitle: "#blogTitle",
        publicProfile: "#profile_block",
        navigator: "#navigator",
        navList: "#navList",
        sideBar: "#sideBar",
        sideBarMain: "#sideBarMain",
        forFlow: ".forFlow",
        postTitle: "#cb_post_title_url",
        postDetail: "#post_detail",
        postBody: "#cnblogs_post_body",
        postDigg: "#div_digg",
        postCommentBody: ".blog_comment_body",
        feedbackContent: ".feedbackCon",
        postSignature: "#MySignature",
        footer: "#footer",
      };
    }

    get isPostPage() {
      return $(this.cnblogs.postDetail).length > 0;
    }

    /**
     * 初始化
     * @param {Object} options 全局配置选项
     */
    init(options) {
      if (options) {
        $.extend(true, this.defaluts, options);
      }
      this.buildCustomElements();
      this.buildCopyright();
      this.buildBloggerProfile();
      this.getMainMode();
      // this.buildToolbar();
      if (this.isPostPage) {
        this.postHeader();
        this.goIntoReadingMode();
        this.buildPostCatalog();
        this.buildPostCodeCopyBtns();
        this.buildPostSignature();
        this.buildPostFavoriteBtn();
        this.buildPostSponsor();
        this.buildPostCommentAvatars();
        this.setNotHomeTopImg();
      } else {
        this.mainHeader();
        this.goIntoNormalMode();
        this.homeImg();
        this.setHomeSuiBiList();
      }
      this.scrollDy();
    }

    /**
     * 消息弹窗
     * @param {String} content 消息内容
     */
    showMessage(content) {
      $("body").prepend(
        `<div class="esa-layer"><span class="esa-layer-content">${content}</span></div>`
      );
      let $layer = $(".esa-layer");
      $layer.fadeIn(200);
      setTimeout(() => {
        $layer.remove();
      }, 2000);
    }
    isMobileViewport() {
      return window.matchMedia("(max-width: 767px)").matches;
    }

    /**
     * 通用模式设置
     */
    getMainMode() {
      // $('.site-branding').hover(function () {
      //     $('.logolink .sakuraso').css({
      //         'background-color': '#FE9600',
      //         'color': '#fff'
      //     })
      //     $('.chinese-font').css('display', 'block')
      // }, function () {
      //     $('.logolink .sakuraso').css({
      //         'background-color': 'rgba(255,255,255,.5)',
      //         'color': '#464646'
      //     })
      //     $('.chinese-font').css('display', 'none')
      // });
      //<!--离开页面改变title-->
      var time;
      var normar_title = document.title;
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState == "hidden") {
          clearTimeout(time);
          document.title = "(* /ω＼*)";
        } else {
          document.title = "ヽ(✿ﾟ▽ﾟ)ノ";
          time = setTimeout(function () {
            document.title = normar_title;
          }, 2000);
        }
      });
    }

    /**
     * 进入阅读模式
     */
    goIntoReadingMode() {
      let $win = $(window);
      let _that = this;
      if ($win.width() > 767) {
        // $(_that.cnblogs.header).css('opacity', '1');
        $("#header #navList").css("margin-left", "0px");
        //修改文章布局
        $("#main").css({
          margin: "0 auto",
          padding: "0 10px",
          "min-width": "950px",
        });
      }
    }

    /**
     * 进入正常模式
     */
    goIntoNormalMode() {
      let $win = $(window);
      let _that = this;
      var oldScrollY = 0;
      if ($win.width() > 767) {
        $("#main").css({ "min-width": "800px" });
        //鼠标悬浮判断，如果页面不是位于顶部则head不消失
        // $(_that.cnblogs.header).hover(function () {
        //     $(_that.cnblogs.header).css('opacity', '1');
        //     $('#header #navList').css('margin-left', '0px');
        // }, function () {
        //     if ($(document).scrollTop() > 0) {
        //         $(_that.cnblogs.header).css('opacity', '1');
        //         $('#header #navList').css('margin-left', '0px');
        //     } else {
        //         $(_that.cnblogs.header).css('opacity', '0');
        //         $('#header #navList').css('margin-left', '100px');
        //     }
        // })
        //鼠标悬浮logo判断
        // $('.site-branding').hover(function () {
        //     $(_that.cnblogs.header).css('opacity', '1');
        //     $('#header #navList').css('margin-left', '0px');
        // }, function () {
        //     if ($(document).scrollTop() > 0) {
        //         $(_that.cnblogs.header).css('opacity', '1');
        //         $('#header #navList').css('margin-left', '0px');
        //     } else {
        //         $(_that.cnblogs.header).css('opacity', '0');
        //         $('#header #navList').css('margin-left', '100px');
        //     }
        // })
        //页面滚动判断
        // $win.scroll(function () {
        //     oldScrollY = this.scrollY;
        //     if (oldScrollY > 0) {
        //         $(_that.cnblogs.header).css('opacity', '1');
        //         $('#header #navList').css('margin-left', '0px');
        //     } else {
        //         $(_that.cnblogs.header).css('opacity', '0');
        //         $('#header #navList').css('margin-left', '100px');
        //     }
        // });
      }
    }

    /**
     * 构建自定义 DOM 元素
     */
    buildCustomElements() {
      //回到顶部特效

      $("body").prepend(
        `<a href="javascript:;" class="cd-top faa-float animated cd-fade-out"></a>`
      );
      $(".cd-top").click(function () {
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          1000
        ); // 1000代表1秒内滚动到顶部，你可以根据需求调整这个数值
      });
      let $win = $(window);
      let oldScrollY = 0;
      $win.scroll(function () {
        oldScrollY = window.scrollY;
        let height = window.innerHeight;
        if (oldScrollY > height / 4) {
          $(".cd-top").css("display", "inline");
        } else {
          $(".cd-top").css("display", "none");
        }
      });

      // 去除多余的导航项
      $("#navList >:not(:last-child)").remove();
      if (!this.isMobileViewport()) {
        $("#navList").append(
          '<li><a id="blog_nav_myyoulian" class="menu" href="http://alist.dreamsoul.cn"><i class="fa fa-hdd-o" aria-hidden="true"></i>网盘</a></li>',
          '<li><a id="blog_nav_myyoulian" class="menu" href="https://www.cnblogs.com/oldsaltfish/articles/17802186.html"><i class="fa fa-link" aria-hidden="true"></i>友链</a></li>',
          "<li><search-box></search-box></li>"
          // '<li><a id="blog_nav_myguanyu" class="menu" href="https://www.cnblogs.com/oldsaltfish/articles/17802192.html"><i class="fa fa-leaf" aria-hidden="true"></i>关于</a></li>'
        );
      }
      // 管理的图标
      $("#blog_nav_admin").prepend(
        '<i class="fa fa-list" aria-hidden="true"></i>'
      );
    }

    /**
     * 构建主题版权信息
     */
    buildCopyright() {
      //这里能保留么，算是我的一个小心愿。
      var content = `<div> Powered By <a href="https://www.cnblogs.com" target="_blank">Cnblogs</a> |
          Theme <a href="https://gitee.com/oldsaltfish/cnblogs-MyTheme" target="_blank">Theme modified</a></div>`;
      $(this.cnblogs.footer).append(content);
    }

    /**
     * 构建博客签名
     */
    buildPostSignature() {
      const config = this.defaluts.signature;
      if (config.enable) {
        const postUrl = $(this.cnblogs.postTitle).attr("href");
        const authorName =
          config.author || $(this.cnblogs.publicProfile).find("a:eq(0)").html();

        const content = `<div class="esa-post-signature">
                  <p>作者：<a href="${config.home}">${authorName}</a></p>
                  <p>出处：<a href="${postUrl}">${postUrl}</a></p>
                  <p>本站使用「<a href="${config.link}"  target="_blank">${config.license}</a>」创作共享协议，转载请在文章明显位置注明作者及出处。</p>
              </div>`;

        $(this.cnblogs.postSignature).html(content).show();
      }
    }

    /**
     * 构建评论者头像
     */
    buildPostCommentAvatars() {
      var builder = () => {
        $(this.cnblogs.postCommentBody).before(
          `<div class='esa-comment-avatar'><a target='_blank'><img /></a></div>`
        );
        let feedbackCon = $(this.cnblogs.feedbackContent);
        for (var i = 0; i < feedbackCon.length; i++) {
          let avatar = "https://pic.cnblogs.com/face/sample_face.gif";
          let span = $(feedbackCon[i]).find("span:last")[0];
          if (span) {
            avatar = $(span).html().replace("http://", "//");
          }
          $(feedbackCon[i]).find(".esa-comment-avatar img").attr("src", avatar);
          let href = $(feedbackCon[i])
            .parent()
            .find(".comment_date")
            .next()
            .attr("href");
          $(feedbackCon[i]).find(".esa-comment-avatar a").attr("href", href);
        }
      };
      if ($(this.cnblogs.postCommentBody).length) {
        builder();
      } else {
        let count = 1;
        // poll whether the feedbacks is loaded.
        let intervalId = setInterval(() => {
          if ($(this.cnblogs.postCommentBody).length) {
            clearInterval(intervalId);
            builder();
          }
          if (count == 10) {
            // no feedback.
            clearInterval(intervalId);
          }
          count++;
        }, 500);
      }
    }

    /**
     * 构建赞赏模块
     */
    buildPostSponsor() {
      const sponsor = this.defaluts.sponsor;
      const github = this.defaluts.github;
      const that = this;
      if (!sponsor.enable) {
        return;
      }

      $("#blog_post_info").prepend(`
          <div class="esa-sponsor">
              <a class="github" href="${
                github.enable
                  ? github.link
                  : "https://github.com/Kaiyuan/donate-page"
              }" target="_blank" class="posa tr3" title="Github"></a>
              <div class="text tr3">${sponsor.text || "Sponsor"}</div>
              <ul class="box posa tr3">
                  <li class="paypal">PayPal</li>
                  <li class="alipay">AliPay</li>
                  <li class="wechat">WeChat</li>
              </ul>
              <div id="QRBox" class="posa left-100">
                  <div id="MainBox"></div>
              </div>
          </div>`);

      const $sponsor = $(".esa-sponsor");
      const QRBox = $("#QRBox");
      const MainBox = $("#MainBox");

      function showQR(QR) {
        if (QR) {
          MainBox.css("background-image", "url(" + QR + ")");
        }
        $sponsor.find(".text, .box, .github").addClass("blur");
        QRBox.fadeIn(300, function () {
          MainBox.addClass("showQR");
        });
      }

      $sponsor.find(".box>li").click(function () {
        var type = $(this).attr("class");
        if (type === "paypal") {
          if (!sponsor.paypal) {
            return that.showMessage("博主忘记设置 PayPal 收款地址");
          }
          window.open(sponsor.paypal, "_blank");
        } else if (type === "alipay") {
          if (!sponsor.alipay) {
            return that.showMessage("博主忘记设置支付宝收款二维码");
          }
          showQR(sponsor.alipay);
        } else if (type === "wechat") {
          if (!sponsor.wechat) {
            return that.showMessage("博主忘记设置微信收款二维码");
          }
          showQR(sponsor.wechat);
        }
      });

      MainBox.click(function () {
        MainBox.removeClass("showQR").addClass("hideQR");
        setTimeout(function (a) {
          QRBox.fadeOut(300, function () {
            MainBox.removeClass("hideQR");
          });
          $sponsor.find(".text, .box, .github").removeClass("blur");
        }, 600);
      });
    }

    /**
     * 构建收藏按钮
     */
    buildPostFavoriteBtn() {
      let builder = () => {
        $(this.cnblogs.postDigg).prepend(
          `<div class="favorite" onclick="AddToWz(cb_entryId);return false;"><span class="favoritenum" id="favorite_count"></span></div>`
        );
      };

      if ($(this.cnblogs.postDigg).length) {
        builder();
      } else {
        let intervalId = setInterval(() => {
          if ($(this.cnblogs.postDigg).length) {
            clearInterval(intervalId);
            builder();
          }
        }, 200);
      }
    }

    /**
     * 构建博客目录，待优化，#cnblogs_post_body下找到h1、h2、h3做个目录，并使用#xxx跳转就行了
     */
    // 跳转
    buildPostCatalog() {
      const config = this.defaluts.catalog;
      if (!config.enable) return;

      let levels = [config.level1, config.level2, config.level3];
      let $headers = $(this.cnblogs.postBody).find(levels.join(","));
      if (!$headers.length || $headers.length < 2) {
        return;
      }

      let $catalog = $(
        `<div class="esa-catalog">
            <div class="esa-catalog-contents">
                <div class="esa-catalog-title">目录</div>
                <a class="esa-catalog-close">✕</a>
            </div>
        </div>`
      );

      let h1c = 0;
      let h2c = 0;
      let h3c = 0;

      let catalogContents = "<ul>";

      let cryptoObj = window.crypto || window.msCrypto; // for IE 11
      let eleIds = cryptoObj.getRandomValues(new Uint32Array($headers.length));

      $.each($headers, (index, header) => {
        const tagName = $(header)[0].tagName.toLowerCase();
        let titleIndex = "";
        let titleContent = $(header).html();
        // let regex = /(.*?)<button /g;
        let regex = /(.*?)<button/g;
        var list = regex.exec(titleContent);
        let title = list[1];
        if (!config.index) {
          switch (tagName) {
            case config.level1:
              titleContent = `<span class="level1">${titleContent}</span>`;
              break;
            case config.level2:
              titleContent = `<span class="level2">${titleContent}</span>`;
              break;
            case config.level3:
              titleContent = `<span class="level3">${titleContent}</span>`;
              break;
          }
        } else {
          if (tagName === config.level1) {
            h1c++;
            h2c = 0;
            h3c = 0;
            titleIndex = `<span class="level1">${h1c}. </span>`;
          } else if (tagName === config.level2) {
            h2c++;
            h3c = 0;
            titleIndex = `<span class="level2">${h1c}.${h2c}. </span>`;
          } else if (tagName === config.level3) {
            h3c++;
            titleIndex = `<span class="level3">${h1c}.${h2c}.${h3c}. </span>`;
          }
        }

        var idx = eleIds[index];

        catalogContents += `<li class="li_${tagName}" title="${title}">
                          <i class="${idx}" ></i><a class="esa-anchor-link">${
          titleIndex + titleContent
        }</a>
                      </li>`;

        $(header)
          .attr("id", `${idx}`)
          .html(
            `<span>${titleContent}</span><a href="#${idx}" class="esa-anchor">#</a>`
          )
          .hover(
            () => {
              $(header).find(".esa-anchor").css("opacity", 1);
            },
            () => {
              $(header).find(".esa-anchor").css("opacity", 0);
            }
          );
      });
      catalogContents += `</ul>`;

      $catalog.find(".esa-catalog-contents").append(catalogContents);
      let $phoneBottomMenu = $(
        `<input type="checkbox" id="toggle">
        <div class="bottom-menu">
          <div class="toggle">
              <label for="toggle"></label>
          </div>
          <div class="drawer">
            <div class="content"></div>
          </div>
        </div>`
      );
      $phoneBottomMenu.appendTo("body");

      let $phoneMenuContent = $(".bottom-menu .drawer .content");
      if ($phoneMenuContent.length) {
        $phoneMenuContent.append(catalogContents);
      }

      $catalog.appendTo("body");
      let $tabContent = $(".esa-catalog-contents");

      $tabContent.fadeIn();

      $(".esa-anchor-link").on("click", function () {
        let position =
          $("#" + $(this).prev("i").attr("class")).offset().top - 80;
        $("html, body").animate(
          {
            scrollTop: position,
          },
          300
        );
      });
      $(".esa-catalog-close").on("click", () => {
        $tabContent.hide();
      });
      // 关闭拖动，有bug改不好。
      // if (config.move) {
      //     // start表示鼠标已经按下，进入拖拽状态，pois表示当前相对坐标，原始位置为0，0
      //     let move = {
      //         start: false,
      //         pois: [0, 0],
      //     };
      //     $('.esa-catalog-title').on('mousedown', function (e) {
      //         e.preventDefault();
      //         move.start = true;
      //         let position = $('.esa-catalog').position();
      //         let poisX = e.clientX - parseFloat(position.left);
      //         let poisY = e.clientY - parseFloat(position.top);
      //         move.pois = [poisX, poisY];
      //     });
      //     $(document).on('mousemove', (e) => {
      //         if (move.start) {
      //             let offsetX = e.clientX - move.pois[0];
      //             let offsetY = e.clientY - move.pois[1];
      //             let fixed = $('.esa-catalog').css('position') === 'fixed';

      //             e.preventDefault();

      //             move.stX = fixed ? 0 : $(window).scrollLeft();
      //             move.stY = fixed ? 0 : $(window).scrollTop();

      //             let setRig = $(window).width() - $('.esa-catalog').outerWidth() + move.stX;
      //             let setBot = $(window).height() - $('.esa-catalog').outerHeight() + move.stY;
      //             // 防止拖动到视窗之外如果 视窗宽度-当前坐标>元素宽度，则说明已经越界，取较小值。
      //             offsetX < move.stX && (offsetX = move.stX);
      //             offsetX > setRig && (offsetX = setRig);
      //             offsetY < move.stY && (offsetY = move.stY);
      //             offsetY > setBot && (offsetY = setBot);

      //             $('.esa-catalog').css({
      //                 left: offsetX,
      //                 top: offsetY,
      //                 right: 'auto',
      //             });
      //         }
      //     }).on('mouseup', (_e) => {
      //         // 拖动结束
      //         if (move.start) {
      //             move.start = false;
      //         }
      //     });
      // }
    }

    /**
     * 构建代码复制按钮
     */
    buildPostCodeCopyBtns() {
      let $pres = $(".postBody .cnblogs-markdown").find("pre");

      if (!$pres.length) {
        return false;
      }

      $.each($pres, (index, pre) => {
        $(pre).find("code").attr("id", `copy_target_${index}`);
        $(pre).prepend(
          `<div class="esa-clipboard-button" data-clipboard-target="#copy_target_${index}" title="复制代码">Copy</div>`
        );
      });

      $.getScript(
        `https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js`,
        () => {
          let clipboard = new ClipboardJS(".esa-clipboard-button");
          clipboard.on("success", (e) => {
            this.showMessage("代码已复制到粘贴板中");
            e.clearSelection();
          });
          clipboard.on("error", (e) => {
            this.showMessage("代码复制失败");
          });
        }
      );
    }
    /**
     * 构建博主信息
     */

    buildBloggerProfile() {
      const config = this.defaluts.profile;

      if (!config.enable) {
        return;
      }

      if (!this.isPostPage && config.avatar) {
        $(this.cnblogs.sideBarMain).prepend(
          `<img class="esa-profile-avatar" src="${config.avatar}" />`
        );
      }

      if (config.favicon) {
        $("head").append(
          `<link rel="shortcut icon" href="${config.favicon}" type="image/x-icon" />`
        );
      }
      // <span class="logolink moe-mashiro">
      //博客logo
      // 可以使用this.defaluts.signature.author来代替名称，算了懒得搞
      var title = `
              <a class="site-branding" href="https://www.cnblogs.com/oldsaltfish/" alt="主页">魂祈梦</a>
          `;
      // Remove the original blogTitle
      $("#blogTitle").remove();
      if (this.isMobileViewport()) {
        $("#navList").remove();
        const myTopBar = $(`
          <div style="display:flex;padding: 12px 8px;float: right;">
            <unfold-menu></unfold-menu>
            <search-box></search-box>
          </div>
        `);
        $("#navigator").prepend(myTopBar);
      } else {
        $("#header").prepend(title);
      }
    }

    /**
     * 构建顶部滚动进度条 需要在页面dom元素构建成功之后再计算文档高度。
     */
    scrollDy() {
      let that = this;
      $("body").prepend(`<div class="scrollCls" id="scrollInfo"></div>`);
      // 可滚动的总高度
      var scrollTotal = this.getScrollHeight() - this.getWindowHeight();
      // 获取dom元素
      var scrollEl = document.getElementById("scrollInfo");
      $(window).scroll(function () {
        // 已经滚动距离
        var sHeight = that.getScrollTop();
        // 占比
        var bl = Math.min((sHeight / scrollTotal) * 100, 100);
        // 设置
        scrollEl.style.width = bl + "%";
      });
    }

    // 已经滚动距离
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }

    // 文档的总高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    }

    // 窗体高度
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }

    //=========================设置主页逻辑
    /**
     * 构建主页头部html
     * headertop 网格遮罩
     */
    //
    mainHeader() {
      const config = this.defaluts.topInfo;
      var header =
        `<div class="main-header">` +
        `</div>` +
        `<div class="focusinfo no-select">` +
        // data-text修改处
        `       <h1 class="center-text glitch is-glitching Ubuntu-font" data-text="${config.title}">${config.title}</h1>` +
        `       <div class="header-info"><p><i class="fa fa-quote-left"></i> ${config.text} <i class="fa fa-quote-right"></i></p>` +
        `           <div class="top-social_v2">` +
        `              <li id="bg-pre"><img class="flipx" src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808103709869-648245711.png"></li>` +
        `              <li><a href="${config.github}" target="_blank" class="social-github" title="github"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095618459-218538626.png"></a></li>` +
        `              <li><a href="${config.music}" target="_blank" class="social-wangyiyun" title="CloudMusic"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095640330-1209750721.png"></a></li>` +
        `              <li><a href="${config.mail}" target="_blank" class="social-wangyiyun" title="E-mail"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095613956-1350546638.png"></a></li>` +
        `              <li id="bg-next"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808103709869-648245711.png"></li>` +
        `           </div>` +
        `      </div>` +
        `</div>` +
        `<div class="wave">` +
        `   <div id="banner_wave_1"></div>` +
        `   <div id="banner_wave_2"></div>` +
        `</div>` +
        `<div class="scroll-down" data-offset="-45">` +
        `        <span class="hidden">Scroll Down</span>` +
        `        <i class="fa fa-chevron-down" aria-hidden="true"></i>` +
        `</div>`;
      $("#home").prepend(header);
    }

    /**
     * 构建主页头图
     */
    homeImg() {
      const config = this.defaluts.topImg;
      // 设置主页图片
      let homeTopImg = config.homeTopImg,
        bgImg;
      let index = this.randomNum(0, homeTopImg.length - 1);
      homeTopImg.length > 0
        ? homeTopImg.length > 1
          ? (bgImg = homeTopImg[index])
          : (bgImg = homeTopImg[0])
        : (bgImg = "");
      $(".main-header").css({
        "background-image": "url(" + bgImg + ")",
      });

      // 头图点击滚动到内容位置
      $(".scroll-down").click(function () {
        let endScroll;
        endScroll = $("#main").offset().top - 20;
        $("html,body").stop().animate({ scrollTop: endScroll }, 1000);
      });

      //切换首页壁纸
      $("#bg-pre").click(function () {
        index--;
        if (index < 0) {
          index = homeTopImg.length - 1;
        }
        let nextImg = homeTopImg[index];
        $(".main-header").css({
          "background-image": "url(" + nextImg + ")",
        });
      });
      $("#bg-next").click(function () {
        index++;
        if (index > homeTopImg.length - 1) {
          index = 0;
        }
        let preImg = homeTopImg[index];
        $(".main-header").css({
          "background-image": "url(" + preImg + ")",
        });
      });
    }

    /**
     * 构建首页随笔列表
     */
    setHomeSuiBiList() {
      let article_list = $(".day");
      let author = $(this.cnblogs.publicProfile).find("a:eq(0)").html(); //作者
      for (let i = article_list.length - 1; i >= 0; i--) {
        let time = $(".day")
          .find("div.dayTitle")
          [i].textContent.replace("年", "-")
          .replace("月", "-")
          .replace("日", ""); //获取年月日
        let PostTitles = $(article_list[i]).find(".postTitle");
        let readMores = $(article_list[i]).find("a.c_b_p_desc_readmore");
        let descs = $(article_list[i]).find(".postDesc");
        let infos = $(article_list[i]).find(".postCon");
        let contents = $(article_list[i]).find(".c_b_p_desc");
        for (let j = PostTitles.length - 1; j >= 0; j--) {
          let readMore = readMores[j].href;
          let postTitle = PostTitles[j].innerHTML;
          let desc = $(descs[j]).text();
          let readNum = desc.substring(
            desc.indexOf("(") + 1,
            desc.indexOf(")")
          );
          let comNum = desc.substring(
            desc.lastIndexOf("(") + 1,
            desc.lastIndexOf(")")
          );
          let edit = $(descs[j]).find("a")[0].href;
          let url = $(infos[j]).find("img")[0];
          let content = contents[j].textContent.replace("阅读全文", "");
          if (url != undefined) {
            url = url.src;
          } else {
            // 文章默认封面
            url = url =
              "https://blog-static.cnblogs.com/files/blogs/806667/cnblogPostBanner.gif";
          }
          let html =
            `<div class="post post-list-thumb post-list-show">` +
            `  <a class="post-thumb" href="${readMore}"> <img class="lazyload" src="${url}"  data-src="${url}"></a>` +
            //   `  <div class="post-content-wrap">` +
            `   <div class="post-content">` +
            `     <div class="post-date"> <i class="iconfont icon-time"></i>发布于 ${time}</div>` +
            `     <div class="post-title">${postTitle}</div>` +
            // 下面改个html关于页面
            `     <div class="post-meta"> <span><i class="iconfont icon-attention"></i>${readNum} 热度</span> <span class="comments-number"><i class="iconfont icon-mark"></i>${comNum} 条评论</span> <span><i class="iconfont icon-cc-user"></i><a href="https://www.cnblogs.com/zouwangblog/p/11157339.html"></a>${author}</span></div>` +
            `     <div class="float-content"><p>${content}</p>` +
            `        <div class="post-bottom">` +
            `           <a href="${readMore}" class="button-normal"><i class="iconfont icon-gengduo"></i></a>` +
            `           <a href="${edit}" class="button-normal"><i class="iconfont icon-bianji"></i></a>` +
            `        </div>` +
            `     </div>` +
            //   `  </div>` +
            ` </div>` +
            `</div>`;
          $(".forFlow").prepend(html);
        }
      }

      $(".post-list-thumb:odd").addClass("post-list-thumb-left");

      //构建notice
      const config = this.defaluts.profile;
      let notice = `<div class="notice"> <i class="iconfont icon-notification"></i><div class="notice-content">${config.notice}</div></div>`;
      $("#main").prepend(notice);
    }

    //=================阅读页逻辑
    /**
     * 构建阅读页头部html 如果是文章则只显示标题，如果是随笔则显示发布时间，头像，阅读量
     */
    postHeader() {
      var center =
        '<div class="pattern-center">' +
        ` <div class="pattern-attachment-img"><img src="${this.defaluts.topImg.notHomeTopImg[0]}" data-src=""` +
        '    style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;"></div>' +
        ' <header class="pattern-header "><h1 class="entry-title"></h1></header>' +
        "</div>";
      $("#home").prepend(center);
      const sbTitle = $("#cb_post_title_url").text();
      $(".entry-title").text(sbTitle); // 设置标题
      $(".postTitle").css("display", "none");
      let post_date = $("#post-date").text(); //发布时间
      let post_view_count = $("#post_view_count").text(); //阅读数
      if (window.location.href.indexOf("articles") === -1) {
        var header = `<p class="entry-census"><span><a href="https://www.cnblogs.com/oldsaltfish/"><img src="${this.defaluts.profile.avatar}"></a></span><span><a href="https://www.cnblogs.com/oldsaltfish/">Oldsaltfish</a></span><span class="bull">·</span>${post_date}<span class="bull">·</span>${post_view_count} 次阅读</p>`;
        $(".pattern-header").append(header);
        $(".pattern-center").addClass("single-center");
        $(".pattern-header").addClass("single-header");
      } else {
        return;
      }
    }

    /**
     * 构建非主页头图
     */
    setNotHomeTopImg = function () {
      const config = this.defaluts.topImg;
      // 设置主页图片
      let notHomeTopImg = config.notHomeTopImg,
        bgImg;

      notHomeTopImg.length > 0
        ? notHomeTopImg.length > 1
          ? (bgImg = notHomeTopImg[this.randomNum(0, notHomeTopImg.length - 1)])
          : (bgImg = notHomeTopImg[0])
        : (bgImg = "");
      $(".pattern-attachment-img img").attr("src", bgImg);
    };

    /**
     * 随机数
     */
    randomNum = function (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
        default:
          return 0;
      }
    };
  }
  $.silence({
    profile: {
      enable: true,
      avatar: "https://s2.loli.net/2024/11/11/DW7R35bAhwgULcd.jpg",
      favicon: "",
      notice: "大家早上中午晚上好呀，不好也可以，随便你。",
    },
    catalog: {
      enable: true,
      move: false,
      index: true,
      level1: "h2",
      level2: "h3",
      level3: "h4",
    },
    signature: {
      enable: true,
      home: "https://www.cnblogs.com/oldsaltfish/",
      license: "CC BY 4.0",
      link: "https://creativecommons.org/licenses/by/4.0",
    },
    sponsor: {
      enable: false,
      paypal: null,
      wechat:
        "https://i.mij.rip/2023/11/01/2367aa0957f868d417ead827d7cf92a9.png",
      alipay:
        "https://i.mji.rip/2023/11/01/9bb559d3c589d7182497010b13006c94.jpeg",
    },
    github: {
      enable: false,
      color: "#fff",
      fill: "#FF85B8",
      link: "https://github.com/OldSaltFish",
    },
    topImg: {
      homeTopImg: ["https://pic.imgdb.cn/item/67394f54d29ded1a8c39bcd5.webp"],
      notHomeTopImg: [
        "https://pic.imgdb.cn/item/67394f54d29ded1a8c39bcd5.webp",
      ],
    },
    topInfo: {
      title: "Here, I am.",
      text: "Life is bitter.",
      github: "https://github.com/OldSaltFish",
      weibo: "",
      telegram: "",
      music: "https://music.163.com/#/user/home?id=3811342727",
      twitter: "",
      zhihu: "",
      mail: "mailto:oldsaltfish233@outlook.com",
    },
  });
})(jQuery);

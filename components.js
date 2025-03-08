import { LitElement, html, css } from 'https://https://blog-static.cnblogs.com/files/blogs/806667/lit-core@3.min.js';
class SearchBox extends LitElement {
  static properties = {
    keywords: { type: String }
  };
  constructor() {
    super();
    this.keywords = '';
  }
  onSearch() {
    console.log('搜索关键词:', this.keywords);
    const link = document.createElement('a');
    link.href = `https://bing.com/search?q=${this.keywords}+site%3A+www.cnblogs.com%2Foldsaltfish`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  render() {
    return html`
          <div class="inputBox">
            <input required="" type="text" .value="${this.keywords}" @input="${(e) => {
        this.keywords = e.target.value;
      }
      }" @keydown="${(e) => e.key === 'Enter' && this.onSearch()}">
            <span>站内搜索</span>
          </div>
          <button class="btn" @click="${this.onSearch}">
            搜索
          </button>
        `;
  }



  static styles = css`
:host {
display: flex;
border: 1px solid #ee8456;
width: fit-content;
}

.inputBox {
position: relative;
}

.inputBox input {
padding: 15px 20px;
outline: none;
background: transparent;
border-radius: 5px;
/* color: #fff; */
border: none;
/* border: 1px solid#ee8456; */
font-size: 1em;
}

.inputBox span {
position: absolute;
left: 0;
padding: 15px 20px;
pointer-events: none;
font-size: 1em;
transition: 0.4s cubic-bezier(0.05, 0.81, 0, 0.93);
color: #ee8456;
letter-spacing: 0.1em;
}

.inputBox input:focus~span,
.inputBox input:valid~span {
font-size: 0.7em;
transform: translateX(14px) translateY(-7.5px);
padding: 0 5px;
border-radius: 2px;
background: #212121;
letter-spacing: 0em;
border: 1px solid #ee8456;
}

.btn {
display: inline-block;
font-family: sans-serif;
font-weight: 600;
font-size: 16px;
padding: 0.7rem auto;
border-radius: 8px;
border-style: none;
position: relative;
z-index: 1;
overflow: hidden;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
background-color: transparent;
/* box-shadow: 1px 1px 12px #000000; */
/* border: 1px solid #ee8456; */
}

.btn::before {
content: "";
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #fff;
transform: translateX(-101%);
transition: all .3s ease;
z-index: -1;
}

.btn:hover {
color: #272727;
transition: all .3s ease;
}

.btn:hover::before {
transform: translateX(0);
}
      `
}
customElements.define('search-box', SearchBox);

class UnfoldMenu extends LitElement {
  static properties = {
    keywords: { type: String }
  };
  constructor() {
    super();
    this.keywords = '';
  }
  render() {
    return html`
<input type="checkbox" id="menu-toggle" style="display: none;">
<div class="menu">
  <label for="menu-toggle" style="cursor: pointer;"></label>
  <a href="https://www.cnblogs.com/oldsaltfish/">主页</a>
</div>
<ul>
  <li><a class="menu" href="http://alist.dreamsoul.cn"><i class="fa fa-hdd-o" aria-hidden="true"></i>网盘</a></li>
  <li><a id="blog_nav_myyoulian" class="menu" href="https://www.cnblogs.com/oldsaltfish/articles/17802186.html"><i
        class="fa fa-link" aria-hidden="true"></i>友链</a></li>
</ul>
    `;
  }
  static styles = css`
body {
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
}
a {
text-decoration: none;
color: inherit;
}
.fa {
display: inline-block;
font: normal normal normal 14px/1 FontAwesome;
font-size: inherit;
text-rendering: auto;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
.fa-hdd-o:before {
content: "\\f0a0";
}
.fa-chain:before, .fa-link:before {
content: "\\f0c1";
}
:host {
display: grid;
position: relative;
width: 80px;
align-items: center;
}
:host label {
text-align: center;
}
:host label::before {
content: "\\f078";
font-family: FontAwesome;
display: inline-block;
margin-right: 5px;
}
:host #menu-toggle:checked + .menu label::before {
content: "\\f077";
/* Unicode for up arrow */
}
:host #menu-toggle:checked ~ ul {
height: 100px;
padding: 8px;
}
:host ul {
position: fixed;
display: flex;
z-index: 10;
box-sizing: border-box;
border-radius: 8px;
font-size: 24px;
height: 0;
width: 90vw;
top: 75px;
left: 50%;
transform: translateX(-50%);
overflow: hidden;
background-color: #f8f8f8;
transition: 0.5s ease-in-out;
}
:host ul li {
list-style-type: none;
}
  `
}
customElements.define('unfold-menu', UnfoldMenu);
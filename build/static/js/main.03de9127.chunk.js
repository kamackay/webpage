(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{210:function(e,t,a){e.exports=a(408)},215:function(e,t,a){},218:function(e,t,a){},394:function(e,t,a){},396:function(e,t,a){},406:function(e,t,a){},408:function(e,t,a){"use strict";a.r(t);var n,r=a(0),l=a(18),o=a(410),i=a(5),s=a(412),c=a(411),m=(a(215),a(59),a(218),a(57)),u=a(12),d=a(136),p=a.n(d),h=a(94),E=a.n(h),f=a(134),v=function(e){function t(t){var a=e.call(this,t)||this;return a.log=a.log.bind(a),a}return i.b(t,e),t.prototype.setState=function(t){e.prototype.setState.call(this,t),this.log=this.log.bind(this),this.state.title&&(document.title=this.state.title),this.state.faviconUrl&&this.setFavicon(this.state.faviconUrl)},t.prototype.setFavicon=function(e){var t=document.querySelector("link[rel*='icon']")||document.createElement("link");t.type="image/x-icon",t.rel="shortcut icon",t.href=e,document.getElementsByTagName("head")[0].appendChild(t)},t.prototype.updateState=function(t){e.prototype.setState.call(this,t)},t.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.log.apply(console,e)},t}(r.Component),g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.loadingElement=r.createElement("div",{className:"container loading",style:{backgroundColor:"transparent",textAlign:"center"}},r.createElement("span",{style:{backgroundColor:"transparent",width:"100px",paddingTop:"250px",height:"100px",display:"block",marginLeft:"auto",marginRight:"auto"}},r.createElement(f,{name:"ball-scale-multiple",fadeIn:"half"}))),t}return i.b(t,e),t.prototype.componentDidMount=function(){var e=this,t=this.setState.bind(this),a=this.onLoad.bind(this);window.addEventListener("load",function(){setTimeout(function(){t(i.a({},e.state,{loading:!1})),a()},e.getLoadTime())}),setTimeout(function(){t(i.a({},e.state,{loading:!1}))},1e4)},t.prototype.onLoad=function(){},t.prototype.render=function(){return this.state.loading?this.loadingElement:this.renderPostLoad()},t.prototype.getLoadTime=function(){return 500},t}(v),y={formBar:{paddingRight:5,paddingLeft:5}},b=function(e){function t(t){var a=e.call(this,t)||this;return a.state={faviconUrl:"images/d3.png",circleSize:10,loading:!0,running:!0,updateInterval:1e3/60,moveDelta:.02,keepPath:!1,optionsExpanded:!1},a.log=a.log.bind(a),a.pause=a.pause.bind(a),a.setState=a.setState.bind(a),a.stepTo=a.stepTo.bind(a),a.expandOptions=a.expandOptions.bind(a),a.speedChange=a.speedChange.bind(a),a.mouseMove=a.mouseMove.bind(a),setInterval(function(){a.state.running&&a.stepTo(a.state.lastClick)},a.state.updateInterval),a}return i.b(t,e),t.prototype.onLoad=function(){document.addEventListener("mousemove",this.mouseMove)},t.prototype.componentWillUnmount=function(){document.removeEventListener("mousemove",this.mouseMove)},t.prototype.renderPostLoad=function(){var e=this,t=this.state,a=t.currentLocation,n=t.keepPath,l=t.circleSize;return a&&(n||m.a("svg").selectAll("circle").remove(),m.a("svg").append("circle").attr("r",5).attr("cx",a.x-l/2).attr("cy",a.y-l/2).attr("r",l).attr("fill","red")),r.createElement("div",null,r.createElement("svg",{style:{width:"500vw",height:"500vh",cursor:"auto"}}),r.createElement(u.b,{style:{position:"fixed",right:10,bottom:10,cursor:"auto"}},r.createElement(u.d,{title:"Options"}),r.createElement(u.c,null,r.createElement(u.g,{onClick:this.expandOptions,"aria-expanded":this.state.optionsExpanded,"aria-label":"Show more"},r.createElement(p.a,null))),r.createElement(u.e,{in:this.state.optionsExpanded},r.createElement("form",{style:{}},r.createElement(u.a,{variant:"outlined",color:"secondary",style:y.formBar,onClick:this.clearPath},"Clear Path"),r.createElement(u.f,{style:y.formBar,control:r.createElement(u.i,{checked:this.state.keepPath,value:"keepPath",onClick:function(){return e.setState(i.a({},e.state,{keepPath:!e.state.keepPath}))}}),label:"Keep Path"}),r.createElement(u.j,{variant:"outlined",label:"Speed",value:1e3*this.state.moveDelta,style:i.a({},y.formBar,{maxWidth:80}),onChange:this.speedChange,type:"number",InputProps:{min:"0",max:"100",step:"1",style:{fontSize:15}},InputLabelProps:{shrink:!0,style:{fontSize:12}},margin:"normal"}),r.createElement(u.a,{variant:"contained",color:"primary",onClick:this.pause},this.state.running?"Pause":"Play")))))},t.prototype.getLoadTime=function(){return 1e3},t.prototype.speedChange=function(e){var t=e.target.value;this.setState(i.a({},this.state,{moveDelta:parseInt(t,10)/1e3}))},t.prototype.stepTo=function(e){var t=this;E.a.ofNullable(e).ifPresent(function(e){E.a.ofNullable(t.state.currentLocation).ifPresentOrElse(function(a){var n=[a.x-e.x,a.y-e.y],r=function(e){return Math.abs(e)<=1?e:e*t.state.moveDelta};t.setState(i.a({},t.state,{currentLocation:{x:a.x-r(n[0]),y:a.y-r(n[1])}}))},function(){t.setState(i.a({},t.state,{currentLocation:e}))})})},t.prototype.expandOptions=function(){this.setState(i.a({},this.state,{optionsExpanded:!this.state.optionsExpanded}))},t.prototype.pause=function(){this.setState(i.a({},this.state,{running:!this.state.running}))},t.prototype.clearPath=function(){m.a("svg").selectAll("circle").remove()},t.prototype.mouseMove=function(e){this.setState(i.a({},this.state,{lastClick:{x:e.pageX,y:e.pageY}}))},t}(g),N=a(409),w=(a(394),function(e){function t(t){var a=e.call(this,t)||this;return a.mounted=!1,a.state={loading:!0},a.setState=a.setState.bind(a),a}return i.b(t,e),t.prototype.onLoad=function(){var e=this;this.mounted=!0;this.fetchData(function(t){e.mounted&&e.setState(i.a({},e.state,{links:t})),e.log("LOAD")}.bind(this))},t.prototype.renderPostLoad=function(){var e=this.state.links;return e?r.createElement("div",{className:"App transparent",style:{borderRadius:15,margin:20}},r.createElement(u.k,{component:"h2",variant:"h1",gutterBottom:!0},"Welcome!"),r.createElement("hr",null),r.createElement(u.k,{component:"h2",variant:"h3",gutterBottom:!0},"Here are some of the projects available"),e.map(this.generateLink)):this.loadingElement},t.prototype.componentWillUnmount=function(){this.mounted=!1},t.prototype.getLoadTime=function(){return 1e3},t.prototype.generateLink=function(e){return r.createElement("div",{key:e.name,style:{textAlign:"center",display:"inline-block",float:"left",margin:10}},r.createElement(N.a,{to:e.url},r.createElement(u.b,{className:"card-link",style:{padding:15,maxWidth:400}},r.createElement(u.d,{title:e.name,subheader:e.subheader}),r.createElement("img",{style:{height:150},src:e.img,title:e.name+" Image"}))))},t.prototype.fetchData=function(e){var t=this.log.bind(this);$.ajax({url:"/homeData.json",dataType:"json",cache:!1,success:e,error:function(e,a,n){t(n),alert(n)}})},t}(g)),k=(a(396),function(e){function t(t){var a=e.call(this,t)||this;return a.state={loading:!0,value:"",rows:10,fontSize:20},a.change=a.change.bind(a),a.format=a.format.bind(a),a.resize=a.resize.bind(a),a.log=a.log.bind(a),a}return i.b(t,e),t.prototype.onLoad=function(){window.addEventListener("resize",this.resize),this.resize()},t.prototype.renderPostLoad=function(){var e=this;return r.createElement("div",{id:"page",className:"container"},r.createElement(u.k,{component:"h2",variant:"h1",gutterBottom:!0},"JSON Formatter"),r.createElement(u.b,null,r.createElement("textarea",{id:"jsonCode",value:this.state.value,onChange:this.change,style:{width:"100%",minHeight:"20vh",maxHeight:"80vh",fontSize:this.state.fontSize},rows:this.state.rows,placeholder:"Enter JSON here"}),r.createElement("div",{style:{margin:20}},this.getButton("Format",function(){return e.format(4)}),this.getButton("Minify",function(){return e.format(void 0)}))))},t.prototype.resize=function(){var e=Math.floor(window.innerHeight/this.state.fontSize*.5);this.log("Setting to "+e+" rows"),this.setState(i.a({},this.state,{rows:e}))},t.prototype.getButton=function(e,t){return r.createElement(u.a,{onClick:function(){return t()},type:"button",variant:"contained",color:"primary",style:{width:"50%"}},e)},t.prototype.format=function(e){var t=this.state.value;try{var a=JSON.parse(t);this.setState(i.a({},this.state,{value:JSON.stringify(a,void 0,e)}))}catch(n){this.log(n)}},t.prototype.change=function(e){this.setState(i.a({},this.state,{value:e.target.value}))},t}(g)),x=a(137),S=a(16),L=function(){return function(){}}(),C=function(e){function t(t){var a=e.call(this,t)||this;return a.props.data&&(a.state={name:a.props.data.name,profilePic:"images/"+a.props.data.image,bio:a.props.data.bio,address:{street:a.props.data.address.street,city:a.props.data.address.city,state:a.props.data.address.state,zip:a.props.data.address.zip},phone:a.props.data.phone,email:a.props.data.email,resumeDownload:a.props.data.resumeDownload}),a}return i.b(t,e),t.prototype.render=function(){var e=this.state,t=e.profilePic,a=e.bio,n=e.address,l=e.phone,o=e.resumeDownload,i=e.email;return r.createElement("div",null,r.createElement(S.Element,{name:"about"}),r.createElement("section",{id:"about"},r.createElement("div",{className:"row"},r.createElement("div",{className:"three columns"},r.createElement("img",{className:"profile-pic",src:t,alt:"Keith MacKay Profile Pic"})),r.createElement("div",{className:"nine columns main-col"},r.createElement("h2",null,"About Me"),r.createElement("p",{style:{fontSize:"12px"}},a),r.createElement("div",{className:"row"},r.createElement("div",{className:"columns contact-details"},r.createElement("h2",null,"Contact Details"),r.createElement("p",{className:"address"},r.createElement("span",null,name),r.createElement("br",null),r.createElement("span",null,n.street,r.createElement("br",null),n.city," ",n.state,","," ",n.zip),r.createElement("br",null),r.createElement("span",null,l),r.createElement("br",null),r.createElement("a",{href:"mailto:"+i},i))),r.createElement("div",{className:"columns download"},r.createElement("p",null,r.createElement("a",{href:o,className:"button"},r.createElement("i",{className:"fa fa-download"}),"Download Resume"))))))))},t}(v),P=a(138),M=a.n(P),O=function(e){function t(t){var a=e.call(this,t)||this;return a.state={snackbarOpen:!1,name:t.data.name,address:t.data.address,phone:t.data.phone,email:t.data.email,message:t.data.message},n=a.setState.bind(a),a}return i.b(t,e),t.prototype.render=function(){var e=this.state,t=e.name,a=e.message,n=e.address,l=e.phone,o=e.email;return r.createElement("div",null,r.createElement(S.Element,{name:"contact"}),r.createElement("section",{id:"contact"},r.createElement("div",{className:"row section-head"},r.createElement("div",{className:"two columns header-col"},r.createElement("h1",null,r.createElement("span",null,"Get In Touch!"))),r.createElement("div",{className:"ten columns"},r.createElement("p",{className:"lead"},a))),r.createElement("div",{className:"row"},r.createElement("div",{className:"eight columns"},r.createElement("form",{action:"",id:"contactForm",name:"contactForm"},r.createElement("fieldset",null,r.createElement("div",null,r.createElement("label",{htmlFor:"contactName"},"Name"," ",r.createElement("span",{className:"required"},"*")),r.createElement("input",{type:"text",defaultValue:"",size:35,id:"contactName",name:"contactName"})),r.createElement("div",null,r.createElement("label",{htmlFor:"contactEmail"},"Email"," ",r.createElement("span",{className:"required"},"*")),r.createElement("input",{type:"text",defaultValue:"",size:35,id:"contactEmail",name:"contactEmail"})),r.createElement("div",null,r.createElement("label",{htmlFor:"contactSubject"},"Subject"),r.createElement("input",{type:"text",defaultValue:"",size:35,id:"contactSubject",name:"contactSubject"})),r.createElement("div",null,r.createElement("label",{htmlFor:"contactMessage"},"Message"," ",r.createElement("span",{className:"required"},"*")),r.createElement("textarea",{cols:50,rows:15,id:"contactMessage",name:"contactMessage"})),r.createElement("div",null,r.createElement(u.a,{type:"button",variant:"contained",color:"primary",onClick:this.handleClick},"Submit"),r.createElement("span",{id:"image-loader"},r.createElement("img",{alt:"",src:"images/loader.gif"}))))),r.createElement("div",{id:"message-warning"}," Error boy"),r.createElement("div",{id:"message-success"},r.createElement("i",{className:"fa fa-check"}),"Your message was sent, thank you!",r.createElement("br",null))),r.createElement("aside",{className:"four columns footer-widgets"},r.createElement("div",{className:"widget widget_contact"},r.createElement("h4",null,"Address and Phone"),r.createElement("p",{className:"address"},t,r.createElement("br",null),n.street," ",r.createElement("br",null),n.city,", ",n.state," ",n.zip,r.createElement("br",null),r.createElement("span",null,l),r.createElement("br",null),r.createElement("a",{href:"mailto:"+o},o))),r.createElement("div",{className:"widget widget_tweets"},r.createElement("h4",{className:"widget-title"},"Latest Tweets"),r.createElement("ul",{id:"twitter"},r.createElement("li",null,r.createElement("span",null,"This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum",r.createElement("a",{href:"#"},"http://t.co/CGIrdxIlI3")),r.createElement("b",null,r.createElement("a",{href:"#"},"2 Days Ago"))),r.createElement("li",null,r.createElement("span",null,"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi",r.createElement("a",{href:"#"},"http://t.co/CGIrdxIlI3")),r.createElement("b",null,r.createElement("a",{href:"#"},"3 Days Ago"))))))),r.createElement(u.h,{anchorOrigin:{horizontal:"left",vertical:"bottom"},open:this.state.snackbarOpen,autoHideDuration:6e3,onClose:this.handleClose,ContentProps:{"aria-describedby":"message-id"},message:r.createElement("span",{id:"message-id"},"Feature not currently working"),action:[r.createElement(u.g,{key:"close","aria-label":"Close",color:"inherit",style:{},onClick:this.handleClose},r.createElement(M.a,null))]})))},t.prototype.handleClick=function(){n(i.a({},this.state,{snackbarOpen:!0}))},t.prototype.handleClose=function(e){n(i.a({},this.state,{snackbarOpen:!1}))},t}(v),T=function(e){function t(t){var a=e.call(this,t)||this;return a.state={social:t.data.social},a}return i.b(t,e),t.prototype.render=function(){var e=this.state.social.map(function(e){return r.createElement("li",{key:e.name},r.createElement("a",{href:e.url},r.createElement("i",{className:e.className})))});return r.createElement("footer",null,r.createElement("div",{className:"row"},r.createElement("div",{className:"twelve columns"},r.createElement("ul",{className:"social-links"},e),r.createElement("ul",{className:"copyright"},r.createElement("li",null,"Thanks to"," ",r.createElement("a",{href:"http://www.timbakerdev.com/"},"Tim Baker")," ","for the template to this webpage!"),r.createElement("li",null,"Design by"," ",r.createElement("a",{title:"Styleshout",href:"http://www.styleshout.com/"},"Styleshout")))),r.createElement("div",{id:"go-top"},r.createElement(S.Link,{className:"smoothscroll",title:"Back To Top",to:"home",smooth:!0,style:{cursor:"pointer"}},r.createElement("i",{className:"icon-up-open"})))))},t}(v),D=function(){function e(){}return e.getArticleFor=function(e){var t,a=/\w+/.exec(e);if(!a)return"an";var n=(t=a[0]).toLowerCase(),r=["honest","hour","hono"];for(var l in r)if(0===n.indexOf(r[l]))return"an";if(1===n.length)return"aedhilmnorsx".indexOf(n)>=0?"an":"a";if(t.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/))return"an";var o=[/^e[uw]/,/^onc?e\b/,/^uni([^nmd]|mo)/,/^u[bcfhjkqrst][aeiou]/];for(var l in o)if(n.match(o[l]))return"a";return t.match(/^U[NK][AIEO]/)?"a":t===t.toUpperCase()?"aedhilmnorsx".indexOf(n[0])>=0?"an":"a":"aeiou".indexOf(n[0])>=0?"an":n.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/)?"an":"a"},e}().getArticleFor,I=function(e){function t(t){var a=e.call(this,t)||this;return a.state={name:t.data.name,occupation:t.data.occupation,description:t.data.description,address:t.data.address,social:t.data.social},a}return i.b(t,e),t.prototype.render=function(){var e=this.state,t=e.name,a=e.occupation,n=e.description,l=e.address,o=e.social.map(function(e){return r.createElement("li",{key:e.name},r.createElement("a",{href:e.url},r.createElement("i",{className:e.className})))});return r.createElement("header",{id:"home"},r.createElement("nav",{id:"nav-wrap"},r.createElement("a",{className:"mobile-btn",href:"#nav-wrap",title:"Show navigation"},"Show navigation"),r.createElement("a",{className:"mobile-btn",href:"#home",title:"Hide navigation"},"Hide navigation"),r.createElement("ul",{id:"nav",className:"nav"},r.createElement("li",{className:"current"},r.createElement(S.Link,{className:"smoothscroll",to:"top",smooth:!0,style:{cursor:"pointer"}},"Home")),r.createElement("li",null,r.createElement(S.Link,{className:"smoothscroll",to:"about",smooth:!0,style:{cursor:"pointer"}},"About")),r.createElement("li",null,r.createElement(S.Link,{className:"smoothscroll",to:"resume",smooth:!0,style:{cursor:"pointer"}},"Resume")),r.createElement("li",null,r.createElement(S.Link,{className:"smoothscroll",to:"portfolio",smooth:!0,style:{cursor:"pointer"}},"Portfolio")),r.createElement("li",null,r.createElement(S.Link,{className:"smoothscroll",to:"testimonials",smooth:!0,style:{cursor:"pointer"}},"Testimonials")),r.createElement("li",null,r.createElement(S.Link,{className:"smoothscroll",to:"contact",smooth:!0,style:{cursor:"pointer"}},"Contact")))),r.createElement("div",{className:"row banner",style:{left:"100px",position:"absolute",top:"100px"}},r.createElement("div",{className:"banner-text header-cont-div"},r.createElement("h1",{className:"responsive-headline"},"I'm ",t,"."),r.createElement("h3",null,"I'm ",D(l.city)," ",l.city,","," ",l.state," based ",r.createElement("span",null,a),"."," ",n,"."),r.createElement("hr",null),r.createElement("ul",{className:"social"},o))),r.createElement("p",{className:"scrolldown"},r.createElement(S.Link,{className:"smoothscroll",to:"about",title:"Explore",smooth:!0,style:{cursor:"pointer"}},r.createElement("i",{className:"icon-down-circle"}))))},t}(v),z=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i.b(t,e),t.prototype.render=function(){return this.props.data&&(this.projectData=this.props.data.projects.map(function(e){var t="images/portfolio/"+e.image;return r.createElement("div",{key:e.title,className:"columns portfolio-item"},r.createElement("div",{className:"item-wrap"},r.createElement("a",{href:e.url,title:e.title},r.createElement("img",{alt:e.title,src:t}),r.createElement("div",{className:"overlay"},r.createElement("div",{className:"portfolio-item-meta"},r.createElement("h5",null,e.title),r.createElement("p",null,e.category))),r.createElement("div",{className:"link-icon"},r.createElement("i",{className:"fa fa-link"})))))})),r.createElement("div",null,r.createElement(S.Element,{name:"portfolio"}),r.createElement("section",{id:"portfolio"},r.createElement("div",{className:"row"},r.createElement("div",{className:"twelve columns collapsed"},r.createElement("h1",null,"Check Out Some of My Works."),r.createElement("div",{id:"portfolio-wrapper",className:"bgrid-quarters s-bgrid-thirds cf"},this.projectData)))))},t}(v),j=[{pct:0,color:{r:170,g:0,b:0}},{pct:.5,color:{r:255,g:255,b:0}},{pct:1,color:{r:0,g:255,b:0}}],A=function(e){function t(t){var a=e.call(this,t)||this;return a.state={skillMessage:t.data.skillMessage,education:t.data.education,work:t.data.work,skills:t.data.skills},a}return i.b(t,e),t.prototype.render=function(){var e=this,t=this.state,a=t.skillMessage,n=t.education,l=t.work,o=t.skills,i=n.map(function(e){return r.createElement("div",{key:e.school},r.createElement("h3",null,e.school),r.createElement("p",{className:"info"},e.degree," ",r.createElement("span",null,"\u2022"),r.createElement("em",{className:"date"},e.graduated)),r.createElement("p",null,e.description),r.createElement("p",null,e.classes?e.classes.map(function(e){return r.createElement("span",{key:"class-"+e},e)}).reduce(function(e,t){return null===e?[t]:[e," \u2022 ",t]},null):null))}),s=l.map(function(e){return r.createElement("div",{key:"company-"+e.company+Math.random()},r.createElement("span",null,r.createElement("h3",{style:{display:"inline-block"}},e.company),r.createElement("img",{src:e.img,style:{marginLeft:"25px",maxHeight:"50px"}})),r.createElement("p",{className:"info"},e.title,r.createElement("span",null,"\u2022")," ",r.createElement("em",{className:"date"},e.years)),r.createElement("p",null,e.description))}),c=o.map(function(t){var a="bar-expand "+t.name.toLowerCase();return r.createElement("li",{key:t.name},r.createElement("span",{style:{background:e.getColorForPercentage(t.level/100),display:"inline",width:t.level+"%"},className:a}),r.createElement("em",null,e.getSkillImage(t),"\xa0",t.name))});return r.createElement("div",null,r.createElement(S.Element,{name:"resume"}),r.createElement("section",{id:"resume"},r.createElement("div",{className:"row education"},r.createElement("div",{className:"three columns header-col"},r.createElement("h1",null,r.createElement("span",null,"Education"))),r.createElement("div",{className:"nine columns main-col"},r.createElement("div",{className:"row item"},r.createElement("div",{className:"twelve columns"},i)))),r.createElement("div",{className:"row work"},r.createElement("div",{className:"three columns header-col"},r.createElement("h1",null,r.createElement("span",null,"Work"))),r.createElement("div",{className:"nine columns main-col"},s)),r.createElement(S.Element,{name:"skills"}),r.createElement("div",{className:"row skill",id:"skillDiv"},r.createElement("div",{className:"skillWrapper"},r.createElement("div",{className:"three columns header-col"},r.createElement("h1",null,r.createElement("span",null,"Skills"))),r.createElement("div",{className:"nine columns main-col"},r.createElement("h4",null,a),r.createElement("div",{className:"bars"},r.createElement("ul",{className:"skills"},c))))),r.createElement(u.b,null,r.createElement("iframe",{id:"resumeiFrame",frameBorder:"0",style:{height:"1000px",width:"80%"},src:"https://docs.google.com/document/d/1ikNvJ2xforZmuJJPRIPLtuRBk7CnA9cbdq741Zb5KtA/pub?embedded=true"}))))},t.prototype.getSkillImage=function(e,t){void 0===t&&(t=25);var a=t+"px";return e.img?r.createElement("img",{style:{height:a,width:a},src:e.img}):null},t.prototype.getColorForPercentage=function(e){var t;for(t=1;t<j.length-1&&!(e<j[t].pct);t++);var a=j[t-1],n=j[t],r=n.pct-a.pct,l=(e-a.pct)/r,o=1-l,i=l,s={b:Math.floor(a.color.b*o+n.color.b*i),g:Math.floor(a.color.g*o+n.color.g*i),r:Math.floor(a.color.r*o+n.color.r*i)};return"rgba("+[s.r,s.g,s.b].join(",")+",.85)"},t}(v),F=function(e){function t(t){var a=e.call(this,t)||this;return a.state={testimonials:t.data.testimonials},a}return i.b(t,e),t.prototype.render=function(){var e=this.state.testimonials.map(function(e){return r.createElement("li",{key:e.user},r.createElement("blockquote",null,r.createElement("p",null,e.text),r.createElement("cite",null,e.user)))});return r.createElement("div",null,r.createElement(S.Element,{name:"testimonials"}),r.createElement("section",{id:"testimonials"},r.createElement("div",{className:"text-container"},r.createElement("div",{className:"row"},r.createElement("div",{className:"two columns header-col"},r.createElement("h1",null,r.createElement("span",null,"Client Testimonials"))),r.createElement("div",{className:"ten columns flex-container"},r.createElement("ul",{className:"slides testimonials-list"},e))))))},t}(v),B=function(e){function t(t){var a=e.call(this,t)||this;return a.state={faviconUrl:"images/resume.ico",title:"Keith MacKay - Resume",loading:!0,resumeData:new L},a.getResumeData(function(e){a.setState.bind(a)({resumeData:e}),setTimeout(function(){var e=window.location.href,t=e.substring(e.lastIndexOf("#")+1);if(t)try{S.scroller.scrollTo(t,{duration:1e3,delay:0,smooth:"easeInOutQuart"})}catch(a){}},100)}),a}return i.b(t,e),t.prototype.renderPostLoad=function(){var e=this.state.resumeData;return e?r.createElement("div",{className:"App"},r.createElement(S.Element,{name:"home"}),r.createElement(I,{data:e.main}),r.createElement(C,{data:e.main}),r.createElement(A,{data:e.resume}),r.createElement(z,{data:e.portfolio}),r.createElement(F,{data:e.testimonials}),r.createElement(O,{data:e.main}),r.createElement(T,{data:e.main})):this.loadingElement},t.prototype.getResumeData=function(e){x.ajax({url:"/resumeData.json",dataType:"json",cache:!1,success:e,error:function(e,t,a){console.log(a),alert(a)}})},t}(g),q=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i.b(t,e),t.prototype.render=function(){return r.createElement(s.a,null,r.createElement(function(){return r.createElement("div",{className:"transparent"},r.createElement(s.a,null,r.createElement(c.a,{exact:!0,path:"/",component:w}),r.createElement(c.a,{path:"/resume",component:B}),r.createElement(c.a,{path:"/json",component:k}),r.createElement(c.a,{path:"/d3",component:b})))},null))},t}(r.Component),R=(a(406),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function H(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}l.render(r.createElement(o.a,null,r.createElement(q,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="/service-worker.js";R?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):H(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):H(e)})}}()},59:function(e,t,a){}},[[210,2,1]]]);
//# sourceMappingURL=main.03de9127.chunk.js.map
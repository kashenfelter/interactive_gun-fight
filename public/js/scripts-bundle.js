function imgerror(t){t.style.display="none"}function sortCounts(t){var e=[];for(var n in t)e.push([n,t[n]]);return e.sort(function(t,e){return e[1]-t[1]}),e}function switchGunBills(t){console.log("--------------   In switchGunBills()  --------------"),$("#bill-list").empty();var e="data/gunBills"+t+".json",n=[];$(".head-year").text(t),$.getJSON(e).done(function(e){function a(t,e){return pct=e/t*100,pct>90?90:pct<1?1:Math.round(pct)}var r=0,s=[],o=[],i=[],l=[];$("#bill-list").html(""),$("#bill-groups").empty().html("<strong>View by groups:</strong><br/>"),$("#bill-tags").empty().html("<strong>View by tags:</strong><br/>"),$.each(e,function(e,a){var o=a.introduced.split("-");if("Native Americans"!=a["subjects-top-term"]&&"Animals"!=a["subjects-top-term"]&&"Agriculture and food"!=a["subjects-top-term"]&&"Economics and public finance"!=a["subjects-top-term"]&&"Education"!=a["subjects-top-term"]&&"Energy"!=a["subjects-top-term"]&&"Labor and employment"!=a["subjects-top-term"]&&"Private legislation"!=a["subjects-top-term"]&&"Water resources development"!=a["subjects-top-term"]&&parseInt(o[0])===parseInt(t)){r++,s.push(a.status);var c=Date.parse(a.introduced),u="";u+="<div data-date='"+c+"'data-tag='"+a["subjects-top-term"]+"' data-groups='"+a.lobbied+"' class='bill'>",billNumberArray=a.number.split("-"),u+="     <span class='bill-header bill-number'>"+billNumberArray[0].toUpperCase()+"</span>",u+="     <span class='bill-tag'>"+a["subjects-top-term"]+"</span>",n.push(a["subjects-top-term"]),u+=a["short-title"]?"     <p class='bill-name'>"+a["short-title"]+"</p>":"     <p class='bill-name'>"+a.title+"</p>",u+="null"!=a.purpose?"<p class='bill-purpose'>"+a.purpose+"</p>":"<p class='bill-purpose'>No purpose specified</p>",u+="     <span class='bill-date'><strong>Introduced: </strong>"+monthNames[parseInt(o[1])-1]+" "+o[2]+", "+o[0]+"</span>";var o=a["status-at"].split("-");if(u+="     <span class='bill-date'><strong>Most recent update: </strong>"+monthNames[parseInt(o[1])-1]+" "+o[2]+", "+o[0]+"</span>",u+=a.status.length>0?"     <span class='bill-status'><strong>Status: </strong>"+a.status.join(" => ")+"</span>":"     <span class='bill-status'><strong>Status: </strong>Not listed</span>",$.each(a.lobbied,function(t,e){i.push(e),l.push(e)}),u+="     <span class='sponsor-lobbied'><strong>Lobbied by: </strong> "+a.lobbied.join(", ")+"</span>",u+="<a class='bill-link' href='https://www.govtrack.us/congress/bills/"+billNumberArray[1]+"/"+billNumberArray[0]+"/text' target='_blank'>Read the bill</a>",a.sponsor.name){var d=a.sponsor.name.split(",");u+="     <div class='bill-sponsor'>",u+="     <strong>Sponsor</strong>",u+="          <span class='sponsor-name'>"+d[1]+" "+d[0]+" ["+a.sponsor.state+"]</span>",u+="     </div>"}u+="</div>",$("#bill-list").append(u)}}),$divs=$(".bill");var c=$divs.sort(function(t,e){return $(t).attr("data-date")-$(e).attr("data-date")});$("#bill-list").html(c);var u=_.countBy(n),d=[];$.each(u,function(t,e){d.push(t)}),d.sort(),$.each(d,function(t,e){$("#bill-tags").append("<span class='tag' data-tag='"+e+"'>"+e+"</span>")});var g=_.countBy(l),p=[];$.each(g,function(t,e){p.push(t)}),p.sort(),$.each(p,function(t,e){$("#bill-groups").append("<span class='tag' data-group='"+e+"'>"+e+"</span>")}),$(".tag").click(function(){if($(this).data("tag")){var t=$(this).data("tag");$(this).toggleClass("selected-tag"),$(".bill").hide(),$("#bill-list").find("[data-tag='"+t+"']").toggleClass("selected-tag"),$(".selected-tag").show()}if($(this).data("party")){var t=$(this).data("party");$(this).toggleClass("selected-tag"),$(".bill").hide(),$("#bill-list").find("[data-party='"+t+"']").toggleClass("selected-tag"),$(".selected-tag").show()}if($(this).data("group")){var t=$(this).data("group");$(this).toggleClass("selected-tag"),$(".bill").hide(),$("#bill-list").find("[data-groups*='"+t+"']").toggleClass("selected-tag"),$(".selected-tag").show()}}),statusCounts=_.countBy(s),lobbiedCounts=_.countBy(i),sponsorCounts=_.countBy(o,function(t){return t.last_name}),statusCounts=sortCounts(statusCounts),lobbiedCounts=sortCounts(lobbiedCounts),sponsorCounts=sortCounts(sponsorCounts),$(".byOrg").empty().html("<h3>Organizations and the number of bills they lobbied in "+t+"</h3>");var h=lobbiedCounts[0][1];$.each(lobbiedCounts,function(t,e){var n;html="<div class='list-element'>",n=$.inArray(e[0],gunControlGroups)>=0?"gc":"gr",html+="     <span class='list-item'>"+e[0]+"</span>",html+="     <div class='bar-container'>",html+="          <div class='list-bar "+n+"' style='width:"+a(h,e[1])+"%'>&nbsp;</div><div class='bar-number'>"+e[1]+"</div>",html+="     </div>",html+="</div>",$(".byOrg").append(html)}),$(".byStatus").empty().html("<h3>Status breakdown of gun-related legislation introduced in "+t+"</h3>");var f=statusCounts[0][1];$.each(statusCounts,function(t,e){html="<div class='list-element'>";var n=e[0].split(",");1===n.length?html+="     <span class='list-item'>Introduced</span>":html+="     <span class='list-item'>"+n.join(" => ")+"</span>",html+="     <div class='bar-container'>",html+="          <div class='list-bar' style='width:"+a(f,e[1])+"%;background:#BF531B'>&nbsp;</div><div class='bar-number'>"+e[1]+"</div>",html+="     </div>",html+="</div>",$(".byStatus").append(html)})})}function buildOrgChart(t){console.log("--------------   In buildOrgChart()  --------------");var e={left:50,right:50,top:40,bottom:40},n=$("#orgChart").width(),a=500,t=d3.csvParse(t),r=d3.max(t,function(t){return parseInt(t["Violence Policy Center"])}),s=d3.min(t,function(t){return parseInt(t.year)}),o=d3.max(t,function(t){return parseInt(t.year)}),i=d3.scaleLinear().domain([s,o]).range([0,n]),l=d3.scaleLinear().domain([0,r]).range([a,0]),c=d3.axisBottom(i).tickFormat(d3.format("")),u=d3.axisLeft(l).tickFormat(d3.format(".2s")),d=d3.select("#orgChart").append("svg").attr("height",a+e.bottom).attr("width",n),g=d.append("g").attr("transform","translate("+e.left+",10)");g.append("g").attr("class","x axis").attr("transform","translate(0,"+a+")").call(c),g.append("g").attr("class","y axis").call(u);var p=t.columns.slice(1).map(function(e){return t.map(function(t){return{key:e,year:t.year,value:t[e]}})}),h=g.selectAll(".serie").data(p).enter().append("g").attr("class","serie");h.append("path").attr("class","line").style("stroke",function(t){return t[0].key}).attr("d",d3.line().x(function(t){return l(t.year)}).y(function(t){return l(t.value)}));var f=d3.line().defined(function(t){if(t.value>0)return t}).y(function(t){return l(t.value)}).x(function(t){return i(t.year)});g.append("path").attr("d",f(t)),g.selectAll(".dot").data(t.filter(function(t){if(t["Violence Policy Center"]>0)return t})).enter().append("circle").attr("class","dot").attr("cx",f.x()).attr("cy",f.y()).attr("r",7)}function swapContent(t){console.log("--------------   In swapContent() with "+t+" --------------"),"gc"===t?(console.log("side = "+t),$(".gr-back").removeClass("gr-back").addClass("gc-back"),$(".gr-dark").removeClass("gr-dark").addClass("gc-dark"),$("#hero-border.gr").removeClass("gr").addClass("gc"),$("#gr-intro").fadeOut("fast",function(){$("#gc-intro").fadeIn()}),$("#total-chart .intro").text(total_gc_content),$("#year-chart .intro").text(annual_gc_content),$("#tree-chart .intro").text(tree_gc_content),$("#bill-breakdown .intro").text(legislation_gc_content),$("#hero-gr").fadeOut(),$("#hero-gc").fadeIn(),fbHead="Losing the battle for guns",storyURL=gcUrl,fbURL=fbgcUrl,leadText="Another mass shooting, another futile attempt at out-flanking the gun lobby.",storyTitle=shareTitle=gcTwitter,storyIMG="http://interactives.dallasnews.com/2016/gun-fight/images/_gcShare.jpg"):(console.log("side = "+t),$(".gc-back").removeClass("gc-back").addClass("gr-back"),$(".gc-dark").removeClass("gc-dark").addClass("gr-dark"),$("#hero-border.gc").removeClass("gc").addClass("gr"),$("#gc-intro").fadeOut("fast",function(){$("#gr-intro").fadeIn()}),$("#total-chart .intro").text(total_gr_content),$("#year-chart .intro").text(annual_gr_content),$("#tree-chart .intro").text(tree_gr_content),$("#bill-breakdown .intro").text(legislation_gr_content),$("#hero-gc").fadeOut(),$("#hero-gr").fadeIn(),fbHead="Lobbyists defending the Second Amendment",storyURL=grUrl,fbURL=fbgrUrl,leadText="Every year the gun lobby spends millions fending off assaults on the Constitution.",storyTitle=shareTitle=grTwitter,storyIMG="http://interactives.dallasnews.com/2016/gun-fight/images/_grShare.jpg"),$("#totalChart .intro").text(["total_"+t+"_content"])}function buildTotalsChart(t,e){console.log("--------------   In buildTotalsChart()  --------------");var n=t+e,a=Math.round(e/n*100);$("#totals-gr-amount").html("$"+d3.format(".2s")(e)),$("#totals-gc-amount").html("$"+d3.format(".2s")(t)),$("#grBar").css("width",a+"%"),$("#gcBar").css("width",100-a+"%")}function buildTreeChart(t){function e(t){$("#treeChart").empty(),d3.select("#treeChart").selectAll(".node").data(t.leaves()).enter().append("div").attr("class","node").attr("group",function(t){var e=t.id,n=e.split(/\r?\n|\r/),a=n[0].substring(n[0].lastIndexOf(".")+1);return a}).attr("expenditure",function(t){return t.value}).style("left",function(t){return t.x0+"px"}).style("top",function(t){return t.y0+"px"}).style("width",function(t){return t.x1-t.x0+"px"}).style("height",function(t){return t.y1-t.y0+"px"}).style("background",function(t){var e=t.id.split(".");return"gr"===e[2]?s[1]:s[0]}).on("mouseover",function(t){console.log("mouseover");var e="<span class='callout-label'>"+$(this).attr("group")+"</span>";e+="$"+o($(this).attr("expenditure")),$(".callout-treemap").html(e),$(".callout-treemap").show(),$(window).width()>=1e3&&$(".callout-treemap-mobile").hide()}).on("mouseout",function(){console.log("mouseout")}).append("div").attr("class","node-label").text(function(t){var e=t.x1-t.x0,n=t.y1-t.y0;if(e>=80&&n>=80)return t.id.substring(t.id.lastIndexOf(".")+1).split(/(?=[A-Z][^A-Z])/g).join("\n")}).append("div").attr("class","node-value").text(function(t){var e=t.x1-t.x0,n=t.y1-t.y0;if(e>=80&&n>=80)return"$"+o(t.value)})}function n(n){console.log("switchData("+n+")");var a=d3.csvParse(t,function(t){var e=t.id.split(".");if(e[1]===n.toString()||1==e.length)return{id:t.id,value:+t.value}});console.log(a);var r=i(a).sum(function(t){return t.value}).sort(function(t,e){return e.height-t.height||e.value-t.value});console.log(r),l(r),e(r)}d3.select("body").append("div").attr("class","tooltip").style("opacity",0);console.log("--------------   In buildTreeChart()  --------------");var a=$("#treeChart").width(),r=500,s=["#88C5F2","#E3C357"],o=d3.format(",.0f"),i=(d3.scaleOrdinal().domain(["gc","gr"]).range(s),d3.stratify().parentId(function(t){return t.id.substring(0,t.id.lastIndexOf("."))})),l=d3.treemap().size([a,r]).padding(1).round(!0),c=d3.csvParse(t,function(t){var e=t.id.split(".");if(e[1]===currentYear||1==e.length)return{id:t.id,value:+t.value}}),u=i(c).sum(function(t){return t.value}).sort(function(t,e){return e.height-t.height||e.value-t.value});l(u),e(u),switchGunBills(currentYear),$(".drop-menu li").click(function(){currentYear=$(this).data("selectedyear"),n(currentYear),switchGunBills(currentYear),console.log(currentYear),$(".pulldown").text(currentYear)})}function buildYearChart(t){console.log("--------------   In buildYearChart()  --------------");var e=$("#yearChart").width(),n=500,a=["#88C5F2","#E3C357"],r=d3.select("#yearChart").append("svg").attr("width",e).attr("height",n),s={top:5,right:0,bottom:17,left:25};e=e-s.left-s.right,n=n-s.top-s.bottom,group=r.append("g").attr("transform","translate("+s.left+","+s.top+")");var o=d3.scaleBand().rangeRound([0,e]).padding(.1).align(.1);o.domain(t.map(function(t){return t.Year}));var i=d3.scaleLinear().rangeRound([n,0]);i.domain([0,d3.max(t,function(t){return t.total})]).nice();var l=d3.scaleOrdinal().range([a[0],a[1]]);l.domain(["Gun Control","Gun Rights"]);var c=d3.stack(),u=["Gun Control","Gun Rights"];group.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+n+")").call(d3.axisBottom(o)),group.append("g").attr("class","axis axis--y").call(d3.axisLeft(i).ticks(10,"s").tickSize(e*-1)).append("text").attr("x",2).attr("y",i(i.ticks(10).pop())).attr("dy","0.35em"),group.selectAll(".serie").data(c.keys(u)(t)).enter().append("g").attr("class","serie").attr("fill",function(t){return l(t.key)}).selectAll("rect").data(function(t){return t}).enter().append("rect").attr("x",function(t){return o(t.data.Year)}).attr("y",function(t){return i(t[1])}).attr("height",function(t){return i(t[0])-i(t[1])}).attr("width",o.bandwidth());var d=$("#hero-gc").width();if(d<500){var g=d3.selectAll(".tick text");g.attr("class",function(t,e){e%2!=0&&d3.select(this).remove()})}var p=group.selectAll(".legend").data(u.reverse()).enter().append("g").attr("class","legend").attr("transform",function(t,e){return"translate(0,"+20*e+")"}).style("font","10px sans-serif");p.append("rect").attr("x",10).attr("y",8).attr("width",18).attr("height",18).attr("fill",l),p.append("text").attr("x",35).attr("y",16).attr("dy",".35em").attr("text-anchor","start").text(function(t){return t})}$(window).load(function(){$("body").dnLoader("remove")}),$(document).ready(function(){$.urlParam=function(t){var e=new RegExp("[?&]"+t+"=([^&#]*)").exec(window.location.href);return e?e[1]||0:"gc"};var t=$.urlParam("side");console.log(t),swapContent(t);var e=$("#hero-gc").height();$("#hero").height(e),$(window).resize(function(){e=$("#hero-gc").height(),$("#hero").height(e)}),$(window).on("scroll",function(){var t=$(this).scrollTop(),e=$(".intro-box").offset().top;e-100<t?$(".fixed-buttons-bar").fadeIn():$(".fixed-buttons-bar").hide()});var n=2e3,a=2017,r={},s={},o=[],l=[];for(i=n;i<=a;i++)$(".drop-menu").append("<li data-selectedYear="+i+">"+i+"</li>");$.getJSON("data/gunOrgSpending.json",function(t){console.log("DATA",t);var e=t.spending[0].gunControl,c=t.spending[1].gunRights;for(i=n;i<=a;i++)$.each(e,function(t,e){$.each(e,function(t,e){o.push(e.name),gunControlGroups.push(e.name)})}),$.each(c,function(t,e){$.each(e,function(t,e){o.push(e.name),gunRightsGroups.push(e.name)})});gunControlGroups=_.uniqBy(gunControlGroups),console.log("GUNCONTROLGROUPS",gunControlGroups),gunRightsGroups=_.uniqBy(gunRightsGroups),console.log("GUNRIGHTSGROUPS",gunRightsGroups),gunOrgCounts=_.countBy(o);var u=["year"];$.each(gunOrgCounts,function(t,e){u.push(t)});var d=u+"\n",g="id,value\n";for(g+="flare,\n",i=n;i<=a;i++){yearArray=[i.toString()],g+="flare."+i.toString()+",\n";var p=!1,h=!1;$.each(t.spending,function(t,e){0===t&&(group="gc",p||(g+="flare."+i.toString()+"."+group+",\n",$.each(e.gunControl[i.toString()],function(t,e){var n=$.inArray(e.name,u);parseInt(e.expenditures)>0&&(yearArray[n]=e.expenditures),g+="flare."+i.toString()+"."+group+"."+e.name+","+e.expenditures+"\n"}),p=!0))}),$.each(t.spending,function(t,e){1===t&&(group="gr",h||(g+="flare."+i.toString()+"."+group+",\n",$.each(e.gunRights[i.toString()],function(t,e){var n=$.inArray(e.name,u);parseInt(e.expenditures)>0&&(yearArray[n]=e.expenditures),g+="flare."+i.toString()+"."+group+"."+e.name+","+e.expenditures+"\n"}),h=!0))}),d+=yearArray+"\n"}for(i=n;i<=a;i++)mainYear={},mainYear.Year=i,s[i]=0,r[i]=0,c[i.toString()].forEach(function(t){s[i.toString()]+=parseInt(t.expenditures)}),e[i.toString()].forEach(function(t){r[i.toString()]+=parseInt(t.expenditures)}),mainYear["Gun Control"]=r[i.toString()],mainYear["Gun Rights"]=s[i.toString()],mainYear.total=parseInt(r[i.toString()])+parseInt(s[i.toString()]),l.push(mainYear);var f=0,m=0;$.each(l,function(t,e){f+=e["Gun Control"],m+=e["Gun Rights"]}),buildTotalsChart(f,m),buildYearChart(l),buildOrgChart(d),buildTreeChart(g)});var c=new Date,u=c.getFullYear();$(".copyright").text(u)});var facebookSVG='<svg class="social" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 100 100"><rect id="square" fill="#D8D8D8" width="100" height="100"/><path id="facebook" fill="#FFFFFF" d="M35.959,40.223h6.034v-5.865c0-2.588,0.065-6.576,1.944-9.046\tc1.979-2.618,4.696-4.397,9.369-4.397c7.611,0,10.818,1.086,10.818,1.086l-1.508,8.942c0,0-2.518-0.728-4.862-0.728\tc-2.351,0-4.448,0.842-4.448,3.188v6.821h9.623l-0.673,8.734h-8.95v30.342H41.994V48.957h-6.034V40.223z"/></svg>',twitterSVG='<svg class="social" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 100 100"><rect id="square" fill="#D8D8D8" width="100" height="100"/><path id="twitter" fill="#FFFFFF" d="M77.877,32.706c-2.051,0.911-4.258,1.525-6.569,1.803c2.362-1.416,4.176-3.659,5.028-6.328\tc-2.212,1.311-4.657,2.26-7.266,2.771c-2.082-2.221-5.058-3.611-8.349-3.611c-6.313,0-11.435,5.126-11.435,11.441\tc0,0.897,0.097,1.767,0.294,2.604c-9.506-0.479-17.932-5.027-23.577-11.955c-0.984,1.696-1.549,3.662-1.549,5.759\tc0,3.962,2.02,7.468,5.089,9.52c-1.874-0.058-3.64-0.576-5.183-1.429v0.141c0,5.544,3.942,10.168,9.178,11.218\tc-0.96,0.269-1.97,0.402-3.015,0.402c-0.737,0-1.456-0.067-2.151-0.202c1.454,4.542,5.677,7.852,10.684,7.941\tc-3.916,3.068-8.848,4.896-14.205,4.896c-0.924,0-1.836-0.052-2.729-0.156c5.062,3.243,11.075,5.138,17.534,5.138\tc21.042,0,32.543-17.429,32.543-32.551c0-0.496-0.01-0.991-0.03-1.479C74.405,37.014,76.348,35.001,77.877,32.706"/></svg>',youtubeSVG='<svg class="social" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 100 100"><rect id="square" fill="#D8D8D8" width="100" height="100"/><path id="youtube" fill="#FFFFFF" d="M60.825,50.137L41.487,61.494V38.776L60.825,50.137z M78.886,60.667V39.546\tc0,0,0-10.181-10.179-10.181h-38.71c0,0-10.173,0-10.173,10.181v21.121c0,0,0,10.181,10.173,10.181h38.71\tC68.707,70.848,78.886,70.848,78.886,60.667"/></svg>',websiteSVG='<svg class="social" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 100 100"><rect id="square" fill="#D8D8D8" width="100" height="100"/><rect id="webbox" x="20" y="29" fill="#FFFFFF" width="59" height="42"/><text transform="matrix(1 0 0 1 24.3213 54.5156)" fill="#D8D8D8" font-family="OpenSans-Bold" font-size="20">www</text></svg>';!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(n),n}:t(jQuery)}(function(t){t.fn.dnLoader=function(e){var n=this,a="";"display"===e&&(a=n.css("position"),n.addClass("no-scroll").css("position","relative"),t("#dnloader").fadeIn(500)),"remove"===e&&n.removeClass("no-scroll").css("position",a).find(t(".dn-loader-block")).fadeOut(500)}}),$(".button-gc").click(function(){swapContent("gc")}),$(".button-gr").click(function(){swapContent("gr")});var encodedIMGURL=encodeURIComponent(storyIMG),encodedURL=encodeURIComponent(storyURL);$(".fbShare").click(function(){console.log(fbHead+": "+leadText),FB.ui({method:"feed",name:fbHead,link:fbURL,picture:storyIMG,description:leadText})}),$(".twShare").click(function(){console.log("storyURL: "+storyURL),window.open("https://www.twitter.com/intent/tweet?hashtags=2a,guncontrol&text="+leadText+" &via=dallasnews&url="+storyURL+"&image="+encodedIMGURL,"top=200, left=200,width=550,height=420")});
//# sourceMappingURL=scripts-bundle.js.map

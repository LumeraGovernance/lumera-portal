import { getAuth, promptLogin, signOut } from "./js/auth.js";
import { getCourses, progressPercent, getProgress } from "./js/courses.js";

function h(tag, attrs={}, ...children){
  const el = document.createElement(tag);
  Object.entries(attrs||{}).forEach(([k,v])=>{
    if(k === "class") el.className = v;
    else if(k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if(k === "style" && typeof v === "object") Object.assign(el.style, v);
    else el.setAttribute(k, v);
  });
  children.flat().forEach(c => el.append(c instanceof Node ? c : document.createTextNode(c)));
  return el;
}

function renderTopbar(){
  const auth = getAuth();
  const nav = h("div", { class:"nav" },
    h("span", { class:"small" }, `Role: ${auth.role}`),
    auth.role === "viewer"
      ? h("button", { class:"btn", onClick: ()=>{ promptLogin(); location.reload(); } }, "Sign in")
      : h("button", { class:"btn", onClick: ()=>{ if(confirm("Sign out?")){ signOut(); location.reload(); } } }, "Sign out")
  );
  return h("div", { class:"topbar" },
    h("div", { class:"inner" },
      h("div", { class:"logo" }, "L"),
      h("div", {}, h("strong", {}, "Lumera Education Portal")),
      h("div", { style:{flex:1} }),
      h("a", { class:"btn", href:"index.html" }, "Catalog"),
      (auth.role === "author" || auth.role === "admin") ? h("a", { class:"btn", href:"studio.html" }, "Studio") : null,
      (auth.role === "admin") ? h("a", { class:"btn", href:"admin.html" }, "Admin") : null,
      nav
    )
  );
}

function renderCatalog(){
  const courses = getCourses();
  const grid = h("div", { class:"grid" });
  courses.forEach(c => {
    const pct = progressPercent(getProgress(c.id), c);
    grid.append(
      h("div", { class:"card" },
        c.hero ? h("div", { class:"media", style:{ backgroundImage:`url(${c.hero})` } }) : null,
        h("div", { class:"body" },
          h("div", {}, 
            h("span", { class:"badge" }, c.category),
            " ",
            c.level ? h("span", { class:"badge" }, c.level) : null
          ),
          h("h3", { style:{marginTop:'6px', fontSize:'18px'} }, c.title),
          h("p", { class:"small", style:{marginTop:'4px'} }, c.summary),
          h("div", { class:"progress", style:{marginTop:'8px'} },
            h("div", { style:{ width: pct + '%' } })
          )
        )
      )
    );
  });
  return grid;
}

function boot(){
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.append(renderTopbar());
  const wrap = h("div", { class:"container" },
    h("h2", {}, "Course Catalog"),
    h("p", { class:"small" }, "Pick a track and start learning. Your progress saves automatically."),
    renderCatalog()
  );
  app.append(wrap);
}

document.addEventListener("DOMContentLoaded", boot);